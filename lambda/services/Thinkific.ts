import fetch from "node-fetch";
import { ProcessEnvType, Course } from "../types";

const { THINKIFIC_API_KEY, THINKIFIC_SUBDOMAIN } =
  process.env as ProcessEnvType;

const toDTO = (rawData: any) => {
  const result: Course = {
    id: rawData.id,
    name: rawData.name,
    slug: rawData.slug,
    description: rawData.description,
    image: rawData.card_image_url,
  };
  return result;
};

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
      return (data.items as any[])
        .filter(({ status, hidden }) => status !== "draft" && !hidden)
        .map(toDTO);
    }
    throw new Error(
      `Error while getting Thinkific courses. Status: ${res.status}`
    );
  },
  // getCourses: async () => {
  //   const res = await fetch("https://api.thinkific.com/api/public/v1/courses", {
  //     method: "GET",
  //     headers: {
  //       "X-Auth-API-Key": THINKIFIC_API_KEY,
  //       "X-Auth-Subdomain": THINKIFIC_SUBDOMAIN,
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   if (res.status === 200) {
  //     const data = await res.json();
  //     return (data.items as any[]).map(toDTO);
  //   }
  //   throw new Error(
  //     `Error while getting Thinkific courses. Status: ${res.status}`
  //   );
  // },
};

export default Thinkific;
