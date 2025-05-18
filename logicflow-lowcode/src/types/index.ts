import { LogicFlow } from '@logicflow/core';

// 节点类型
export type NodeType = 'input' | 'function' | 'transform' | 'filter' | 'stats' | 'output';

// 节点配置
export interface NodeConfig {
  type: string;
  text: string;
  properties: Record<string, any>;
}

// 节点属性
export interface NodeProperties {
  input?: string;
  function?: string;
  transform?: string;
  filter?: string;
  stats?: string;
  transformType?: 'cos' | 'tan' | 'exp' | 'log';
  scale?: number;
  condition?: 'greater_than' | 'less_than' | 'greater_equal' | 'less_equal' | 'equal';
  threshold?: number;
  statType?: 'mean' | 'sum' | 'max' | 'min';
}

// 边配置
export interface EdgeConfig {
  sourceNodeId: string;
  targetNodeId: string;
}

// 图数据
export interface GraphData {
  nodes: Array<{
    id: string;
    type: string;
    x: number;
    y: number;
    properties?: NodeProperties;
  }>;
  edges: EdgeConfig[];
}

// LogicFlow 实例类型
export type LogicFlowInstance = LogicFlow;

// 处理函数类型
export type ProcessFunction = (data: number[], properties: NodeProperties) => number[];

// 错误类型
export interface ProcessError extends Error {
  code?: string;
  details?: Record<string, any>;
} 