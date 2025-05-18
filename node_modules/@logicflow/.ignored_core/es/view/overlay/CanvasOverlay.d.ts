import { Component } from 'preact/compat';
import Dnd from '../behavior/dnd';
import GraphModel from '../../model/GraphModel';
import { StepDrag, IDragParams } from '../../util';
type IProps = {
    graphModel: GraphModel;
    dnd: Dnd;
};
type IState = {
    isDragging: boolean;
};
export declare class CanvasOverlay extends Component<IProps, IState> {
    stepDrag: StepDrag;
    stepScrollX: number;
    stepScrollY: number;
    constructor(props: IProps);
    onDragging: ({ deltaX, deltaY }: IDragParams) => void;
    onDragEnd: () => void;
    zoomHandler: (ev: WheelEvent) => void;
    clickHandler: (ev: MouseEvent) => void;
    handleContextMenu: (ev: MouseEvent) => void;
    mouseDownHandler: (ev: MouseEvent) => void;
    render(): import("preact/compat").JSX.Element;
}
export default CanvasOverlay;
