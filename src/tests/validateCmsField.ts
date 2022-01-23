import assert from "assert";
import { CmsField } from "netlify-cms-core";

const TYPE_MAP = {
  string: (v: any) => typeof v === "string",
  text: (v: any) => typeof v === "string",
  image: (v: any) => typeof v === "string",
  markdown: (v: any) => typeof v === "string",
  select: (v: any) => typeof v === "string" || Array.isArray(v),
  number: (v: any) => typeof v === "number",
  object: (v: any) => typeof v === "object",
  list: (v: any) => Array.isArray(v),
};

const validateCmsField = (cmsField: CmsField, value: any) => {
  const typeIsValid =
    TYPE_MAP[cmsField.widget! as keyof typeof TYPE_MAP]?.(value);

  assert(
    typeIsValid,
    `Expected widget '${cmsField?.widget}' to match type: '${value}'`
  );
};

export default validateCmsField;
