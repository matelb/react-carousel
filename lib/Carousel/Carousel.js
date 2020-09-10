"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var Styles_1 = require("./Styles");
var react_spring_1 = require("react-spring");
var ArrowBackIosRounded_1 = __importDefault(require("@material-ui/icons/ArrowBackIosRounded"));
var ArrowForwardIosRounded_1 = __importDefault(require("@material-ui/icons/ArrowForwardIosRounded"));
var Dimensions_1 = require("../Dimensions");
var react_use_gesture_1 = require("react-use-gesture");
var clamp_1 = __importDefault(require("lodash-es/clamp"));
var styles_1 = require("@material-ui/core/styles");
var defaultColor = "transparent";
var Carousel = function (_a) {
    var auto = _a.auto, width = _a.width, height = _a.height, imageProps = _a.imageProps, cardProps = _a.cardProps, containerProps = _a.containerProps, arrowLeftProps = _a.arrowLeftProps, arrowRightProps = _a.arrowRightProps, onForward = _a.onForward, onBack = _a.onBack, images = _a.images, hideArrows = _a.hideArrows, autoTime = _a.autoTime;
    var mainClasses = Styles_1.mainStyles();
    var _b = Dimensions_1.useWindowSize(), wHeight = _b.height, wWidth = _b.width;
    var cardWith = width || wWidth;
    var cardHeight = height || wHeight;
    var totalWidth = cardWith * images.length;
    var position = react_1.useRef(0);
    var direction = react_1.useRef(1);
    var useStyles = styles_1.makeStyles(function (theme) {
        return styles_1.createStyles({
            container: {
                containerProps: containerProps,
                width: (containerProps === null || containerProps === void 0 ? void 0 : containerProps.width) || cardWith,
                height: (containerProps === null || containerProps === void 0 ? void 0 : containerProps.height) || cardHeight,
                backgroundColor: (containerProps === null || containerProps === void 0 ? void 0 : containerProps.backgroundColor) || "rgba(0,0,0,0.1)",
            },
            card: {
                cardProps: cardProps,
                width: (cardProps === null || cardProps === void 0 ? void 0 : cardProps.width) || cardWith,
                height: (cardProps === null || cardProps === void 0 ? void 0 : cardProps.height) || cardHeight,
                backgroundColor: (cardProps === null || cardProps === void 0 ? void 0 : cardProps.backgroundColor) || defaultColor,
            },
        });
    });
    var _c = react_spring_1.useSprings(images.length, function (i) { return ({
        x: i * window.innerWidth,
        sc: 1,
        display: "flex",
        config: { mass: 5, tension: 150, friction: 40 },
    }); }), props = _c[0], set = _c[1];
    var raiseOnForward = function () {
        if (onForward)
            onForward(position.current);
    };
    var raiseOnBack = function () {
        if (onBack)
            onBack(position.current);
    };
    var backClick = function () {
        if (position.current === 0)
            return;
        position.current = position.current - 1;
        set(function (i) {
            if (i < position.current - 1 || i > position.current + 1)
                return { display: "none" };
            var x = (i - position.current) * cardWith;
            return { x: x, sc: 1, display: "flex" };
        });
        raiseOnBack();
    };
    var forwardClick = function () {
        if (position.current === images.length - 1)
            return;
        position.current = position.current + 1;
        set(function (i) {
            if (i < position.current - 1 || i > position.current + 1)
                return { display: "none" };
            var x = (i - position.current) * cardWith;
            return { x: x, sc: 1, display: "flex" };
        });
        raiseOnForward();
    };
    var calculateNextDirection = function () {
        if (position.current === images.length - 1) {
            direction.current = -1;
        }
        if (position.current === 0) {
            direction.current = 1;
        }
    };
    react_1.useEffect(function () {
        var interval = setInterval(function () {
            if (auto) {
                if (direction.current === 1) {
                    forwardClick();
                }
                else {
                    backClick();
                }
                calculateNextDirection();
            }
        }, autoTime || 5000, cardWith);
        return function () { return clearInterval(interval); };
    }, [cardWith]);
    var bindDrag = react_use_gesture_1.useDrag(function (_a) {
        var down = _a.down, mx = _a.movement[0], xDir = _a.direction[0], distance = _a.distance, cancel = _a.cancel, xDelta = _a.delta[0];
        var previousPosition = position.current;
        if (down && distance > cardWith / 2) {
            if (cancel) {
                position.current = clamp_1.default(position.current + (xDir > 0 ? -1 : 1), 0, images.length - 1);
                cancel();
            }
        }
        set(function (i) {
            if (i < position.current - 1 || i > position.current + 1)
                return { display: "none" };
            var x = (i - position.current) * cardWith + (down ? mx : 0);
            var sc = down ? 1 - distance / cardWith / 2 : 1;
            return { x: x, sc: sc, display: "flex" };
        });
        if (previousPosition < position.current)
            raiseOnForward();
        else if (previousPosition > position.current)
            raiseOnBack();
    });
    var classes = useStyles();
    return (react_1.default.createElement("div", { className: mainClasses.customCarousel, style: { width: cardWith, height: cardHeight } },
        !hideArrows && (react_1.default.createElement("div", { className: mainClasses.arrowContainer + " " + mainClasses.customLeftArrow, onClick: backClick, style: __assign({}, arrowLeftProps) },
            react_1.default.createElement(ArrowBackIosRounded_1.default, { fontSize: "large" }))),
        react_1.default.createElement(react_spring_1.animated.div, { className: mainClasses.customCarouselContainer + " " + classes.container }, props.map(function (_a, i) {
            var x = _a.x, display = _a.display, sc = _a.sc;
            console.log({ display: display });
            var image = images[i];
            return (react_1.default.createElement(react_spring_1.animated.div, __assign({ key: i }, bindDrag(), { className: mainClasses.customCarouselItem + " " + classes.card, style: {
                    transform: react_spring_1.interpolate([x, sc], function (x, s) { return "translateX(" + x + "px) scale(" + s + ")"; }),
                } }),
                react_1.default.createElement("img", { src: image.src, alt: image.alt, style: __assign(__assign({}, imageProps), { backgroundColor: (imageProps === null || imageProps === void 0 ? void 0 : imageProps.backgroundColor) || defaultColor, width: (imageProps === null || imageProps === void 0 ? void 0 : imageProps.width) || cardWith, height: (imageProps === null || imageProps === void 0 ? void 0 : imageProps.height) || cardHeight, pointerEvents: "none" }) })));
        })),
        !hideArrows && (react_1.default.createElement("div", { className: mainClasses.arrowContainer + " " + mainClasses.customRightArrow, style: __assign({}, arrowRightProps) },
            react_1.default.createElement(ArrowForwardIosRounded_1.default, { fontSize: "large", onClick: forwardClick })))));
};
exports.default = Carousel;
//# sourceMappingURL=Carousel.js.map