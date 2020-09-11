# react-carousel
Carousel for react web

## Responsive
Valid for web and mobile

## Instalation
```bash
npm i react-web-carousel
```

## Usage

```javascript
import React from "react";
import {
  Carousel,
  useWindowSize,
  useMeasureByRef,
  ImageProps,
} from "../components/Carousel";
import { isMobile } from "react-device-detect";

const aspectRatio = 1365 / 2048;

const images: ImageProps[] = [
  { src: "./Images/assets/1.jpg", alt: "1" },
  { src: "./Images/assets/2.jpg", alt: "2" },
  { src: "./Images/assets/3.jpg", alt: "3" },
  { src: "./Images/assets/4.jpg", alt: "4" },
  { src: "./Images/assets/6.jpg", alt: "6" },
];

const Example = () => {
  const { height: wHeight, width: wWidth } = useWindowSize();
  const { height: hHeight } = useMeasureByRef(
    document.getElementById("header")
  )[0];

  const width = wWidth;
  let height = 0;
  let imageWidth = 0;
  let imageHeight = 0;

  if (isMobile) {
    imageWidth = width;
    imageHeight = imageWidth * aspectRatio;
  } else {
    //Avoiding the header
    height = wHeight - hHeight;
    imageWidth = height / aspectRatio;
    imageHeight = height;
  }

  return (
    <>
      <Carousel
        width={width}
        height={isMobile ? imageHeight : height}
        images={images}
        imageProps={{ height: imageHeight, width: imageWidth }}
        auto={true}
        autoTime={4000}
        hideArrows={isMobile}
        containerProps={{
          backgroundColor: "rgba(0,0,0,0.2)",
        }}
      />
    </>
  );
};

export default Example;

```

In the example is using the Hooks useWindowSize that provides the size of the current window and useMeasureByRef gives you the dimensions of the element that you pass, in this case the header, that it's used to avoid the header size in the calculated image size.


## Props

| CarouselProps | |
| ------------- | ------------- |
| auto?  | boolean  |
| width?  | number  |
| height?  | number  |
| images  | ImageProps[]  |
| imageProps?  | CSSProperties  |
| cardProps?  | CSSProperties  |
| arrowLeftProps?  | CSSProperties  |
| arrowRightProps?  | CSSProperties  |
| onForward?  | (index: number) => void  |
| onBack?  | (index: number) => void  |
| hideArrows?  | boolean  |
| autoTime?  | boolean  |
| animationConfig?  | AnimationConfig  |

| ImageProps | |
| ------------- | ------------- |
| src?  | string  |
| alt?  | string  |

| AnimationConfig | |
| ------------- | ------------- |
| mass?  | number  |
| tension?  | number  |
| friction?  | number  |


## Hooks

useWindowSize

Provides the windows size

useMeasure

Provides the windows size (other way)

useMeasureByRef

Provides the dimensions of the element
Example: useMeasureByRef(document.getElementById("header"))[0];


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

