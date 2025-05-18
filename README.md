# LogicFlow 低代码平台

基于 LogicFlow 和 React 的低代码平台，支持可视化流程编排和代码生成。

## 功能特点

- 可视化流程编排
- 支持数据输入、函数处理和曲线输出节点
- 自动生成 JavaScript 代码
- 实时预览运行结果
- 使用 ECharts 绘制数据可视化图表

## 技术栈

- React 19
- TypeScript
- LogicFlow
- Ant Design
- ECharts
- Vite

## 开发环境要求

- Node.js >= 18
- pnpm >= 8

## 快速开始

1. 安装依赖：

```bash
pnpm install
```

2. 启动开发服务器：

```bash
pnpm dev
```

3. 构建生产版本：

```bash
pnpm build
```

## 项目结构

```
logicflow-lowcode/
├── src/
│   ├── components/     # 组件目录
│   ├── assets/        # 静态资源
│   ├── App.tsx        # 应用入口
│   └── main.tsx       # 主入口文件
├── public/            # 公共资源
└── package.json       # 项目配置
```

## 使用说明

1. 点击"添加数据输入节点"按钮添加输入节点
2. 点击"添加sin函数节点"按钮添加函数处理节点
3. 点击"添加曲线输出节点"按钮添加输出节点
4. 点击节点可以配置参数
5. 点击"生成代码"按钮生成对应的 JavaScript 代码
6. 点击"运行并绘图"按钮执行代码并显示结果

## 开发指南

- 使用 `pnpm lint` 运行代码检查
- 使用 `pnpm format` 格式化代码
- 使用 `pnpm test` 运行测试
- 使用 `pnpm coverage` 生成测试覆盖率报告

## 贡献指南

1. Fork 本仓库
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT
