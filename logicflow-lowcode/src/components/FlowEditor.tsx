import { useLayoutEffect, useRef, useState } from 'react';
import LogicFlow, { RectNode, RectNodeModel } from '@logicflow/core';
import '@logicflow/core/es/index.css';
import { h } from '@logicflow/core';
import * as echarts from 'echarts';

// 自定义数据输入节点Model
class InputDataModel extends RectNodeModel {
  initNodeData(data: any) {
    super.initNodeData(data);
    this.width = 80;
    this.height = 40;
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

const FlowEditor = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lfRef = useRef<any>(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState<number[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      const lf = new LogicFlow({
        container: containerRef.current,
        grid: true,
      });
      lf.register({
        type: 'inputData',
        view: InputDataView,
        model: InputDataModel,
      });
      lf.register({
        type: 'sinFunction',
        view: SinFunctionView,
        model: SinFunctionModel,
      });
      lf.register({
        type: 'curveOutput',
        view: CurveOutputView,
        model: CurveOutputModel,
      });
      lf.render({ nodes: [], edges: [] });
      lfRef.current = lf;

      // 监听节点点击，弹窗输入参数
      lf.on('node:click', ({ data }) => {
        if (data.type === 'inputData') {
          const value = window.prompt('请输入数据（如1,2,3,4 或表达式）：', data.properties?.input || '');
          if (value !== null) {
            lf.setProperties(data.id, { input: value });
            // 不再调用updateText，直接依赖自定义View的动态渲染
          }
        } else if (data.type === 'sinFunction') {
          window.alert('sin函数节点暂不需要参数，后续可扩展');
        } else if (data.type === 'curveOutput') {
          window.alert('曲线输出节点暂不需要参数，后续可扩展');
        }
      });
    }
  }, []);

  // 按钮点击事件，添加数据输入节点
  const handleAddInputNode = () => {
    const lf = lfRef.current;
    console.log('lfRef.current', lf);
    if (lf) {
      lf.addNode({
        type: 'inputData',
        x: 200,
        y: 150,
      });
      console.log('已调用addNode');
    } else {
      console.log('lfRef.current不存在');
    }
  };

  // 添加sin函数节点
  const handleAddSinNode = () => {
    const lf = lfRef.current;
    if (lf) {
      lf.addNode({
        type: 'sinFunction',
        x: 350,
        y: 200,
      });
    }
  };

  // 添加曲线输出节点
  const handleAddCurveNode = () => {
    const lf = lfRef.current;
    if (lf) {
      lf.addNode({
        type: 'curveOutput',
        x: 500,
        y: 200,
      });
    }
  };

  // 生成JS代码
  const generateCode = () => {
    const lf = lfRef.current;
    if (!lf) return;
    const data = lf.getGraphData();
    // 简单处理：只支持一条主线
    // 1. 找到数据输入节点
    const inputNode = data.nodes.find((n: any) => n.type === 'inputData');
    // 2. 找到sin函数节点
    const sinNode = data.nodes.find((n: any) => n.type === 'sinFunction');
    // 3. 找到曲线输出节点
    const outputNode = data.nodes.find((n: any) => n.type === 'curveOutput');
    if (!inputNode || !sinNode || !outputNode) {
      setCode('// 请确保流程图包含数据输入、sin函数和曲线输出节点');
      return;
    }
    // 4. 读取参数
    const input = inputNode.properties?.input || '1,2,3,4,5,6';
    // 生成代码，自动转为数字数组
    const codeStr = `// 自动生成的JS代码\nconst input = "${input}".split(',').map(Number);\nconst output = input.map(x => Math.sin(x));\nconsole.log('sin曲线输出:', output);`;
    setCode(codeStr);
  };

  // 运行并绘图
  const runAndDraw = () => {
    if (!code) return;
    let output: number[] = [];
    try {
      // 构造安全的沙箱函数
      // eslint-disable-next-line no-new-func
      const run = new Function(`
      ${code}
      return typeof output !== 'undefined' ? output : [];
      `);
      output = run();
      if (!Array.isArray(output)) output = [];
    } catch (e) {
      output = [];
    }
    setOutput(output);
    // 绘制ECharts
    setTimeout(() => {
      if (chartRef.current) {
        echarts.dispose(chartRef.current); // 先销毁旧实例
        const chart = echarts.init(chartRef.current);
        chart.setOption({
          title: { text: 'sin曲线输出', left: 'center' },
          tooltip: {},
          xAxis: { type: 'category', data: output.map((_, i) => i + 1) },
          yAxis: {},
          series: [{
            name: 'sin(x)',
            type: 'line',
            smooth: true,
            data: output,
            showSymbol: false,
            lineStyle: { width: 3 }
          }]
        });
        chart.resize(); // 强制刷新
      }
    }, 0);
  };

  return (
    <div>
      <button onClick={handleAddInputNode} style={{ marginBottom: 16, marginRight: 8 }}>添加数据输入节点</button>
      <button onClick={handleAddSinNode} style={{ marginBottom: 16, marginRight: 8 }}>添加sin函数节点</button>
      <button onClick={handleAddCurveNode} style={{ marginBottom: 16, marginRight: 8 }}>添加曲线输出节点</button>
      <button onClick={generateCode} style={{ marginBottom: 16, background: '#222', color: '#fff', marginRight: 8 }}>生成代码</button>
      <button onClick={runAndDraw} style={{ marginBottom: 16, background: '#fa8c16', color: '#fff' }}>运行并绘图</button>
      <div style={{ width: 600, height: '500px', border: '1px solid #eee', marginTop: 8, background: '#fff' }} ref={containerRef}></div>
      {code && (
        <div style={{ marginTop: 24 }}>
          <h3>自动生成的JavaScript代码：</h3>
          <pre style={{ background: '#f6f8fa', padding: 16, borderRadius: 8 }}>{code}</pre>
        </div>
      )}
      <div style={{ width: 600, height: 320, margin: '32px auto 0', background: '#fff', borderRadius: 8 }} ref={chartRef}></div>
    </div>
  );
};

export default FlowEditor; 