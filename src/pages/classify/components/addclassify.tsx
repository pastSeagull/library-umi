import React, { useRef, useState } from 'react';
import { Button, message, Space } from 'antd';
import type { FormInstance } from 'antd';
import { ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { tagcolAdd } from '@/services/api';

// 新建借阅弹出窗口
const Addclassify = () => {
  const formRef = useRef<FormInstance>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <Space>
      <ModalForm
        width="400px"
        title="新建表单"
        formRef={formRef}
        visible={modalVisible}
        trigger={
          <Button
            type="primary"
            onClick={() => {
              setModalVisible(true);
            }}
          >
            新建
          </Button>
        }
        onVisibleChange={setModalVisible}
        submitter={{
          searchConfig: {
            resetText: '重置',
          },
          resetButtonProps: {
            onClick: () => {
              formRef.current?.resetFields();
              //   setModalVisible(false);
            },
          },
        }}
        onFinish={async (values: any) => {
          // await verification(values);
          tagcolAdd(values)
            .then(() => {
              message.success('添加成功');
            })
            .catch(() => {
              message.error('添加失败！清刷新后重试！');
            });
          return true;
        }}
      >
        <ProFormText required={true} width="300px" name="tag_name" label="分类名" />
        <ProFormSelect
          name="class_id"
          label="所属分类"
          valueEnum={{
            1: '文学',
            2: '流行',
            3: '文化',
            4: '生活',
            5: '经管',
            6: '科技',
          }}
          placeholder="Please select a classify"
          rules={[{ required: true, message: 'Please select your country!' }]}
        />
      </ModalForm>
    </Space>
  );
};

export default Addclassify;
