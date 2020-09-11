import { CSSProperties } from "react";
import { CSSProperties as MaerialCSSProperties } from "@material-ui/styles";
export interface CarouselProps {
    auto?: boolean;
    width?: number;
    height?: number;
    images: ImageProps[];
    containerProps: MaerialCSSProperties;
    cardProps?: MaerialCSSProperties;
    imageProps?: CSSProperties;
    imageDescriptionProps?: ImageDescriptionProps;
    arrowLeftProps?: CSSProperties;
    arrowRightProps?: CSSProperties;
    onForward?: (index: number) => void;
    onBack?: (index: number) => void;
    hideArrows?: boolean;
    autoTime?: number;
    animationConfig?: AnimationConfig;
    hideImageDescription?: boolean;
}
export interface ImageProps {
    src?: string;
    alt?: string;
    description?: ImageDescription;
}
interface AnimationConfig {
    mass?: number;
    tension?: number;
    friction?: number;
}
interface ImageDescription {
    title?: string;
    text?: string;
}
interface ImageDescriptionProps {
    container?: CSSProperties;
    title?: CSSProperties;
    text?: CSSProperties;
}
export {};
