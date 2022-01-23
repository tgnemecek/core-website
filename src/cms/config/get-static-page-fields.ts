import { CmsField } from "netlify-cms-core";

const getStaticPageFields = (key: string, Component: string): CmsField[] => [
  {
    label: "Collection",
    name: "collection",
    widget: "hidden",
    default: "pages",
  },
  {
    label: "Key",
    name: "key",
    widget: "hidden",
    default: key,
  },
  {
    label: "Component",
    name: "component",
    widget: "hidden",
    default: Component,
  },
];

export default getStaticPageFields;
