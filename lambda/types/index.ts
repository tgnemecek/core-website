export type ProcessEnvType = {
  ZOOM_API_KEY: string;
  ZOOM_API_SECRET: string;
  ZOOM_USER_ID: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_PAYMENT_INTENT_SECRET: string;
  STRIPE_CHARGE_REFUNDED_SECRET: string;
  EMAIL_HOST: string;
  EMAIL_USERNAME: string;
  EMAIL_PASSWORD: string;
  EMAIL_REPLY_TO: string;
  CONTACT_FORM_EMAIL: string;
  GATSBY_STRIPE_PUBLIC_KEY: string;
  CORE_SECRET_KEY: string;
};

export { NetlifyLambdaHandler } from "./Netlify";

export {
  EventDeleteBody,
  EventCreateBody,
  EventUpdateBody,
  CreatePaymentIntentBody,
  Ticket,
} from "./Event";

export {
  ZoomMeetingType,
  ZoomAddRegistrantType,
  ZoomRegistrantType,
} from "./Zoom";
