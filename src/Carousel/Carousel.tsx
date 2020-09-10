import React, { useRef, useEffect } from "react";
import { mainStyles } from "./Styles";
import { animated, useSprings, interpolate } from "react-spring";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import { useWindowSize } from "../Dimensions";
import { useDrag } from "react-use-gesture";
import clamp from "lodash-es/clamp";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { CarouselProps } from "./Types";

const defaultColor = "transparent";

const Carousel = ({
  auto,
  width,
  height,
  imageProps,
  cardProps,
  containerProps,
  arrowLeftProps,
  arrowRightProps,
  onForward,
  onBack,
  images,
  hideArrows,
  autoTime,
}: CarouselProps) => {
  const mainClasses = mainStyles();
  const { height: wHeight, width: wWidth } = useWindowSize();

  const cardWith = width || wWidth;

  const cardHeight = height || wHeight;

  const totalWidth = cardWith * images.length;

  const position = useRef(0);
  const direction = useRef(1);

  //create Custom styles
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      container: {
        containerProps,
        width: containerProps?.width || cardWith,
        height: containerProps?.height || cardHeight,
        backgroundColor: containerProps?.backgroundColor || "rgba(0,0,0,0.1)",
      },
      card: {
        cardProps,
        width: cardProps?.width || cardWith,
        height: cardProps?.height || cardHeight,
        backgroundColor: cardProps?.backgroundColor || defaultColor,
      },
    })
  );

  const [props, set] = useSprings(images.length, (i: number) => ({
    x: i * window.innerWidth,
    sc: 1,
    display: "flex",
    config: { mass: 5, tension: 150, friction: 40 },
  }));

  const raiseOnForward = () => {
    if (onForward) onForward(position.current);
  };

  const raiseOnBack = () => {
    if (onBack) onBack(position.current);
  };

  const backClick = () => {
    if (position.current === 0) return;
    position.current = position.current - 1;
    set((i: number) => {
      if (i < position.current - 1 || i > position.current + 1)
        return { display: "none" };
      const x = (i - position.current) * cardWith;
      return { x, sc: 1, display: "flex" };
    });
    raiseOnBack();
  };

  const forwardClick = () => {
    if (position.current === images.length - 1) return;
    position.current = position.current + 1;
    set((i: number) => {
      if (i < position.current - 1 || i > position.current + 1)
        return { display: "none" };
      const x = (i - position.current) * cardWith;
      return { x, sc: 1, display: "flex" };
    });
    raiseOnForward();
  };

  const calculateNextDirection = () => {
    if (position.current === images.length - 1) {
      direction.current = -1;
    }

    if (position.current === 0) {
      direction.current = 1;
    }
  };

  useEffect(() => {
    const interval = setInterval(
      () => {
        if (auto) {
          if (direction.current === 1) {
            forwardClick();
          } else {
            backClick();
          }
          calculateNextDirection();
        }
      },
      autoTime || 5000,
      cardWith
    );
    return () => clearInterval(interval);
  }, [cardWith]);

  const bindDrag = useDrag(
    ({
      down,
      movement: [mx],
      direction: [xDir],
      distance,
      cancel,
      delta: [xDelta],
    }) => {
      const previousPosition = position.current;
      if (down && distance > cardWith / 2) {
        if (cancel) {
          position.current = clamp(
            position.current + (xDir > 0 ? -1 : 1),
            0,
            images.length - 1
          );
          cancel();
        }
      }
      set((i: number) => {
        if (i < position.current - 1 || i > position.current + 1)
          return { display: "none" };
        const x = (i - position.current) * cardWith + (down ? mx : 0);
        const sc = down ? 1 - distance / cardWith / 2 : 1;
        return { x, sc, display: "flex" };
      });
      if (previousPosition < position.current) raiseOnForward();
      else if (previousPosition > position.current) raiseOnBack();
    }
  );

  const classes = useStyles();

  return (
    <div
      className={mainClasses.customCarousel}
      style={{ width: cardWith, height: cardHeight }}
    >
      {!hideArrows && (
        <div
          className={`${mainClasses.arrowContainer} ${mainClasses.customLeftArrow}`}
          onClick={backClick}
          style={{ ...arrowLeftProps }}
        >
          <ArrowBackIosRoundedIcon fontSize="large" />
        </div>
      )}

      <animated.div
        className={`${mainClasses.customCarouselContainer} ${classes.container}`}
      >
        {props.map(({ x, display, sc }, i) => {
          console.log({ display });
          const image = images[i];
          return (
            <animated.div
              key={i}
              {...bindDrag()}
              className={`${mainClasses.customCarouselItem} ${classes.card}`}
              style={{
                transform: interpolate(
                  [x, sc],
                  (x, s) => `translateX(${x}px) scale(${s})`
                ),
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                style={{
                  ...imageProps,
                  backgroundColor: imageProps?.backgroundColor || defaultColor,
                  width: imageProps?.width || cardWith,
                  height: imageProps?.height || cardHeight,
                  pointerEvents: "none",
                }}
              />
            </animated.div>
          );
        })}
      </animated.div>
      {!hideArrows && (
        <div
          className={`${mainClasses.arrowContainer} ${mainClasses.customRightArrow}`}
          style={{ ...arrowRightProps }}
        >
          <ArrowForwardIosRoundedIcon fontSize="large" onClick={forwardClick} />
        </div>
      )}
    </div>
  );
};

export default Carousel;
