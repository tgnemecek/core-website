import fetch from "node-fetch";
import jwt from "jsonwebtoken";
import Core from "./Core";
import moment from "moment";
import {
  ProcessEnvType,
  ZoomMeetingType,
  ZoomRegistrantType,
  ZoomAddRegistrantType,
} from "../types";
// Zoom Documentation can be found here:
// https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingcreate

const {
  ZOOM_API_KEY,
  ZOOM_API_SECRET,
  ZOOM_USER_ID,
} = process.env as ProcessEnvType;

type CreateMeetingProps = {
  title: string;
  startDate: moment.Moment;
  duration: number;
};

type UpdateMeetingProps = CreateMeetingProps & {
  meetingId: number;
};

type AddRegistrantProps = Record<
  "email" | "firstName" | "lastName" | "timezone",
  string
> & {
  meetingId: number;
};

type RemoveRegistrantsProps = {
  meetingId: number;
  registrants: {
    id: string;
    email: string;
  }[];
};

const generateToken = () => {
  return jwt.sign(
    {
      iss: ZOOM_API_KEY,
      exp: 1496091964000,
    },
    ZOOM_API_SECRET
  );
};

const headers = {
  Authorization: `Bearer ${generateToken()}`,
  "User-Agent": "Zoom-api-Jwt-Request",
  "content-type": "application/json",
};

const Zoom = {
  ping: async () => {
    const res = await fetch(
      `https://api.zoom.us/v2/users/${ZOOM_USER_ID}/meetings`,
      {
        method: "GET",
        headers,
      }
    );
    if (res.status === 200) {
      return true;
    } else {
      throw new Error("Zoom servers are down");
    }
  },
  getMeeting: async (meetingId: number) => {
    const res = await fetch(`https://api.zoom.us/v2/meetings/${meetingId}`, {
      method: "GET",
      headers,
    });
    if (res.status === 200) {
      return (await res.json()) as ZoomMeetingType;
    } else {
      console.error(res);
      throw new Error("Error while getting Zoom meeting.");
    }
  },
  createMeeting: async ({ title, startDate, duration }: CreateMeetingProps) => {
    // Docs: https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingcreate
    const res = await fetch(
      `https://api.zoom.us/v2/users/${ZOOM_USER_ID}/meetings`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          topic: title,
          type: 2, // 2 = scheduled
          start_time:
            startDate.utcOffset(0).format("YYYY-MM-DDTHH:mm:ss") + "Z",
          duration,
          timezone: "America/New_York",
          settings: {
            host_video: true,
            participant_video: true,
            mute_upon_entry: true,
            approval_type: 0, // 1 = automatic approval
            close_registration: true,
            show_share_button: false,
            registrants_email_notification: false,
          },
        } as Partial<ZoomMeetingType>),
      }
    );
    if (res.status === 201) {
      const {
        join_url: url,
        id: meetingId,
      } = (await res.json()) as ZoomMeetingType;
      return { url, meetingId };
    } else {
      throw new Error("Error while creating Zoom meeting.");
    }
  },
  updateMeeting: async ({
    meetingId,
    title,
    startDate,
    duration,
  }: UpdateMeetingProps) => {
    // Docs: https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingcreate
    const res = await fetch(`https://api.zoom.us/v2/meetings/${meetingId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        topic: title,
        start_time: startDate.utcOffset(0).format("YYYY-MM-DDTHH:mm:ss") + "Z",
        duration,
      } as Partial<ZoomMeetingType>),
    });
    if (res.status === 204) {
      return true;
    } else {
      console.log(res);
      throw new Error("Error while updating Zoom meeting.");
    }
  },
  deleteMeeting: async (meetingId: number) => {
    // Docs: https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingdelete
    const res = await fetch(`https://api.zoom.us/v2/meetings/${meetingId}`, {
      method: "DELETE",
      headers,
    });
    if (res.status === 204) {
      await res.json();
      return true;
    } else {
      throw new Error("Error while deleting Zoom meeting.");
    }
  },
  addRegistrant: async (props: AddRegistrantProps) => {
    // Docs: https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingregistrantcreate
    const { meetingId, email, firstName, lastName, timezone } = props;

    const errors = (Object.keys(props) as (keyof AddRegistrantProps)[]).filter(
      (key) => {
        return !props[key].toString().trim();
      }
    );

    if (errors.length) {
      throw new Error(
        `Invalid arguments provided to Zoom.addRegistrant(): ${errors.join(
          ", "
        )}`
      );
    }

    if (!Core.verifyEmail(email)) {
      throw new Error(`Invalid email address: ${email}`);
    }

    console.log({
      timezone,
    });

    const res = await fetch(
      `https://api.zoom.us/v2/meetings/${meetingId}/registrants`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          email,
          first_name: firstName,
          last_name: lastName,
          auto_approve: true,
          custom_questions: [
            {
              title: "timezone",
              value: timezone,
            },
          ],
        } as ZoomAddRegistrantType),
      }
    );

    if (res.status === 201) {
      const {
        join_url: joinUrl,
        topic,
        start_time: startTime,
      } = (await res.json()) as ZoomMeetingType;
      return { joinUrl, topic, startTime };
    } else {
      throw new Error("Error while adding Zoom registrant.");
    }
  },
  listRegistrants: async (meetingId: number) => {
    const getRegistrantPages = async (
      registrants?: ZoomRegistrantType[],
      pageToken?: string
    ): Promise<ZoomRegistrantType[]> => {
      const tokenStr = pageToken ? `&next_page_token=${pageToken}` : "";
      const res = await fetch(
        `https://api.zoom.us/v2/meetings/${meetingId}/registrants?page_size=300${tokenStr}`,
        {
          method: "GET",
          headers,
        }
      );
      if (res.status === 200) {
        const data = (await res.json()) as {
          registrants: ZoomRegistrantType[];
          next_page_token?: string;
        };
        const newRegistrants = [...(registrants || []), ...data.registrants];
        if (data.next_page_token) {
          return await getRegistrantPages(newRegistrants, data.next_page_token);
        }
        return newRegistrants;
      } else {
        throw new Error("Error while listing Zoom meeting registrants.");
      }
    };

    return await getRegistrantPages();
  },
  removeRegistrants: async ({
    meetingId,
    registrants,
  }: RemoveRegistrantsProps) => {
    const res = await fetch(
      `https://api.zoom.us/v2/meetings${meetingId}/registrants/status`,
      {
        method: "GET",
        headers,
        body: JSON.stringify({
          action: "cancel",
          registrants: registrants.map(({ id, email }) => ({ id, email })),
        }),
      }
    );
    if (res.status === 204) {
      return await res.json();
    } else {
      throw new Error("Error while removing Zoom meeting registrants.");
    }
  },
};

export default Zoom;
