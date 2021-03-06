import React, { useRef, useState } from 'react';
import { Button, message, Space } from 'antd';
import type { FormInstance } from 'antd';
import { ModalForm, ProFormText, ProFormDateTimeRangePicker } from '@ant-design/pro-form';
import { addUser } from '@/services/api'


const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

// 新建借阅弹出窗口
const Addbook = () => {
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
        await waitTime(2000);
        addUser(values)
        message.success('提交成功');
        return true;
      }}
    >
      <ProFormText required={true} width="300px" name="user_name" label="用户名"  />
      <ProFormText required={true} width="300px" name="password" label="密码"  />
      <ProFormText required={true} width="300px" name="user_sex" label="性别"  />
      <ProFormText required={true} width="300px" name="lend" label="可借阅数量"  />
    </ModalForm>
  </Space>
  );
};

export default Addbook
