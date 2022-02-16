export type FormState = Record<"firstName" | "lastName" | "email", string>;
export type FormErrors = Partial<Record<keyof FormState | "card", string>>;
