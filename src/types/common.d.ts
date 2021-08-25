declare module "*.jpg";
declare module "*.png";
declare module "*.pdf";
declare module "react-reveal/Fade";
declare module "cloudinary-react";
declare module "netlify-cms-media-library-cloudinary";
declare module "markdown-to-text" {
  function removeMarkdown(input: string): string;
  export default removeMarkdown;
}

// declare var window: global.Window;

// declare var window: (Window & typeof globalThis) | undefined;
