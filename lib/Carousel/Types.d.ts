import { CSSProperties } from "react";
export interface CarouselProps {
    auto?: boolean;
    width?: number;
    height?: number;
    images: ImageProps[];
    containerProps?: CSSProperties;
    imageProps?: CSSProperties;
    cardProps?: CSSProperties;
    arrowLeftProps?: CSSProperties;
    arrowRightProps?: CSSProperties;
    onForward?: (index: number) => void;
    onBack?: (index: number) => void;
    hideArrows?: boolean;
    autoTime?: number;
}
export interface ImageProps {
    src?: string;
    alt?: string;
}
