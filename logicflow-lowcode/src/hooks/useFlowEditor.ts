import { useRef, useState, useCallback } from 'react';
import LogicFlow from '@logicflow/core';
import { message } from 'antd';
import { logger } from '../utils/logger';
import { NODE_TYPES, NODE_CONFIGS } from '../constants/nodes';
import type { NodeType, NodeProperties, GraphData, ProcessError } from '../types';

export const useFlowEditor = () => {
  const lfRef = useRef<LogicFlow | null>(null);
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<number[]>([]);

  // 初始化 LogicFlow
  const initLogicFlow = useCallback((container: HTMLElement) => {
    if (!lfRef.current) {
      lfRef.current = new LogicFlow({
        container,
        grid: true,
        nodeTextEdit: false,
        edgeTextEdit: false,
      });
      lfRef.current.render();
    }
  }, []);

  // 添加节点
  const addNode = useCallback((nodeType: NodeType) => {
    const lf = lfRef.current;
    if (!lf) {
      logger.error('LogicFlow 实例未初始化');
      return;
    }

    const config = NODE_CONFIGS[nodeType];
    if (!config) {
      logger.error('未知的节点类型', { nodeType });
      return;
    }

    lf.addNode({
      type: `${nodeType}-1`,
      x: 200,
      y: 150,
      properties: config.properties
    });
    logger.info('添加节点', { nodeType });
  }, []);

  // 生成代码
  const generateCode = useCallback(() => {
    const lf = lfRef.current;
    if (!lf) {
      logger.error('LogicFlow 实例未初始化');
      return;
    }

    const { nodes, edges } = lf.getGraphData() as GraphData;
    if (edges.length === 0) {
      logger.warn('节点连接验证失败');
      message.error('请连接节点');
      return;
    }

    const inputNode = nodes.find(node => node.type === `${NODE_TYPES.INPUT}-1`);
    if (!inputNode) {
      logger.warn('未找到输入节点');
      message.error('请添加数据输入节点');
      return;
    }

    const input = inputNode.properties?.input || '1,2,3,4,5,6';
    let codeStr = `// 自动生成的JS代码
const input = "${input}".split(',').map(Number);
let data = input;\n`;

    // 按顺序处理节点
    const processChain = buildProcessChain(nodes, edges);
    processChain.forEach(node => {
      const nodeType = node.type.split('-')[0] as NodeType;
      const properties = node.properties || {};
      codeStr += `// 处理 ${NODE_CONFIGS[nodeType].text}
data = processNode('${nodeType}', data, ${JSON.stringify(properties)});\n`;
    });

    codeStr += `console.log('处理结果:', data);`;
    setCode(codeStr);
    logger.info('代码生成成功', { code: codeStr });
  }, []);

  // 运行代码
  const runCode = useCallback(() => {
    try {
      if (!code) {
        logger.warn('尝试运行未生成的代码');
        message.error('请先生成代码');
        return;
      }

      // 创建沙箱环境
      const sandbox = {
        console: {
          log: (...args: any[]) => {
            const output = args[0];
            if (Array.isArray(output)) {
              setOutput(output);
            }
          }
        }
      };

      // 使用 Function 构造函数创建沙箱
      const fn = new Function('console', code);
      fn(sandbox.console);
      logger.info('代码运行成功');
    } catch (error) {
      const processError = error as ProcessError;
      logger.error('代码运行失败', { error: processError.message });
      message.error('运行失败：' + processError.message);
    }
  }, [code]);

  return {
    lfRef,
    code,
    output,
    initLogicFlow,
    addNode,
    generateCode,
    runCode
  };
};

// 构建处理链
const buildProcessChain = (nodes: GraphData['nodes'], edges: GraphData['edges']): GraphData['nodes'] => {
  const chain: GraphData['nodes'] = [];
  let currentNode = nodes.find(n => n.type === `${NODE_TYPES.INPUT}-1`);
  
  while (currentNode) {
    chain.push(currentNode);
    const nextEdge = edges.find(e => e.sourceNodeId === currentNode?.id);
    if (!nextEdge) break;
    currentNode = nodes.find(n => n.id === nextEdge.targetNodeId);
  }
  
  return chain;
}; 