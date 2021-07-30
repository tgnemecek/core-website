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

// declare module "react-lines-ellipsis" {
//   import * as React from "react";

//   interface ReactLinesEllipsisProps {
//     basedOn?: "letters" | "words";
//     className?: string;
//     component?: string;
//     ellipsis?: React.ReactNode;
//     isClamped?: () => boolean;
//     maxLine?: number | string;
//     onReflow?: ({ clamped, text }: { clamped: boolean; text: string }) => any;
//     style?: React.CSSProperties;
//     text?: string;
//     trimRight?: boolean;
//     winWidth?: number;
//   }

//   class LinesEllipsis extends React.Component<ReactLinesEllipsisProps> {
//     static defaultProps?: ReactLinesEllipsisProps;
//   }

//   export default LinesEllipsis;
// }
