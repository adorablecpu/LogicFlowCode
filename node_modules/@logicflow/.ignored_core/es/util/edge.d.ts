import LogicFlow from '../LogicFlow';
import { Options } from '../options';
import { Model, BaseNodeModel, BaseEdgeModel, GraphModel } from '../model';
import Point = LogicFlow.Point;
import Direction = LogicFlow.Direction;
import EdgeConfig = LogicFlow.EdgeConfig;
import Position = LogicFlow.Position;
import BoxBounds = Model.BoxBounds;
type PolyPointMap = Record<string, Point>;
type PolyPointLink = Record<string, string>;
export declare const setupEdgeModel: (edge: EdgeConfig, graphModel: GraphModel) => BaseEdgeModel<LogicFlow.PropertiesType>;
export declare const isBboxOverLapping: (b1: BoxBounds, b2: BoxBounds) => boolean;
export declare const filterRepeatPoints: (points: Point[]) => Point[];
export declare const getSimplePolyline: (sPoint: Point, tPoint: Point) => Point[];
export declare const getExpandedBBox: (bbox: BoxBounds, offset: number) => BoxBounds;
export declare const pointDirection: (point: Point, bbox: BoxBounds) => Direction;
export declare const getExpandedBBoxPoint: (expendBBox: BoxBounds, bbox: BoxBounds, point: Point) => Point;
export declare const mergeBBox: (b1: BoxBounds, b2: BoxBounds) => BoxBounds;
export declare const getBBoxOfPoints: (points?: Point[], offset?: number) => BoxBounds;
export declare const getPointsFromBBox: (bbox: BoxBounds) => [Point, Point, Point, Point];
export declare const isPointOutsideBBox: (point: Point, bbox: BoxBounds) => boolean;
export declare const getBBoxXCrossPoints: (bbox: BoxBounds, x: number) => [Point, Point] | [
];
export declare const getBBoxYCrossPoints: (bbox: BoxBounds, y: number) => [Point, Point] | [
];
export declare const getBBoxCrossPointsByPoint: (bbox: BoxBounds, point: Point) => [Point, Point, Point, Point] | [Point, Point] | [
];
export declare const estimateDistance: (p1: Point, p2: Point) => number;
export declare const costByPoints: (p: Point, points: Point[]) => number;
export declare const heuristicCostEstimate: (p: Point, ps: Point, pt: Point, source?: Point, target?: Point) => number;
export declare const rebuildPath: (pathPoints: Point[], pointById: PolyPointMap, cameFrom: PolyPointLink, currentId: string, iterator?: number) => void;
export declare const removeClosePointFromOpenList: (arr: Point[], item: Point) => void;
export declare const isSegmentsIntersected: (p0: Point, p1: Point, p2: Point, p3: Point) => boolean;
export declare const isSegmentCrossingBBox: (p1: Point, p2: Point, bbox: BoxBounds) => boolean;
export declare const getNextNeighborPoints: (points: Point[], point: Point, bbox1: BoxBounds, bbox2: BoxBounds) => Point[];
export declare const pathFinder: (points: Point[], start: Point, goal: Point, sBBox: BoxBounds, tBBox: BoxBounds, os: Point, ot: Point) => Point[];
export declare const getBoxByOriginNode: (node: BaseNodeModel) => BoxBounds;
export declare const pointFilter: (points: Point[]) => Point[];
export declare const getPolylinePoints: (start: Point, end: Point, sNode: BaseNodeModel, tNode: BaseNodeModel, offset: number) => Point[];
/**
 * 获取折线中最长的一个线
 * @param pointsList 多个点组成的数组
 */
export declare const getLongestEdge: (pointsList: Point[]) => [Point, Point];
export declare const isSegmentsInNode: (start: Point, end: Point, node: BaseNodeModel) => boolean;
export declare const isSegmentsCrossNode: (start: Point, end: Point, node: BaseNodeModel) => boolean;
export declare const getCrossPointInRect: (start: Point, end: Point, node: BaseNodeModel) => Point | false | undefined;
export declare const segmentDirection: (start: Point, end: Point) => Direction | undefined;
export declare const points2PointsList: (points: string) => Point[];
export declare const getSimplePoints: (start: Point, end: Point, sPoint: Point, tPoint: Point) => Point[];
export declare const getBytesLength: (word: string) => number;
export declare const getTextWidth: (text: string, font: string) => number;
type AppendAttributesType = {
    d: string;
    fill: string;
    stroke: string;
    strokeWidth: number;
    strokeDasharray: string;
};
export declare const getAppendAttributes: (appendInfo: Record<'start' | 'end', Point>) => AppendAttributesType;
export type IBezierControls = {
    sNext: Point;
    ePre: Point;
};
export declare const getBezierControlPoints: ({ start, end, sourceNode, targetNode, offset, }: {
    start: Point;
    end: Point;
    sourceNode: BaseNodeModel;
    targetNode: BaseNodeModel;
    offset: number;
}) => IBezierControls;
export type IBezierPoints = {
    start: Point;
    sNext: Point;
    ePre: Point;
    end: Point;
};
export declare const getBezierPoints: (path: string) => [Point, Point, Point, Point];
export declare const getEndTangent: (pointsList: Point[], offset: number) => [Point, Point];
/**
 * 获取移动边后，文本位置距离边上的最近的一点
 * @param point 边上文本的位置
 * @param points 边的各个拐点
 * TODO: Label实验没问题后统一改成新的计算方式，把这个方法废弃
 */
export declare const getClosestPointOfPolyline: (point: Point, points: string) => Point;
export declare const pickEdgeConfig: (data: EdgeConfig) => EdgeConfig;
export declare const twoPointDistance: (source: Position, target: Position) => number;
/**
 * 包装边生成函数
 * @param graphModel graph model
 * @param generator 用户自定义的边生成函数
 */
export declare function createEdgeGenerator(graphModel: GraphModel, generator?: Options.EdgeGeneratorType | unknown): any;
export type IGetSvgTextSizeParams = {
    rows: string[];
    rowsLength: number;
    fontSize: number;
};
export declare const getSvgTextSize: ({ rows, rowsLength, fontSize, }: IGetSvgTextSizeParams) => LogicFlow.RectSize;
export {};
