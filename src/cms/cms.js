import CMS from "netlify-cms-app";
import cloudinary from "netlify-cms-media-library-cloudinary";
import IndexPagePreview from "./preview-templates/IndexPagePreview";

CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewTemplate("index", IndexPagePreview);
