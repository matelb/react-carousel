"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMeasureByRef = exports.useMeasure = exports.useWindowSize = void 0;
var react_1 = require("react");
var resize_observer_polyfill_1 = __importDefault(require("resize-observer-polyfill"));
function useWindowSize() {
    var _a = react_1.useState({
        width: 0,
        height: 0,
    }), windowSize = _a[0], setWindowSize = _a[1];
    react_1.useEffect(function () {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return function () { return window.removeEventListener("resize", handleResize); };
    }, []);
    return windowSize;
}
exports.useWindowSize = useWindowSize;
function useMeasure() {
    var ref = react_1.useRef();
    var _a = react_1.useState({ left: 0, top: 0, width: 0, height: 0 }), bounds = _a[0], set = _a[1];
    var ro = react_1.useState(function () { return new resize_observer_polyfill_1.default(function (_a) {
        var entry = _a[0];
        return set(entry.contentRect);
    }); })[0];
    react_1.useEffect(function () {
        if (ref && ref.current)
            ro.observe(ref.current);
        return function () { return ro.disconnect(); };
    }, []);
    return [{ ref: ref }, bounds];
}
exports.useMeasure = useMeasure;
function useMeasureByRef(ref) {
    var _a = react_1.useState({ left: 0, top: 0, width: 0, height: 0 }), bounds = _a[0], set = _a[1];
    var ro = react_1.useState(function () { return new resize_observer_polyfill_1.default(function (_a) {
        var entry = _a[0];
        return set(entry.contentRect);
    }); })[0];
    react_1.useEffect(function () {
        if (ref) {
            ro.observe(ref);
        }
        return function () { return ro.disconnect(); };
    }, [ref]);
    return [bounds];
}
exports.useMeasureByRef = useMeasureByRef;
//# sourceMappingURL=Dimensions.js.map