import React from 'react';
import { Modal, Typography, Space, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

interface HelpModalProps {
  visible: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      title="使用帮助"
      open={visible}
      onCancel={onClose}
      width={800}
      footer={null}
    >
      <Typography>
        <Title level={4}>快速入门</Title>
        <Paragraph>
          本平台是一个基于 LogicFlow 的低代码平台，支持可视化流程编排和代码生成。
          通过简单的拖拽和配置，您可以快速构建数据处理流程。
        </Paragraph>

        <Title level={4}>节点说明</Title>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text strong>数据输入节点</Text>
            <Paragraph>
              - 用于输入初始数据
              - 支持逗号分隔的数字序列
              - 例如：1,2,3,4,5,6
            </Paragraph>
          </div>

          <div>
            <Text strong>函数处理节点</Text>
            <Paragraph>
              - 提供基础的数学函数处理
              - 支持 sin、cos、tan 等函数
            </Paragraph>
          </div>

          <div>
            <Text strong>数据转换节点</Text>
            <Paragraph>
              - 支持多种数据转换操作
              - 包括：cos、tan、exp、log 等
              - 可设置缩放比例
            </Paragraph>
          </div>

          <div>
            <Text strong>数据过滤节点</Text>
            <Paragraph>
              - 根据条件过滤数据
              - 支持：大于、小于、等于等条件
              - 可设置阈值
            </Paragraph>
          </div>

          <div>
            <Text strong>数据统计节点</Text>
            <Paragraph>
              - 提供基础统计功能
              - 支持：平均值、求和、最大值、最小值
            </Paragraph>
          </div>

          <div>
            <Text strong>曲线输出节点</Text>
            <Paragraph>
              - 使用 ECharts 绘制数据可视化图表
              - 支持多种图表类型
            </Paragraph>
          </div>
        </Space>

        <Divider />

        <Title level={4}>操作步骤</Title>
        <Paragraph>
          1. 点击工具栏中的按钮添加节点
          <br />
          2. 拖拽节点进行连接
          <br />
          3. 点击节点配置参数
          <br />
          4. 点击"生成代码"按钮生成代码
          <br />
          5. 点击"运行并绘图"按钮查看结果
        </Paragraph>

        <Title level={4}>注意事项</Title>
        <Paragraph>
          - 确保数据输入格式正确
          <br />
          - 节点之间必须正确连接
          <br />
          - 参数配置要符合节点要求
          <br />
          - 建议定期保存您的流程图
        </Paragraph>
      </Typography>
    </Modal>
  );
};

export default HelpModal; 