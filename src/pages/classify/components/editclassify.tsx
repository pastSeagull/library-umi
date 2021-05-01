import { useRef, useState, useEffect } from 'react';
import { message, Space } from 'antd';
import type { FormInstance } from 'antd';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { tagcolupdata } from '@/services/api';
import { useIntl } from 'umi';

// 新建借阅弹出窗口
const Editclassify = (props: any) => {
  const formRef = useRef<FormInstance>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const intl = useIntl();

  useEffect(() => {
    formRef.current?.resetFields();
  });

  const text = () => {
    alert(123);
  };

  return (
    <Space>
      <ModalForm
        onSubmit={text}
        width="400px"
        title="编辑分类"
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
          tag_id: props.value.tag_id,
          tag_name: props.value.tag_name,
        }}
        onFinish={async (values: any) => {
          // await waitTime(2000);
          // borrowAdd(values)
          tagcolupdata(values)
            .then(() => {
              message.success('修改成功');
              formRef.current?.resetFields();
            })
            .catch(() => {
              message.error('修改失败');
            });

          return true;
        }}
      >
        <ProFormText disabled={true} width="300px" name="tag_id" label="编号" />
        <ProFormText width="300px" name="tag_name" label="分类名" />
      </ModalForm>
    </Space>
  );
};

export default Editclassify;
