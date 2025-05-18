import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FlowEditor from '../FlowEditor';
import { message } from 'antd';
import { logger } from '../../utils/logger';

// Mock antd message
vi.mock('antd', () => ({
  message: {
    error: vi.fn(),
    success: vi.fn()
  },
  Button: ({ children, onClick }: any) => (
    <button onClick={onClick}>{children}</button>
  ),
  Space: ({ children }: any) => <div>{children}</div>,
  Tooltip: ({ children }: any) => <div>{children}</div>
}));

// Mock LogicFlow
vi.mock('@logicflow/core', () => ({
  default: vi.fn().mockImplementation(() => ({
    register: vi.fn(),
    render: vi.fn(),
    addNode: vi.fn(),
    getNodeModelById: vi.fn(),
    getGraphData: vi.fn().mockReturnValue({
      nodes: [],
      edges: []
    }),
    setProperties: vi.fn(),
    on: vi.fn()
  })),
  h: vi.fn()
}));

// Mock echarts
vi.mock('echarts', () => ({
  init: vi.fn().mockReturnValue({
    setOption: vi.fn()
  })
}));

// Mock logger
vi.mock('../../utils/logger', () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn()
  }
}));

describe('FlowEditor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<FlowEditor />);
    expect(screen.getByText('添加数据输入节点')).toBeInTheDocument();
  });

  it('shows help modal when help button is clicked', () => {
    render(<FlowEditor />);
    const helpButton = screen.getByText('帮助');
    fireEvent.click(helpButton);
    expect(screen.getByText('使用帮助')).toBeInTheDocument();
  });

  it('validates input data format', () => {
    render(<FlowEditor />);
    const inputNode = {
      type: 'inputData',
      properties: {
        input: 'invalid'
      }
    };
    
    // 模拟节点点击事件
    const lf = require('@logicflow/core').default.mock.results[0].value;
    const clickHandler = lf.on.mock.calls[0][1];
    clickHandler({ data: inputNode });
    
    expect(message.error).toHaveBeenCalledWith('输入必须是数字，用逗号分隔');
    expect(logger.warn).toHaveBeenCalledWith('输入数据格式错误', { input: 'invalid' });
  });

  it('generates code when nodes are connected', () => {
    render(<FlowEditor />);
    const lf = require('@logicflow/core').default.mock.results[0].value;
    
    // 模拟有效的节点连接
    lf.getGraphData.mockReturnValue({
      nodes: [
        { id: 'input-1', type: 'inputData', properties: { input: '1,2,3' } }
      ],
      edges: [
        { sourceNodeId: 'input-1', targetNodeId: 'function-1' }
      ]
    });
    
    const generateButton = screen.getByText('生成代码');
    fireEvent.click(generateButton);
    
    expect(screen.getByText(/自动生成的JS代码/)).toBeInTheDocument();
    expect(logger.info).toHaveBeenCalledWith('代码生成成功', expect.any(Object));
  });

  it('shows error message when trying to run without code', () => {
    render(<FlowEditor />);
    const runButton = screen.getByText('运行并绘图');
    fireEvent.click(runButton);
    expect(message.error).toHaveBeenCalledWith('请先生成代码');
    expect(logger.warn).toHaveBeenCalledWith('尝试运行未生成的代码');
  });

  it('validates node connections', () => {
    render(<FlowEditor />);
    const lf = require('@logicflow/core').default.mock.results[0].value;
    
    // 模拟无连接的节点
    lf.getGraphData.mockReturnValue({
      nodes: [
        { id: 'input-1', type: 'inputData', properties: { input: '1,2,3' } }
      ],
      edges: []
    });
    
    const generateButton = screen.getByText('生成代码');
    fireEvent.click(generateButton);
    
    expect(message.error).toHaveBeenCalledWith('请连接节点');
    expect(logger.warn).toHaveBeenCalledWith('节点连接验证失败');
  });

  it('processes data through multiple nodes', () => {
    render(<FlowEditor />);
    const lf = require('@logicflow/core').default.mock.results[0].value;
    
    // 模拟多节点连接
    lf.getGraphData.mockReturnValue({
      nodes: [
        { id: 'input-1', type: 'inputData', properties: { input: '1,2,3' } },
        { id: 'function-1', type: 'sinFunction' },
        { id: 'transform-1', type: 'transform', properties: { transformType: 'cos', scale: 2 } }
      ],
      edges: [
        { sourceNodeId: 'input-1', targetNodeId: 'function-1' },
        { sourceNodeId: 'function-1', targetNodeId: 'transform-1' }
      ]
    });
    
    const generateButton = screen.getByText('生成代码');
    fireEvent.click(generateButton);
    
    const codeElement = screen.getByText(/自动生成的JS代码/);
    expect(codeElement).toBeInTheDocument();
    expect(codeElement.textContent).toContain('processNode');
    expect(logger.info).toHaveBeenCalledWith('代码生成成功', expect.any(Object));
  });

  it('handles chart rendering', () => {
    render(<FlowEditor />);
    const lf = require('@logicflow/core').default.mock.results[0].value;
    const echarts = require('echarts');
    
    // 模拟有效的代码生成和运行
    lf.getGraphData.mockReturnValue({
      nodes: [
        { id: 'input-1', type: 'inputData', properties: { input: '1,2,3' } }
      ],
      edges: [
        { sourceNodeId: 'input-1', targetNodeId: 'function-1' }
      ]
    });
    
    const generateButton = screen.getByText('生成代码');
    fireEvent.click(generateButton);
    
    const runButton = screen.getByText('运行并绘图');
    fireEvent.click(runButton);
    
    expect(echarts.init).toHaveBeenCalled();
    expect(logger.info).toHaveBeenCalledWith('代码运行成功', expect.any(Object));
  });
}); 