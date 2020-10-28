import CMS from "netlify-cms-app";
import cloudinary from "netlify-cms-media-library-cloudinary";
import VideoWidget from "./VideoWidget";

CMS.registerMediaLibrary(cloudinary);

const Preview = (value, field, metadata, getAsset, fieldsMetaData) => {
  console.log({
    componentLogging: "Preview",
    value,
    field,
    metadata,
    getAsset: getAsset.toString(),
    fieldsMetaData,
  });
  return null;
};

CMS.registerWidget("video", VideoWidget, Preview, "string");
