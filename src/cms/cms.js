import CMS from "netlify-cms-app";
import * as ColorWidget from "netlify-cms-widget-color";
import cloudinary from "netlify-cms-media-library-cloudinary";

CMS.registerWidget("color", ColorWidget.Control);

CMS.registerMediaLibrary(cloudinary);
