import fetch from "node-fetch";
import { ProcessEnvType, ThinkificProduct, Course } from "../types";

const { THINKIFIC_API_KEY, THINKIFIC_SUBDOMAIN } =
  process.env as ProcessEnvType;

const Thinkific = {
  getCourses: async () => {
    const res = await fetch(
      "https://api.thinkific.com/api/public/v1/products",
      {
        method: "GET",
        headers: {
          "X-Auth-API-Key": THINKIFIC_API_KEY,
          "X-Auth-Subdomain": THINKIFIC_SUBDOMAIN,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 200) {
      const data = await res.json();
      return (data.items as ThinkificProduct[])
        .filter(({ status, hidden }) => status !== "draft" && !hidden)
        .map(Thinkific.toDTO);
    }
    throw new Error(
      `Error while getting Thinkific courses. Status: ${res.status}`
    );
  },
  toDTO: (rawData: ThinkificProduct) => {
    const result: Course = {
      id: rawData.id,
      name: rawData.name,
      slug: rawData.slug,
      description: rawData.description,
      image: rawData.card_image_url,
    };
    return result;
  },
};

export default Thinkific;
