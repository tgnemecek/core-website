import {
  CmsField,
  CmsFieldBase,
  CmsFieldObject,
  CmsFieldList,
} from "netlify-cms-core";
import { FieldProps } from "./generate-cms-field";

// https://github.com/microsoft/TypeScript/issues/31104#issuecomment-696416882
type OmitWithoutLosingModifiers<T, ExcludedKeys extends keyof any> = {
  [K in keyof T as Exclude<K, ExcludedKeys>]: T[K];
};

type RemoveFields<T> = Omit<T, "fields" | "field">;

type GenerateCmsSectionProps<T extends Record<string, unknown>> =
  CmsFieldBase & {
    properties: {
      [K in keyof T]: OmitWithoutLosingModifiers<FieldProps<T[K]>, "name">;
    };
  } & (RemoveFields<CmsFieldObject> | RemoveFields<CmsFieldList>);

const generateCmsSection = <T extends Record<string, any>>({
  properties,
  ...defaultProperties
}: GenerateCmsSectionProps<T>): CmsField => {
  return {
    fields: Object.entries(properties).map(([key, value]) => ({
      ...value,
      name: key,
    })),
    ...defaultProperties,
  };
};

export default generateCmsSection;
