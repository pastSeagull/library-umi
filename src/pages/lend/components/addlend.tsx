import React, { useRef, useState } from 'react';
import { Button, message, Space } from 'antd';
import type { FormInstance } from 'antd';
import { ModalForm, ProFormText, ProFormDateTimeRangePicker } from '@ant-design/pro-form';
import { borrowAdd } from '@/services/api';
import currentUser from '../../../currentUser';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

// 新建借阅弹出窗口
const Addlend = () => {
  const formRef = useRef<FormInstance>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <Space>
      <ModalForm
        width="400px"
        title="添加"
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
          console.log(values);
          // borrowAdd(values)
          borrowAdd(values);
          message.success('提交成功');
          return true;
        }}
      >
        <ProFormText
          width="300px"
          name="user_certificate"
          label="读者编号"
          tooltip="最长为 24 位"
          placeholder="请输入读者编号"
          required={true}
        />
        <ProFormText
          required={true}
          width="300px"
          name="book_isbn"
          label="图书编号"
          placeholder="请输入图书编号"
        />
        <ProFormDateTimeRangePicker required={true} name="dateTimeRange" label="借阅时间选择" />
      </ModalForm>
    </Space>
  );
};

export default Addlend;
