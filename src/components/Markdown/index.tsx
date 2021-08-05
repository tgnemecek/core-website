import React from "react";
import ReactMarkdown, { ReactMarkdownOptions } from "react-markdown";
import { Typography, List, ListItem, ListItemIcon } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

type MarkdownProps = {
  text: string;
  components?: ReactMarkdownOptions["components"];
};

const Markdown: React.FC<MarkdownProps> = ({ text, components }) => {
  const TextComponent = (props: any) => (
    <Typography {...props} variant="body1" style={{ marginBottom: 10 }} />
  );

  return (
    <ReactMarkdown
      components={{
        p: TextComponent,
        span: TextComponent,
        a: (props: any) => (
          <a {...props} target="_blank" rel="noopener noreferrer" />
        ),
        strong: (props) => <strong style={{ fontWeight: "bold" }} {...props} />,
        blockquote: (props: any) => (
          <Typography {...props} variant="h4" style={{ marginTop: 15 }} />
        ),
        ol: (props: any) => <List {...props} style={{ marginBottom: 15 }} />,
        ul: (props: any) => <List {...props} style={{ marginBottom: 15 }} />,
        li: ({ children, ...props }: any) => (
          <ListItem {...props}>
            <ListItemIcon>
              <FiberManualRecordIcon />
            </ListItemIcon>
            <Typography variant="body1">{children}</Typography>
          </ListItem>
        ),
        ...components,
      }}
    >
      {text}
    </ReactMarkdown>
  );
};

export default Markdown;
