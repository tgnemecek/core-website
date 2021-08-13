import React from "react";
import ReactMarkdown from "react-markdown";
import { Typography, List, ListItem, ListItemIcon } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import { Image } from "components";

type MarkdownProps = {
  text: string;
<<<<<<< HEAD
  components?: ReactMarkdownOptions["components"];
  className?: string;
};

const Markdown: React.FC<MarkdownProps> = ({ text, components, className }) => {
  const TextComponent = (props: any) => (
    <Typography {...props} variant="body1" style={{ marginBottom: 10 }} />
  );

  return (
    <ReactMarkdown
      className={className}
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
=======
};

const Markdown: React.FC<MarkdownProps> = ({ text }) => {
  return (
    <ReactMarkdown
      source={text}
      renderers={{
        paragraph: (props) => (
          <Typography {...props} variant="body1" style={{ marginBottom: 10 }} />
        ),
        text: (props) => <React.Fragment {...props} />,
        link: (props) => (
          <a {...props} target="_blank" rel="noopener noreferrer" />
        ),
        list: (props) => <List {...props} />,
        listItem: ({ children, ...props }) => (
>>>>>>> @{-1}
          <ListItem {...props}>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <Typography variant="body1">{children}</Typography>
          </ListItem>
        ),
        strong: (props) => <strong style={{ fontWeight: "bold" }} {...props} />,
        blockquote: (props) => (
          <Typography {...props} variant="h4" style={{ marginTop: 15 }} />
        ),
      }}
    />
  );
};

export default Markdown;
