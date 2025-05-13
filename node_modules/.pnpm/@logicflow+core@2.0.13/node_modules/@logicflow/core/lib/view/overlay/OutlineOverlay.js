"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutlineOverlay = void 0;
var jsx_runtime_1 = require("preact/jsx-runtime");
var compat_1 = require("preact/compat");
var shape_1 = require("../shape");
var __1 = require("../..");
var constant_1 = require("../../constant");
var util_1 = require("../../util");
var OutlineOverlay = /** @class */ (function (_super) {
    __extends(OutlineOverlay, _super);
    function OutlineOverlay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // 节点outline
    OutlineOverlay.prototype.getNodesOutline = function () {
        var graphModel = this.props.graphModel;
        var nodes = graphModel.nodes, _a = graphModel.editConfigModel, hoverOutline = _a.hoverOutline, nodeSelectedOutline = _a.nodeSelectedOutline;
        var nodeOutline = [];
        nodes.forEach(function (element) {
            if (element.isHovered || element.isSelected) {
                var isHovered = element.isHovered, isSelected = element.isSelected, x = element.x, y = element.y, width = element.width, height = element.height;
                if ((nodeSelectedOutline && isSelected) ||
                    (hoverOutline && isHovered)) {
                    var style_1 = element.getOutlineStyle();
                    var attributes_1 = {};
                    Object.keys(style_1).forEach(function (key) {
                        if (key !== 'hover') {
                            attributes_1[key] = style_1[key];
                        }
                    });
                    if (isHovered) {
                        var hoverStyle = style_1.hover;
                        attributes_1 = __assign(__assign({}, attributes_1), hoverStyle);
                    }
                    nodeOutline.push((0, jsx_runtime_1.jsx)(shape_1.Rect, __assign({ transform: element.transform, className: "lf-outline-node", x: x, y: y, 
                        // width: width + 10,
                        // height: height + 10,
                        width: width + 10,
                        height: height + 10 }, attributes_1)));
                }
            }
        });
        return nodeOutline;
    };
    // 边的outline
    OutlineOverlay.prototype.getEdgeOutline = function () {
        var _a = this.props.graphModel, edgeList = _a.edges, _b = _a.editConfigModel, edgeSelectedOutline = _b.edgeSelectedOutline, hoverOutline = _b.hoverOutline;
        var edgeOutline = [];
        for (var i = 0; i < edgeList.length; i++) {
            var edge = edgeList[i];
            if ((edgeSelectedOutline && edge.isSelected) ||
                (hoverOutline && edge.isHovered)) {
                if (edge.modelType === constant_1.ModelType.LINE_EDGE) {
                    edgeOutline.push(this.getLineOutline(edge));
                }
                else if (edge.modelType === constant_1.ModelType.POLYLINE_EDGE) {
                    edgeOutline.push(this.getPolylineOutline(edge));
                }
                else if (edge.modelType === constant_1.ModelType.BEZIER_EDGE) {
                    edgeOutline.push(this.getBezierOutline(edge));
                }
            }
        }
        return edgeOutline;
    };
    // 直线outline
    OutlineOverlay.prototype.getLineOutline = function (line) {
        var startPoint = line.startPoint, endPoint = line.endPoint;
        var x = (startPoint.x + endPoint.x) / 2;
        var y = (startPoint.y + endPoint.y) / 2;
        var width = Math.abs(startPoint.x - endPoint.x) + 10;
        var height = Math.abs(startPoint.y - endPoint.y) + 10;
        var style = line.getOutlineStyle();
        return ((0, jsx_runtime_1.jsx)(shape_1.Rect, __assign({ className: "lf-outline-edge", x: x, y: y, width: width, height: height }, style)));
    };
    // 折线outline
    OutlineOverlay.prototype.getPolylineOutline = function (polyline) {
        var points = polyline.points;
        var pointsList = (0, util_1.points2PointsList)(points);
        var bbox = (0, util_1.getBBoxOfPoints)(pointsList, 8);
        var x = bbox.x, y = bbox.y, width = bbox.width, height = bbox.height;
        var style = polyline.getOutlineStyle();
        return ((0, jsx_runtime_1.jsx)(shape_1.Rect, __assign({ className: "lf-outline", x: x, y: y, width: width, height: height }, style)));
    };
    // 曲线outline
    OutlineOverlay.prototype.getBezierOutline = function (bezier) {
        var path = bezier.path;
        var pointsList = (0, util_1.getBezierPoints)(path);
        var bbox = (0, util_1.getBBoxOfPoints)(pointsList, 8);
        var x = bbox.x, y = bbox.y, width = bbox.width, height = bbox.height;
        var style = bezier.getOutlineStyle();
        return ((0, jsx_runtime_1.jsx)(shape_1.Rect, __assign({ className: "lf-outline", x: x, y: y, width: width, height: height }, style)));
    };
    OutlineOverlay.prototype.render = function () {
        return ((0, jsx_runtime_1.jsxs)("g", { className: "lf-outline", children: [this.getNodesOutline(), this.getEdgeOutline()] }));
    };
    OutlineOverlay = __decorate([
        __1.observer
    ], OutlineOverlay);
    return OutlineOverlay;
}(compat_1.Component));
exports.OutlineOverlay = OutlineOverlay;
exports.default = OutlineOverlay;
