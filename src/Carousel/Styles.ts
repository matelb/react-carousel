import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const mainStyles = makeStyles((theme: Theme) =>
  createStyles({
    customCarousel: {
      height: "300px",
      overflow: "hidden",
      position: "relative",
    },
    customCarouselContainer: {
      display: "flex",
      flexWrap: "nowrap",
      height: "300px",
      position: "relative",
    },
    customCarouselItem: {
      height: "300px",
      flex: "0 0 auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "32px",
      fontWeight: 900,
      position: "absolute",
    },
    arrowContainer: {
      position: "absolute",
      top: "calc(50% - 1.5em)",
      bottom: "calc(50% - 1.5em)",
      width: "3rem",
      height: "3rem",
      borderRadius: "50%",
      cursor: "pointer",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1,
    },
    customLeftArrow: {
      left: "1rem",
    },
    customRightArrow: {
      right: "1rem",
    },
  })
);
