/// <reference types="react" />
export declare function useWindowSize(): {
    width: number;
    height: number;
};
export declare function useMeasure(): ({
    left: number;
    top: number;
    width: number;
    height: number;
} | {
    ref: import("react").MutableRefObject<Element | undefined>;
})[];
export declare function useMeasureByRef(ref: Element): {
    left: number;
    top: number;
    width: number;
    height: number;
}[];
