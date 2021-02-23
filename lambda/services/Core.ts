import moment from "moment-timezone";
import crypto from "crypto";
import StripeApi from "stripe";
import { TicketType, ProcessEnvType } from "../types";

const { CORE_SECRET_KEY } = process.env as ProcessEnvType;
const IV = "12102hr01h2fhvca";
const algorithm = "aes-256-cbc";

const secretToBytes = (salt: string, iterations: number, len: number) => {
  const sha1 = (input: Buffer) => {
    return crypto.createHash("sha1").update(input).digest();
  };
  let key = Buffer.from(CORE_SECRET_KEY + salt);
  for (let i = 0; i < iterations; i++) {
    key = sha1(key);
  }
  if (key.length < len) {
    const hx = secretToBytes(salt, iterations - 1, 20);
    for (let counter = 1; key.length < len; ++counter) {
      key = Buffer.concat([
        key,
        sha1(Buffer.concat([Buffer.from(counter.toString()), hx])),
      ]);
    }
  }
  return Buffer.alloc(len, key);
};

type GenerateCalendarLinkProps = {
  title: string;
  description: string;
  startDate: moment.Moment;
  endDate: moment.Moment;
  location?: string;
};

const Core = {
  encryptEventIds: (productId: string, meetingId: number) => {
    const payload = `${productId}.${meetingId}`;
    const key = secretToBytes("", 100, 32);
    const cipher = crypto.createCipheriv(algorithm, key, IV);
    const part1 = cipher.update(JSON.stringify(payload), "utf8");
    const part2 = cipher.final();
    return Buffer.concat([part1, part2]).toString("base64");
  },
  decryptEventIds: (code: string) => {
    const key = secretToBytes("", 100, 32);
    const decipher = crypto.createDecipheriv(algorithm, key, IV);
    let decrypted = decipher.update(code, "base64", "utf8");
    decrypted += decipher.final();

    const [productId, meetingId] = (JSON.parse(decrypted) as string).split(".");

    return {
      productId: productId as string,
      meetingId: Number(meetingId),
    };
  },
  generatePassword: () => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const length = 10;
    let result = "";
    for (let i = 0; i < length; i++) {
      const chosenIndex = Math.floor(Math.random() * charset.length);
      result += charset[chosenIndex];
    }
    return result;
  },
  compareTickets: (tickets: TicketType[], prices: StripeApi.Price[]) => {
    if (tickets.length !== prices.length) return true;
    const hasChanged = tickets.some((ticket) => {
      const found = prices.find((price) => price.id === ticket.id);
      if (!found) return true;
      return ticket.price * 100 !== found.unit_amount;
    });
    return hasChanged;
  },
  compareDates: (newDate: moment.Moment, oldDate: moment.Moment) => {
    return !newDate.isSame(oldDate);
  },
  generateCalendarLink: (event: GenerateCalendarLinkProps) => {
    const required = ["title", "description", "startDate", "endDate"] as const;

    const invalid = required.filter((key) => !event[key]);

    if (invalid.length > 0) {
      throw new Error(
        `Error in Core.generateCalendarLink(). Required fields missing: ${invalid.join(
          ", "
        )}.`
      );
    }

    const formatDate = (input: moment.Moment) => {
      return moment(input).utcOffset(0).format("YYYYMMDDTHHmmss") + "Z";
    };

    const { title, description, location, startDate, endDate } = event;

    const searchParams = new URLSearchParams({
      text: title,
      details: description,
      location: location || "",
      dates: `${formatDate(startDate)}/${formatDate(endDate)}`,
    });

    const prefix = `https://www.google.com/calendar/render?action=TEMPLATE&`;

    return `${prefix}${searchParams.toString()}`;
  },
  verifyEmail: (email: string) => {
    const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return regex.test(email);
  },
};

export default Core;
