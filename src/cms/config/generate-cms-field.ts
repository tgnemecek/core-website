import {
  CmsField,
  CmsFieldBase,
  CmsFieldStringOrText,
  CmsFieldMarkdown,
  CmsFieldFileOrImage,
  CmsFieldDateTime,
  CmsFieldNumber,
  CmsFieldSelect,
  CmsFieldBoolean,
  CmsFieldHidden,
  CmsFieldMeta,
} from "netlify-cms-core";

type ConditionallyAddRequiredField<T> = undefined extends T
  ? {
      required: false;
    }
  : {
      required?: true;
    };

type Base<T, Cms> = Omit<CmsFieldBase & Cms, "required" | "widget"> &
  ConditionallyAddRequiredField<T>;
// (string extends T
//   ? {
//       multiple?: false;
//     }
//   : {
//       multiple: true;
//     })
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

export type FieldProps<T> = Date extends T
  ? DateProps<T> | CurrentDate<T>
  : string extends T
  ?
      | StringOrTextProps<T>
      | MarkdownProps<T>
      | ImageProps<T>
      | SelectProps<T>
      | HiddenProps<T>
  : number extends T
  ? NumberProps<T>
  : Array<any> extends T
  ? SelectProps<T>
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
    | CmsFieldBoolean
    | CmsFieldHidden
    | CmsFieldMeta
  ) => props;

export default generateCmsField;
