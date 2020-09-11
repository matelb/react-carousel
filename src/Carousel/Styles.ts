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
    customImageDescriptionContainer: {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      position: "absolute",
      bottom: "2rem",
      padding: "3rem",
      borderRadius: "15px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      ["@media (max-width:768px)"]: {
        // eslint-disable-line no-useless-computed-key
        bottom: "1rem",
        padding: "1rem",
      },
    },
    customImageDescriptionTitle: {
      color: "black",
      fontSize: "25px",
      fontWeight: 500,
      paddingBottom: "1rem",
      ["@media (max-width:768px)"]: {
        // eslint-disable-line no-useless-computed-key
        fontSize: "15px",
      },
    },
    customImageDescriptionDescription: {
      color: "black",
      fontSize: "16px",
      ["@media (max-width:768px)"]: {
        // eslint-disable-line no-useless-computed-key
        fontSize: "10px",
      },
    },
  })
);
