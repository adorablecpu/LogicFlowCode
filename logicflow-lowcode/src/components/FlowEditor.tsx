import { useLayoutEffect, useRef, useState, useCallback, useEffect } from 'react';
import LogicFlow, { RectNode, RectNodeModel } from '@logicflow/core';
import '@logicflow/core/dist/style/index.css';
import { h } from '@logicflow/core';
import * as echarts from 'echarts';
import { message, Button, Tooltip } from 'antd';
// import 'antd/dist/antd.css';
import HelpModal from './HelpModal';
import { QuestionCircleOutlined, CodeOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { logger } from '../utils/logger';
import styles from './FlowEditor.module.css';
import { NODE_TYPES, NODE_CONFIGS, TRANSFORM_TYPES, FILTER_CONDITIONS, STAT_TYPES } from '../constants/nodes';
import type { NodeType, GraphData, NodeProperties } from '../types';

// 自定义数据输入节点Model
class InputDataModel extends RectNodeModel {
  initNodeData(data: any) {
    super.initNodeData(data);
    this.width = 80;
    this.height = 40;
  }
  setAttributes() {
    super.setAttributes && super.setAttributes();
    const input = this.properties.input ? `输入:${this.properties.input}` : '数据输入';
    const minWidth = 80;
    const padding = 32;
    // 估算宽度：每个字符 12px
    this.width = Math.max(minWidth, input.length * 12 + padding);
  }
  getNodeStyle() {
    const style = super.getNodeStyle();
    style.fill = '#e6f7ff';
    style.stroke = '#1890ff';
    style.radius = 8;
    return style;
  }
}
// 自定义数据输入节点View
class InputDataView extends RectNode {
  getShape() {
    const { x, y, width, height, properties } = this.props.model;
    // 动态显示输入内容，只显示一行
    const text = properties.input ? `输入:${properties.input}` : '数据输入';
    return h(
      'g',
      {},
      [
        h('rect', {
          x: x - width / 2,
          y: y - height / 2,
          width,
          height,
          fill: '#e6f7ff',
          stroke: '#1890ff',
          rx: 8,
          ry: 8,
        }),
        h('text', {
          x,
          y,
          textAnchor: 'middle',
          dominantBaseline: 'middle',
          fontSize: 14,
          fill: '#1890ff',
        }, text)
      ]
    );
  }
}

// sin函数节点Model
class SinFunctionModel extends RectNodeModel {
  initNodeData(data: any) {
    super.initNodeData(data);
    this.width = 80;
    this.height = 40;
  }
  getNodeStyle() {
    const style = super.getNodeStyle();
    style.fill = '#f6ffed';
    style.stroke = '#52c41a';
    style.radius = 8;
    return style;
  }
}
// sin函数节点View
class SinFunctionView extends RectNode {
  getShape() {
    const { x, y, width, height } = this.props.model;
    return h(
      'g',
      {},
      [
        h('rect', {
          x: x - width / 2,
          y: y - height / 2,
          width,
          height,
          fill: '#f6ffed',
          stroke: '#52c41a',
          rx: 8,
          ry: 8,
        }),
        h('text', {
          x,
          y,
          textAnchor: 'middle',
          dominantBaseline: 'middle',
          fontSize: 14,
          fill: '#52c41a',
        }, 'sin函数')
      ]
    );
  }
}

// 曲线输出节点Model
class CurveOutputModel extends RectNodeModel {
  initNodeData(data: any) {
    super.initNodeData(data);
    this.width = 80;
    this.height = 40;
  }
  getNodeStyle() {
    const style = super.getNodeStyle();
    style.fill = '#fff7e6';
    style.stroke = '#fa8c16';
    style.radius = 8;
    return style;
  }
}
// 曲线输出节点View
class CurveOutputView extends RectNode {
  getShape() {
    const { x, y, width, height } = this.props.model;
    return h(
      'g',
      {},
      [
        h('rect', {
          x: x - width / 2,
          y: y - height / 2,
          width,
          height,
          fill: '#fff7e6',
          stroke: '#fa8c16',
          rx: 8,
          ry: 8,
        }),
        h('text', {
          x,
          y,
          textAnchor: 'middle',
          dominantBaseline: 'middle',
          fontSize: 14,
          fill: '#fa8c16',
        }, '曲线输出')
      ]
    );
  }
}

// 数据转换节点Model
class TransformDataModel extends RectNodeModel {
  initNodeData(data: any) {
    super.initNodeData(data);
    this.width = 80;
    this.height = 40;
  }
  getNodeStyle() {
    const style = super.getNodeStyle();
    style.fill = '#fffbe6';
    style.stroke = '#faad14';
    style.radius = 8;
    return style;
  }
}
// 数据转换节点View
class TransformDataView extends RectNode {
  getShape() {
    const { x, y, width, height } = this.props.model;
    return h(
      'g',
      {},
      [
        h('rect', {
          x: x - width / 2,
          y: y - height / 2,
          width,
          height,
          fill: '#fffbe6',
          stroke: '#faad14',
          rx: 8,
          ry: 8,
        }),
        h('text', {
          x,
          y,
          textAnchor: 'middle',
          dominantBaseline: 'middle',
          fontSize: 14,
          fill: '#faad14',
        }, '数据转换')
      ]
    );
  }
}

// 数据过滤节点Model
class FilterDataModel extends RectNodeModel {
  initNodeData(data: any) {
    super.initNodeData(data);
    this.width = 80;
    this.height = 40;
  }
  getNodeStyle() {
    const style = super.getNodeStyle();
    style.fill = '#f9f0ff';
    style.stroke = '#722ed1';
    style.radius = 8;
    return style;
  }
}
// 数据过滤节点View
class FilterDataView extends RectNode {
  getShape() {
    const { x, y, width, height } = this.props.model;
    return h(
      'g',
      {},
      [
        h('rect', {
          x: x - width / 2,
          y: y - height / 2,
          width,
          height,
          fill: '#f9f0ff',
          stroke: '#722ed1',
          rx: 8,
          ry: 8,
        }),
        h('text', {
          x,
          y,
          textAnchor: 'middle',
          dominantBaseline: 'middle',
          fontSize: 14,
          fill: '#722ed1',
        }, '数据过滤')
      ]
    );
  }
}

// 数据统计节点Model
class StatsDataModel extends RectNodeModel {
  initNodeData(data: any) {
    super.initNodeData(data);
    this.width = 80;
    this.height = 40;
  }
  getNodeStyle() {
    const style = super.getNodeStyle();
    style.fill = '#e6fffb';
    style.stroke = '#13c2c2';
    style.radius = 8;
    return style;
  }
}
// 数据统计节点View
class StatsDataView extends RectNode {
  getShape() {
    const { x, y, width, height } = this.props.model;
    return h(
      'g',
      {},
      [
        h('rect', {
          x: x - width / 2,
          y: y - height / 2,
          width,
          height,
          fill: '#e6fffb',
          stroke: '#13c2c2',
          rx: 8,
          ry: 8,
        }),
        h('text', {
          x,
          y,
          textAnchor: 'middle',
          dominantBaseline: 'middle',
          fontSize: 14,
          fill: '#13c2c2',
        }, '数据统计')
      ]
    );
  }
}

// 添加节点处理函数
const processNode = (nodeType: NodeType, input: number[], properties: NodeProperties): number[] => {
  switch (nodeType) {
    case NODE_TYPES.INPUT:
      return input;
    case NODE_TYPES.FUNCTION:
      return input.map(x => Math.sin(x));
    case NODE_TYPES.TRANSFORM: {
      const { transformType, scale } = properties;
      const numScale = scale !== undefined ? Number(scale) : 1;
      if (isNaN(numScale)) return input;
      // Compare directly with constants
      switch (transformType) {
        case TRANSFORM_TYPES.COS:
          return input.map(x => Math.cos(x) * numScale);
        case TRANSFORM_TYPES.TAN:
          return input.map(x => Math.tan(x) * numScale);
        case TRANSFORM_TYPES.EXP:
          return input.map(x => Math.exp(x) * numScale);
        case TRANSFORM_TYPES.LOG:
          return input.map(x => Math.log(x) * numScale);
        default:
          logger.warn('Unsupported transform type in processNode:', { transformType });
          return input;
      }
    }
    case NODE_TYPES.FILTER: {
      const { condition, threshold } = properties;
       const numThreshold = Number(threshold);
       if (isNaN(numThreshold)) return input; // Return original if threshold is not a number
      return input.filter(x => {
        // Compare directly with constants
        switch (condition) {
         // @ts-ignore
         case FILTER_CONDITIONS.GREATER_THAN: return x > numThreshold;
         // @ts-ignore
         case FILTER_CONDITIONS.LESS_THAN: return x < numThreshold;
         // @ts-ignore
         case FILTER_CONDITIONS.GREATER_EQUAL: return x >= numThreshold;
         // @ts-ignore
         case FILTER_CONDITIONS.LESS_EQUAL: return x <= numThreshold;
         // @ts-ignore
         case FILTER_CONDITIONS.EQUAL: return x === numThreshold;
          default: 
            logger.warn('Unsupported filter condition in processNode:', { condition });
            return true;
        }
      });
    }
    case NODE_TYPES.STATS: {
      const { statType } = properties;
      // Compare directly with constants
      switch (statType) {
        case STAT_TYPES.MEAN:
          return input.length > 0 ? [input.reduce((a, b) => a + b, 0) / input.length] : [];
        case STAT_TYPES.SUM:
          return [input.reduce((a, b) => a + b, 0)];
        case STAT_TYPES.MAX:
          return [Math.max(...input)];
        case STAT_TYPES.MIN:
          return [Math.min(...input)];
        default:
          logger.warn('Unsupported stat type in processNode:', { statType });
          return []; // Returning empty array for unsupported stats type
      }
    }
    case NODE_TYPES.OUTPUT:
      return input;
    default:
      logger.error('Unknown node type in processNode:', { nodeType });
      return input;
  }
};

const FlowEditor = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const [lf, setLf] = useState<LogicFlow | null>(null);
  const [code, setCode] = useState<string>('');
  const [showHelp, setShowHelp] = useState(false);
  const [selectedNode, setSelectedNode] = useState<NodeType | null>(null);
  const [output, setOutput] = useState<number[]>([]);
  const [hasChart, setHasChart] = useState(false);

  useLayoutEffect(() => {
    if (containerRef.current && !lf) {
      const logicflow = new LogicFlow({
        container: containerRef.current,
        grid: true,
        nodeTextEdit: false,
        edgeTextEdit: false,
      });

      // 注册节点
      logicflow.register({
        type: `${NODE_TYPES.INPUT}-1`,
        view: InputDataView,
        model: InputDataModel,
      });
      logicflow.register({
        type: `${NODE_TYPES.FUNCTION}-1`,
        view: SinFunctionView,
        model: SinFunctionModel,
      });
      logicflow.register({
        type: `${NODE_TYPES.OUTPUT}-1`,
        view: CurveOutputView,
        model: CurveOutputModel,
      });

      // Register new nodes
      logicflow.register({
        type: `${NODE_TYPES.TRANSFORM}-1`,
        view: TransformDataView,
        model: TransformDataModel,
      });
      logicflow.register({
        type: `${NODE_TYPES.FILTER}-1`,
        view: FilterDataView,
        model: FilterDataModel,
      });
      logicflow.register({
        type: `${NODE_TYPES.STATS}-1`,
        view: StatsDataView,
        model: StatsDataModel,
      });

      logicflow.render();
      setLf(logicflow);

      // 监听节点点击，弹窗输入参数
      logicflow.on('node:click', ({ data }) => {
        const nodeType = data.type.split('-')[0] as NodeType; // Type assertion here

        if (nodeType === NODE_TYPES.INPUT) {
          const value = window.prompt('请输入数据（如1,2,3,4,5,6）：', data.properties?.input || '');
          if (value !== null) {
            if (validateInput(value)) {
              logicflow.setProperties(data.id, { input: value });
            } else {
              message.error('输入必须是数字，用逗号分隔');
            }
          }
        } else if (nodeType === NODE_TYPES.TRANSFORM) {
           const currentTransformType = data.properties?.transformType || TRANSFORM_TYPES.COS;
           const currentScale = data.properties?.scale !== undefined ? data.properties.scale : 1;
           // Fixed template string syntax
           const newTransformType = window.prompt(`请输入转换类型 (${Object.values(TRANSFORM_TYPES).join(', ')})`, currentTransformType);
           if (newTransformType !== null && (Object.values(TRANSFORM_TYPES) as string[]).includes(newTransformType)) {
             const validTransformType = newTransformType as keyof typeof TRANSFORM_TYPES; // Type assertion after validation
             const newScale = window.prompt('请输入缩放比例：', currentScale);
             if (newScale !== null && !isNaN(Number(newScale))) {
                 logicflow.setProperties(data.id, { transformType: validTransformType, scale: Number(newScale) });
             } else if (newScale === null) {
                  logicflow.setProperties(data.id, { transformType: validTransformType }); // User cancelled setting scale
             } else {
                 message.error('缩放比例必须是数字');
             }
           } else if (newTransformType !== null) {
              message.error(`无效的转换类型，请输入以下之一：${Object.values(TRANSFORM_TYPES).join(', ')}`);
           }
        } else if (nodeType === NODE_TYPES.FILTER) {
           const currentCondition = data.properties?.condition || FILTER_CONDITIONS.GREATER_THAN;
           const currentThreshold = data.properties?.threshold !== undefined ? data.properties.threshold : 0;
           // Fixed template string syntax
           const newCondition = window.prompt(`请输入过滤条件 (${Object.values(FILTER_CONDITIONS).join(', ')})`, currentCondition);

           if (newCondition !== null && (Object.values(FILTER_CONDITIONS) as string[]).includes(newCondition)) {
             const validCondition = newCondition as keyof typeof FILTER_CONDITIONS;
             const newThreshold = window.prompt('请输入阈值:', currentThreshold);
             if (newThreshold !== null && !isNaN(Number(newThreshold))) {
                logicflow.setProperties(data.id, { condition: validCondition, threshold: Number(newThreshold) });
             } else if (newThreshold === null) {
                 logicflow.setProperties(data.id, { condition: validCondition });
             } else {
                 message.error('阈值必须是数字');
             }
           } else if (newCondition !== null) {
              message.error(`无效的过滤条件，请输入以下之一：${Object.values(FILTER_CONDITIONS).join(', ')}`);
           }
        } else if (nodeType === NODE_TYPES.STATS) {
           const currentStatType = data.properties?.statType || STAT_TYPES.MEAN;
           // Fixed template string syntax
           const newStatType = window.prompt(`请输入统计类型 (${Object.values(STAT_TYPES).join(', ')})`, currentStatType);
           if (newStatType !== null && (Object.values(STAT_TYPES) as string[]).includes(newStatType)) {
             const validStatType = newStatType as keyof typeof STAT_TYPES;
             logicflow.setProperties(data.id, { statType: validStatType });
           } else if (newStatType !== null) {
             message.error(`无效的统计类型，请输入以下之一：${Object.values(STAT_TYPES).join(', ')}`);
           }
        }
        // For other node types like FUNCTION and OUTPUT, no properties to configure via click for now
      });
    }
  }, [lf]);

  useEffect(() => {
    let chart: echarts.ECharts | null = null;
    if (chartRef.current && output.length > 0) {
      logger.info('Attempting to initialize ECharts in useEffect...');
      try {
        chart = echarts.init(chartRef.current);
        logger.info('ECharts instance initialized successfully in useEffect.', { disposed: chart.isDisposed() });
        const option = {
          title: { text: '数据处理结果' },
          tooltip: { trigger: 'axis' },
          xAxis: { type: 'category', data: output.map((_, i) => i + 1) },
          yAxis: { type: 'value' },
          series: [{ data: output, type: 'line', smooth: true }]
        };
        logger.info('Attempting to set ECharts option in useEffect...');
        chart.setOption(option);
        logger.info('ECharts option set successfully in useEffect.');
      } catch (chartError: any) {
        logger.error('Error during ECharts initialization or setOption in useEffect:', { error: chartError.message });
      }
    }

    return () => {
      if (chart && !chart.isDisposed()) {
        chart.dispose();
        logger.info('ECharts instance disposed in useEffect cleanup.');
      }
    };
  }, [chartRef.current, output]);

  const handleAddNode = useCallback((nodeType: NodeType) => {
    if (!lf) return;
    setSelectedNode(nodeType);
    const config = NODE_CONFIGS[nodeType];
    lf.addNode({
      type: `${nodeType}-1`,
      x: 200,
      y: 150,
      properties: config.properties
    });
  }, [lf, selectedNode]);

  const validateInput = (input: string): boolean => {
    const numbers = input.split(',').map(n => n.trim());
    return numbers.every(n => !isNaN(Number(n)));
  };

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

  const generateCode = useCallback(() => {
    if (!lf) return;
    const { nodes, edges } = lf.getGraphData() as GraphData;
    if (edges.length === 0) {
      message.error('请连接节点');
      return;
    }

    const inputNode = nodes.find(node => node.type === `${NODE_TYPES.INPUT}-1`);
    if (!inputNode) {
      message.error('请添加数据输入节点');
      return;
    }

    const input = inputNode.properties?.input || '1,2,3,4,5,6';
    if (!validateInput(input)) {
      message.error('输入数据格式不正确');
      return;
    }

    let codeStr = `// 自动生成的JS代码
const input = "${input}".split(',').map(Number);
let data = input;\n`;

    const processChain = buildProcessChain(nodes, edges);
    processChain.forEach(node => {
      const nodeType = node.type.split('-')[0] as NodeType;
      const properties = node.properties || {};
      codeStr += `// 处理 ${NODE_CONFIGS[nodeType].text}
data = processNode('${nodeType}', data, ${JSON.stringify(properties)});\n`;
    });

    codeStr += `console.log('处理结果:', data);`;
    setCode(codeStr);
  }, [lf]);

  const runAndDraw = useCallback(() => {
    if (!code) {
      message.error('请先生成代码');
      setHasChart(false);
      setOutput([]);
      return;
    }
    try {
      setHasChart(false);
      setOutput([]);

      const sandbox = {
        console: {
          log: (...args: any[]) => {
            logger.info('Sandbox console log received args:', args);

            let dataArray: number[] | null = null;
            for (const arg of args) {
              if (Array.isArray(arg)) {
                dataArray = arg;
                logger.info('Found array data in console log arguments.', { data: dataArray });
                break;
              }
            }

            if (dataArray && dataArray.length > 0) {
              setOutput(dataArray);
              setHasChart(true);
              logger.info('Output data set, hasChart set to true.');
            } else {
              logger.warn('No valid array data found in console log arguments, cannot plot chart.', { argsReceived: args });
              setOutput([]);
              setHasChart(false);
            }
          }
        }
      };
      const fn = new Function('console', 'processNode', code);
      if (typeof processNode === 'function') {
         fn(sandbox.console, processNode);
         logger.info('Code executed in sandbox.');
      } else {
         logger.error('processNode function is not available in this scope.');
         message.error('运行失败：processNode 函数未定义');
         setHasChart(false);
      }
    } catch (error: unknown) {
      setHasChart(false);
      setOutput([]);
      const errorMessage = error instanceof Error ? error.message : '未知错误';
      logger.error('Code execution failed:', { error: errorMessage });
      message.error('运行失败：' + errorMessage);
    }
  }, [code]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>LogicFlow 低代码平台</h1>
        <div className={styles.toolbar}>
          <Button type="primary" icon={<CodeOutlined />} onClick={generateCode}>
            生成代码
          </Button>
          <Button type="primary" icon={<PlayCircleOutlined />} onClick={runAndDraw}>
            运行
          </Button>
          <Tooltip title="使用帮助">
            <QuestionCircleOutlined className={styles.helpButton} onClick={() => setShowHelp(true)} />
          </Tooltip>
        </div>
      </header>

      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <div className={styles.nodeList}>
            {Object.entries(NODE_CONFIGS).map(([type, config]) => (
              <div
                key={type}
                className={`${styles.nodeItem} ${selectedNode === type ? styles.active : ''}`}
                onClick={() => handleAddNode(type as NodeType)}
              >
                {config.text}
              </div>
            ))}
          </div>
        </aside>

        <main className={styles.editor}>
          <div ref={containerRef} className={styles.canvas} />
          <div ref={chartRef} className={styles.preview} style={{ display: hasChart ? 'block' : 'none' }}/>
          {code && (
            <div className={styles.codePanel}>
              <div className={styles.codeHeader}>
                <h3 className={styles.codeTitle}>生成的代码</h3>
              </div>
              <pre className={styles.codeContent}>{code}</pre>
            </div>
          )}
        </main>
      </div>

      <HelpModal visible={showHelp} onClose={() => setShowHelp(false)} />
    </div>
  );
};

export default FlowEditor; 