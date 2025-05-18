// 节点类型定义
export const NODE_TYPES = {
  INPUT: 'input',
  FUNCTION: 'function',
  TRANSFORM: 'transform',
  FILTER: 'filter',
  STATS: 'stats',
  OUTPUT: 'output'
} as const;

// 节点配置
export const NODE_CONFIGS = {
  [NODE_TYPES.INPUT]: {
    type: 'rect',
    text: '数据输入',
    properties: {
      input: '1,2,3,4,5,6'
    }
  },
  [NODE_TYPES.FUNCTION]: {
    type: 'rect',
    text: 'sin函数',
    properties: {}
  },
  [NODE_TYPES.TRANSFORM]: {
    type: 'rect',
    text: '数据转换',
    properties: {
      transformType: 'cos',
      scale: 1
    }
  },
  [NODE_TYPES.FILTER]: {
    type: 'rect',
    text: '数据过滤',
    properties: {
      condition: '>',
      threshold: 0
    }
  },
  [NODE_TYPES.STATS]: {
    type: 'rect',
    text: '数据统计',
    properties: {
      statType: 'mean'
    }
  },
  [NODE_TYPES.OUTPUT]: {
    type: 'rect',
    text: '曲线输出',
    properties: {}
  }
} as const;

// 转换类型选项
export const TRANSFORM_TYPES = {
  COS: 'cos',
  TAN: 'tan',
  EXP: 'exp',
  LOG: 'log'
} as const;

// 过滤条件选项
export const FILTER_CONDITIONS = {
  GREATER_THAN: '>',
  LESS_THAN: '<',
  GREATER_EQUAL: '>=',
  LESS_EQUAL: '<=',
  EQUAL: '=='
} as const;

// 统计类型选项
export const STAT_TYPES = {
  MEAN: 'mean',
  SUM: 'sum',
  MAX: 'max',
  MIN: 'min'
} as const; 