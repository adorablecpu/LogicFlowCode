// import { NodeType, NodeProperties, GraphData, ProcessError } from '../types';
import type { NodeType, GraphData, ProcessError } from '../types';
import { NODE_TYPES, FILTER_CONDITIONS, STAT_TYPES, TRANSFORM_TYPES } from '../constants/nodes';

// 定义流程图的节点
interface FlowNode {
  id: string;
  type: NodeType;
  properties?: any; // Use any for now due to dynamic nature
}

// 定义流程图的边
interface FlowEdge {
  sourceNodeId: string;
  targetNodeId: string;
}

// ... existing code ... 