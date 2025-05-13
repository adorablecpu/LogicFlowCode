import LogicFlow from '../../LogicFlow';
import { BaseNodeModel } from '../../model';
import Position = LogicFlow.Position;
import OnDragNodeConfig = LogicFlow.OnDragNodeConfig;
export declare class Dnd {
    nodeConfig: OnDragNodeConfig | null;
    lf: LogicFlow;
    fakeNode: BaseNodeModel | null;
    constructor(params: {
        lf: LogicFlow;
    });
    clientToLocalPoint({ x, y }: Position): Position;
    startDrag(nodeConfig: OnDragNodeConfig): void;
    stopDrag: () => void;
    dragEnter: (e: MouseEvent) => void;
    onDragOver: (e: MouseEvent) => boolean;
    onDragLeave: () => void;
    onDrop: (e: MouseEvent) => void;
    eventMap(): {
        onMouseEnter: (e: MouseEvent) => void;
        onMouseOver: (e: MouseEvent) => void;
        onMouseMove: (e: MouseEvent) => boolean;
        onMouseLeave: () => void;
        onMouseUp: (e: MouseEvent) => void;
    };
}
export default Dnd;
