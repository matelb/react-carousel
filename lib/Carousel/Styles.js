"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainStyles = void 0;
var core_1 = require("@material-ui/core");
exports.mainStyles = core_1.makeStyles(function (theme) {
    var _a, _b, _c;
    return core_1.createStyles({
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
        customImageDescriptionContainer: (_a = {
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                position: "absolute",
                bottom: "2rem",
                padding: "3rem",
                borderRadius: "15px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
            },
            _a["@media (max-width:768px)"] = {
                bottom: "1rem",
                padding: "1rem",
            },
            _a),
        customImageDescriptionTitle: (_b = {
                color: "black",
                fontSize: "25px",
                fontWeight: 500,
                paddingBottom: "1rem"
            },
            _b["@media (max-width:768px)"] = {
                fontSize: "15px",
            },
            _b),
        customImageDescriptionDescription: (_c = {
                color: "black",
                fontSize: "16px"
            },
            _c["@media (max-width:768px)"] = {
                fontSize: "10px",
            },
            _c),
    });
});
//# sourceMappingURL=Styles.js.map