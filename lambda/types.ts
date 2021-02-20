import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export type ProcessEnvType = {
  ZOOM_API_KEY: string;
  ZOOM_API_SECRET: string;
  ZOOM_USER_ID: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_PAYMENT_INTENT_SECRET: string;
  EMAIL_HOST: string;
  EMAIL_USERNAME: string;
  EMAIL_PASSWORD: string;
  GATSBY_STRIPE_PUBLIC_KEY: string;
};

type NetlifyContext = Omit<Context, "clientContext"> & {
  clientContext: Context["clientContext"] & {
    identity?: any;
    user?: any;
  };
};

export type NetlifyLambdaHandler = (
  event: APIGatewayEvent,
  context: NetlifyContext
) => Promise<APIGatewayProxyResult>;

export type EventDeleteBody = {
  meetingId: number;
  productId: string;
};

export type EventCreateBody = EventDeleteBody & {
  title: string;
  subtitle: string;
  tickets: TicketType[];
  duration: number;
  date: Date;
};

export type EventUpdateBody = EventCreateBody;

export type CreatePaymentIntentBody = {
  ticketId: string;
  title: string;
};

// https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meeting
export type ZoomMeetingType = {
  uuid: string;
  id: number;
  host_id: string;
  assistant_id: string;
  host_email: string;
  topic: string;
  type: 1 | 2 | 3 | 4 | 8;
  status: string;
  start_time: string;
  duration: number;
  timezone: string;
  created_at: string;
  agenda: string;
  start_url: string;
  join_url: string;
  password?: string;
  h323_password?: string;
  encrypted_password?: string;
  pmi?: number;
  tracking_fields: {
    field: string;
    value: string;
    visible: boolean;
  }[];
  occurrences: {
    occurrence_id: string;
    start_time: string;
    duration: number;
    status: string;
  }[];
  settings: {
    host_video: boolean;
    participant_video: boolean;
    cn_meeting: boolean;
    in_meeting: boolean;
    join_before_host: boolean;
    jbh_time: 0 | 5 | 10;
    mute_upon_entry: boolean;
    watermark: boolean;
    use_pmi: boolean;
    approval_type: 0 | 1 | 2;
    registration_type: 1 | 2 | 3;
    audio: "both" | "telephony" | "voip";
    auto_recording: "local" | "cloud" | "none";
    enforce_login: boolean;
    alternative_hosts: string;
    close_registration: boolean;
    waiting_room: boolean;
    global_dial_in_countries: string[];
    global_dial_in_numbers: {
      country: string;
      country_name: string;
      city: string;
      number: string;
      type: string;
    }[];
    contact_name: string;
    contact_email: string;
    registrants_confirmation_email: boolean;
    registrants_email_notification: boolean;
    meeting_authentication: boolean;
    authentication_option: string;
    authentication_domains: string;
    authentication_name: string;
    interpreters: {
      email: string;
      languages: string;
    }[];
    show_share_button: boolean;
    allow_multiple_devices: boolean;
    encryption_type: string;
    approved_or_denied_countries_or_regions: {
      enable: boolean;
      method: string;
      approved_list: string[];
      denied_list: string[];
    };
    authentication_exception: {
      name: string;
      email: string;
    }[];
  };
  recurrence: {
    type: 1 | 2 | 3;
    repeat_interval: number;
    weekly_days: string;
    monthly_day: number;
    monthly_week: number;
    monthly_week_day: number;
    end_times: number;
    end_date_time: string;
  };
};

// This is incomplete:
// https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingregistrantcreate
export type ZoomAddRegistrantType = {
  email: string;
  first_name: string;
  last_name: string;
  auto_approve: boolean;
  custom_questions: [
    {
      timezone: string;
    }
  ];
};

export type ZoomRegistrantType = ZoomAddRegistrantType & {
  id: string;
  join_url: string;
};

export type TicketType = {
  id: string;
  description: string;
  price: number;
  endsOn: "startOfEvent" | "startOfDay" | "oneWeek";
  extra: string;
};
