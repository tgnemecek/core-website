import React from "react";
import ReactMarkdown from "react-markdown";
import { Typography, List, ListItem, ListItemIcon } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import { Image } from "components";

type MarkdownProps = {
  text: string;
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
