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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Polygon = void 0;
var jsx_runtime_1 = require("preact/jsx-runtime");
var lodash_es_1 = require("lodash-es");
function Polygon(props) {
    var _a = props.points, points = _a === void 0 ? [] : _a, className = props.className;
    var attrs = {
        fill: 'transparent',
        fillOpacity: 1,
        strokeWidth: 1,
        stroke: '#000',
        strokeOpacity: 1,
        points: '',
    };
    (0, lodash_es_1.forEach)((0, lodash_es_1.toPairs)(props), function (_a) {
        var _b = __read(_a, 2), k = _b[0], v = _b[1];
        if (typeof v !== 'object') {
            attrs[k] = v;
        }
    });
    if (className) {
        attrs.classNmae = "lf-basic-shape ".concat(className);
    }
    else {
        attrs.className = 'lf-basic-shape';
    }
    attrs.points = points.map(function (point) { return point.join(','); }).join(' ');
    return (0, jsx_runtime_1.jsx)("polygon", __assign({}, attrs));
}
exports.Polygon = Polygon;
exports.default = Polygon;
