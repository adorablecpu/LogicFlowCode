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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlNodeModel = void 0;
var BaseNodeModel_1 = __importDefault(require("./BaseNodeModel"));
var constant_1 = require("../../constant");
var HtmlNodeModel = /** @class */ (function (_super) {
    __extends(HtmlNodeModel, _super);
    // @observable properties: IHtmlNodeProperties = {}
    function HtmlNodeModel(data, graphModel) {
        var _this = _super.call(this, data, graphModel) || this;
        _this.modelType = constant_1.ModelType.HTML_NODE;
        // this.properties = data.properties || {}
        _this.setAttributes();
        return _this;
    }
    HtmlNodeModel.prototype.setAttributes = function () {
        _super.prototype.setAttributes.call(this);
        var _a = this.properties, width = _a.width, height = _a.height;
        if (width)
            this.width = width;
        if (height)
            this.height = height;
    };
    HtmlNodeModel.prototype.getDefaultAnchor = function () {
        var _a = this, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        return [
            { x: x, y: y - height / 2, id: "".concat(this.id, "_0") },
            { x: x + width / 2, y: y, id: "".concat(this.id, "_1") },
            { x: x, y: y + height / 2, id: "".concat(this.id, "_2") },
            { x: x - width / 2, y: y, id: "".concat(this.id, "_3") },
        ];
    };
    return HtmlNodeModel;
}(BaseNodeModel_1.default));
exports.HtmlNodeModel = HtmlNodeModel;
exports.default = HtmlNodeModel;
