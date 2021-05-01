import { useRef, useState } from 'react';
import {  message, Space } from 'antd';
import type { FormInstance } from 'antd';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { userUpdate } from '@/services/api'
import { useIntl } from 'umi';


const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

// 新建借阅弹出窗口
const Editbook = (props: any) => {
  const formRef = useRef<FormInstance>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const intl = useIntl();

  return (
    <Space>
    <ModalForm
      width="400px"
      title="编辑图书"
      formRef={formRef}
      visible={modalVisible}
      trigger={
        <a
        onClick={() => {
          setModalVisible(true);
        }} target="_blank" rel="noopener noreferrer" key="view">
        编辑
      </a>
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
      initialValues={{
        user_certificate: props.value.user_certificate,
        user_name: props.value.user_name,
        password: props.value.password,
        user_sex: props.value.user_sex,
        lend: props.value.lend,
        borrowed: props.value.borrowed,
        is_loss: props.value.is_loss,
        unpaid: props.value.unpaid,
      }}
      onFinish={async (values: any) => {
        await waitTime(2000);
        // borrowAdd(values)
        userUpdate(values)
        message.success('提交成功');
        return true;
      }}
      >
      <ProFormText disabled={true} width="300px" name="user_certificate" label="读者号" />
      <ProFormText width="300px" name="user_name" label="用户名" />
      <ProFormText width="300px" name="password" label="密码" />
      <ProFormText width="300px" name="user_sex" label="性别" />
      <ProFormText width="300px" name="lend" label="可借阅数量" />
      <ProFormText width="300px" name="borrowed" label="已借阅数量" />
      <ProFormText width="300px" name="is_loss" label="是否挂失" />
      <ProFormText width="300px" name="unpaid" label="欠款罚金" />
    </ModalForm>
  </Space>
  );
};

export default Editbook
