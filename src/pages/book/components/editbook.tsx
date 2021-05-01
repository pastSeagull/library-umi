import { useEffect, useRef, useState } from 'react';
import { message, Space } from 'antd';
import type { FormInstance } from 'antd';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { updateBook } from '@/services/api';
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

  // 下一页初始值initialValues问题，不过退出会再次触发
  useEffect(() => {
    formRef.current?.resetFields();
  });

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
            }}
            target="_blank"
            rel="noopener noreferrer"
            key="view"
          >
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
          book_id: props.value.book_id,
          book_name: props.value.book_name,
          author: props.value.author,
          classify: props.value.classify,
          ISBN: props.value.ISBN,
          publisher: props.value.publisher,
          book_intro: props.value.book_intro,
        }}
        onFinish={async (values: any) => {
          await waitTime(2000);
          // borrowAdd(values)
          updateBook(values);
          message.success('提交成功');
          return true;
        }}
      >
        <ProFormText disabled={true} width="300px" name="book_id" label="序号" />
        <ProFormText width="300px" name="book_name" label="图书名字" />
        <ProFormText width="300px" name="author" label="作者" />
        <ProFormTextArea width="300px" name="book_intro" label="介绍" />
        <ProFormText width="300px" name="classify" label="分类" />
        <ProFormText width="300px" name="ISBN" label="ISBN" />
        <ProFormText width="300px" name="publisher" label="出版社" />
      </ModalForm>
    </Space>
  );
};

export default Editbook;
