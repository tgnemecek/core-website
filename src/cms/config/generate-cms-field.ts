import {
  CmsField,
  CmsFieldBase,
  CmsFieldStringOrText,
  CmsFieldMarkdown,
  CmsFieldFileOrImage,
  CmsFieldDateTime,
  CmsFieldNumber,
  CmsFieldSelect,
  CmsFieldObject,
  CmsFieldList,
  CmsFieldBoolean,
  CmsFieldHidden,
  CmsFieldMeta,
} from "netlify-cms-core";

// https://github.com/microsoft/TypeScript/issues/31104#issuecomment-696416882
type OmitWithoutLosingModifiers<T, ExcludedKeys extends keyof any> = {
  [K in keyof T as Exclude<K, ExcludedKeys>]: T[K];
};

type ConditionallyAddRequiredField<T> = undefined extends T
  ? {
      required: false;
    }
  : {
      required?: true;
    };

type Base<T, Cms> = ConditionallyAddRequiredField<T> &
  OmitWithoutLosingModifiers<CmsFieldBase & Cms, "required" | "widget">;

type StringOrTextProps<T> = Base<T, CmsFieldStringOrText> & {
  widget: "string" | "text";
};

type MarkdownProps<T> = Base<T, CmsFieldMarkdown> & {
  widget: "markdown";
};

type ImageProps<T> = Base<T, CmsFieldFileOrImage> & {
  widget: "image";
};

type NumberProps<T> = Base<T, CmsFieldNumber> & {
  widget: "number";
};

type DateProps<T> = Base<T, CmsFieldDateTime> & {
  widget: "datetime";
};

type SelectProps<T> = Base<T, CmsFieldSelect> & {
  widget: "select";
} & (string extends T
    ? {
        multiple?: false;
      }
    : {
        multiple: true;
      });

type BooleanProps<T> = Base<T, CmsFieldBoolean> & {
  widget: "boolean";
};

type HiddenProps<T> = Base<T, CmsFieldHidden> & {
  widget: "hidden";
};

type CurrentDate<T> = Base<T, CmsFieldMeta> & {
  widget: "currentDate";
  required: boolean;
};

type NestedListProps = Omit<
  CmsFieldBase & CmsFieldList,
  "required" | "widget"
> & {
  widget?: string;
};

type NestedObjectProps<T> = Base<T, CmsFieldObject> & {
  widget: "object";
};

export type FieldProps<T> = Date extends T
  ? DateProps<T> | CurrentDate<T>
  : string extends T
  ?
      | HiddenProps<T>
      | StringOrTextProps<T>
      | MarkdownProps<T>
      | ImageProps<T>
      | SelectProps<T>
  : number extends T
  ? NumberProps<T>
  : Array<string> extends T
  ? SelectProps<T>
  : T extends Array<any>
  ? NestedListProps
  : Object extends T
  ? NestedObjectProps<T>
  : boolean extends T
  ? BooleanProps<T>
  : never;

const generateCmsField = <T extends unknown>(
  props: FieldProps<T>
): CmsFieldBase &
  (
    | CmsFieldStringOrText
    | CmsFieldMarkdown
    | CmsFieldFileOrImage
    | CmsFieldNumber
    | CmsFieldDateTime
    | CmsFieldSelect
    | CmsFieldObject
    | CmsFieldList
    | CmsFieldBoolean
    | CmsFieldHidden
    | CmsFieldMeta
  ) => props;

export default generateCmsField;
