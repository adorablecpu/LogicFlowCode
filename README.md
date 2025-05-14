# LogicFlowCode
基于LogicFlow的低代码平台开发

一、技术栈
前端框架：
React：用于构建用户界面和组件化开发。
TypeScript：为项目提供类型安全和更好的开发体验。
Vite：新一代前端构建工具，开发体验快，支持热更新。
流程图引擎：
LogicFlow：阿里开源的低代码流程图引擎，用于可视化节点、连线、流程编辑。
数据可视化：
ECharts：百度开源的可视化库，用于绘制曲线图等数据展示。
代码质量：
ESLint：代码规范和质量检查。
包管理：
pnpm：高效的包管理工具，类似 npm/yarn，但更快更省空间。

二、架构方式
前端单页应用（SPA），基于 React 组件化开发。
低代码可视化流程编辑，通过 LogicFlow 实现节点拖拽、连线、属性编辑。
数据驱动，节点属性变化驱动流程和数据流转。
前端本地运行，所有逻辑和可视化均在浏览器端完成，无需后端。

项目是前端单页应用（SPA），主要采用了组件化和职责分离的思想：
组件层：如 FlowEditor.tsx，负责页面和交互逻辑。
节点模型层：如 InputDataModel、SinFunctionModel，负责节点的数据和属性管理。
节点视图层：如 InputDataView，负责节点的渲染和样式。
工具/服务层：如 ECharts 负责数据可视化，LogicFlow 负责流程图引擎。
这种结构其实是前端领域常见的“分层+组件化”混合模式，有利于代码维护和扩展，但不属于严格意义上的后端分层架构。

三、项目结构层次
logicflow-lowcode/
├── node_modules/           # 依赖包
├── public/                 # 静态资源
├── src/                    # 源码目录
│   ├── components/
│   │   └── FlowEditor.tsx  # 主流程编辑器组件，核心逻辑
│   ├── assets/             # 静态资源（如图片、样式等）
│   ├── App.tsx             # 应用入口
│   ├── main.tsx            # React 入口
│   ├── index.css           # 全局样式
│   └── ...                 # 其他配置
├── package.json            # 项目依赖和脚本
├── pnpm-lock.yaml          # pnpm锁定文件
├── tsconfig.json           # TypeScript 配置
├── vite.config.ts          # Vite 配置
└── .gitignore              # Git 忽略文件


四、主要功能与实现方法

1. 流程图编辑与节点自定义

核心文件：`src/components/FlowEditor.tsx`
实现方式：
使用 LogicFlow 注册自定义节点（如"数据输入"、"sin函数"、"曲线输出"）。
每个节点有 Model（数据/属性）和 View（渲染形态）两部分。
支持节点点击弹窗输入参数，属性变化自动驱动节点宽度自适应。

2. 节点宽度自适应

实现方法：
在 `InputDataModel` 的 `setAttributes` 方法中，根据输入内容动态计算并设置节点宽度。
保证输入内容不会溢出节点外部，体验更友好。

3. 代码自动生成与运行

实现方式：
用户在流程图中配置好节点和数据后，点击"生成代码"按钮。
自动生成一段 JS 代码（如：将输入字符串转为数组，计算 sin 值）。
通过 `eval` 或 Function 执行生成的代码，得到输出结果。

4. 数据可视化（曲线绘制）

实现方式：
使用 ECharts 在前端绘制曲线图。
将 sin 计算结果作为数据源，渲染标准正弦曲线。

5. 低代码体验

实现方式：
用户通过拖拽、点击、输入等可视化操作完成数据流配置，无需手写代码。
所有流程和数据流转都通过节点属性和连线自动驱动。

五、各部分实现细节举例

1. 自定义节点注册
```js
lf.register({
  type: 'inputData',
  view: InputDataView,
  model: InputDataModel,
});
```

2. 节点宽度自适应
```js
setAttributes() {
  const input = this.properties.input ? `输入:${this.properties.input}` : '数据输入';
  const minWidth = 80;
  const padding = 32;
  this.width = Math.max(minWidth, input.length * 12 + padding);
}
```

3. 代码生成与运行
```js
const input = "${input}".split(',').map(Number);
const output = input.map(x => Math.sin(x));
```

4. ECharts 绘图
```js
const chart = echarts.init(chartRef.current);
chart.setOption({
  xAxis: { type: 'category', data: input },
  yAxis: { type: 'value' },
  series: [{ data: output, type: 'line' }]
});
```

六、总结

本项目是一个基于 React + LogicFlow + ECharts 的前端低代码可视化平台，支持流程图编辑、数据输入、自动代码生成与运行、结果可视化等功能。
架构清晰，前后端分离，易于扩展和维护。
适合教学、实验、可视化数据流等场景。


