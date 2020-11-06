import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { theme } from "components/theme";
import HorizontalFeed from "components/HorizontalFeed";
import Image from "components/Image";

type GalleryProps = {
  items: {
    image: string;
  }[];
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  height?: number;
  width?: number;
};

const Gallery: React.FC<GalleryProps> = ({
  items,
  index,
  setIndex,
  height = 160,
  width = 160,
}) => {
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles({ mobile, height })();

  const gridItemClass = (i: number) => {
    let className = classes.gridItem;
    if (i === index) {
      className += ` ${classes.chosenItem}`;
    }
    return className;
  };

  return (
    <div className={classes.gallery}>
      <HorizontalFeed
        initialItemWidth={width}
        spacing={0}
        resizeOnMobile={false}
      >
        {items &&
          items.map(({ image }, i) => {
            return (
              <div
                key={i}
                onMouseEnter={() => setIndex(i)}
                className={gridItemClass(i)}
              >
                <Image
                  alt="Item in the gallery"
                  className={classes.image}
                  src={image}
                  width={width}
                  height={height}
                />
              </div>
            );
          })}
      </HorizontalFeed>
    </div>
  );
};

export default Gallery;

type UseStylesProps = {
  mobile: boolean;
  height: number;
};

const useStyles = ({ mobile, height }: UseStylesProps) =>
  makeStyles((theme) => ({
    gallery: {
      backgroundColor: theme.palette.grey[300],
      marginTop: theme.spacing(3),
      overflow: "hidden",
      flexWrap: "nowrap",
    },
    gridItem: {
      height: mobile ? height / 1.5 : height,
      flexShrink: 0,
      overflow: "hidden",
      transition: "border 0.1s",
    },
    chosenItem: {
      border: `6px solid ${theme.palette.info.light}`,
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  }));
