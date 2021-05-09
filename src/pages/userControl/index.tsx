import { useRef, useEffect, useState } from 'react';
import { Button, message } from 'antd';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'umi';
import type { FormInstance } from 'antd';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { UserAll, addUser, userUpdate, userDel } from '@/services/api';

type users = {
  user_certificate: number;
  user_name: string;
  password: string;
  user_sex: string;
  lend: number;
  is_loss: number;
  borrowed: number;
  unpaid: any;
};

// update
const handleUpdate = async (fields: any) => {
  const hide = message.loading('正在修改');
  try {
    await userUpdate({ ...fields });
    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败请重试！');
    return false;
  }
};

// add
const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addUser({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

const userControl = () => {
  const actionRef = useRef<ActionType>();
  const addRef = useRef<FormInstance>();
  const editRef = useRef<FormInstance>();

  const list = useRef<any>({ current: {} });

  useEffect(() => {
    // 先重置一次编辑的initialValues，不然数据不同步
    editRef.current?.resetFields();
  });

  // add
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  // update
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const columns: ProColumns<users>[] = [
    {
      dataIndex: 'user_certificate',
      // valueType: 'indexBorder',
      search: false,
      width: 48,
    },
    {
      title: '用户名',
      dataIndex: 'user_name',
      copyable: true,
      ellipsis: true,
    },
    {
      title: '密码',
      dataIndex: 'password',
      copyable: true,
      ellipsis: true,
      search: false,
    },
    {
      title: '性别',
      dataIndex: 'user_sex',
      copyable: true,
      ellipsis: true,
      search: false,
    },
    {
      title: '可借阅数量',
      dataIndex: 'lend',
      copyable: true,
      ellipsis: true,
      search: false,
    },
    {
      title: '已借阅数量',
      dataIndex: 'borrowed',
      copyable: true,
      ellipsis: true,
      search: false,
    },
    {
      title: '是否挂失',
      dataIndex: 'is_loss',
      copyable: true,
      ellipsis: true,
      search: false,
    },
    {
      title: '欠款罚金',
      dataIndex: 'unpaid',
      copyable: true,
      ellipsis: true,
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, action) => [
        <a
          key="config"
          onClick={() => {
            list.current = record;
            editRef.current?.resetFields();
            handleUpdateModalVisible(true);
          }}
        >
          编辑
        </a>,
        <a
          onClick={() => {
            userDel(record.user_certificate)
              .then(() => {
                message.success('删除成功！');
                actionRef.current?.reload();
              })
              .catch(() => {
                message.success('删除失败请重试！');
                actionRef.current?.reload();
              });
            /* action.startEditable?.(record.id); */
          }}
          href={record.url}
          target="_blank"
          rel="noopener noreferrer"
          key="view"
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <div>
      <ProTable<users>
        columns={columns}
        actionRef={actionRef}
        request={UserAll}
        editable={{
          type: 'multiple',
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 5,
        }}
        dateFormatter="string"
        headerTitle="借阅管理"
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
              // 进去之前清空上一次的值
              addRef.current?.resetFields();
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="新建" />
          </Button>,
        ]}
      />
      {/* 添加窗口 */}
      <ModalForm
        width="400px"
        title="添加用户"
        formRef={addRef}
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        submitter={{
          searchConfig: {
            resetText: '重置',
          },
          resetButtonProps: {
            onClick: () => {
              addRef.current?.resetFields();
            },
          },
        }}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.RuleListItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[{ required: true, message: '必填项' }]}
          required={true}
          width="300px"
          name="user_name"
          label="用户名"
        />
        <ProFormText
          rules={[{ required: true, message: '必填项' }]}
          required={true}
          width="300px"
          name="password"
          label="密码"
        />
        <ProFormText
          rules={[{ required: true, message: '必填项' }]}
          required={true}
          width="300px"
          name="user_sex"
          label="性别"
        />
        <ProFormText
          rules={[{ required: true, message: '必填项' }]}
          required={true}
          width="300px"
          name="lend"
          label="可借阅数量"
        />
      </ModalForm>
      {/* 编辑窗口 */}
      <ModalForm
        width="400px"
        title="编辑用户"
        formRef={editRef}
        visible={updateModalVisible}
        onVisibleChange={handleUpdateModalVisible}
        submitter={{
          searchConfig: {
            resetText: '重置',
          },
          resetButtonProps: {
            onClick: () => {
              editRef.current?.resetFields();
            },
          },
        }}
        initialValues={{
          user_certificate: list.current.user_certificate,
          user_name: list.current.user_name,
          password: list.current.password,
          user_sex: list.current.user_sex,
          lend: list.current.lend,
          borrowed: list.current.borrowed,
          is_loss: list.current.is_loss,
          unpaid: list.current.unpaid,
        }}
        onFinish={async (value) => {
          const success = await handleUpdate(value as API.RuleListItem);
          if (success) {
            handleUpdateModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText disabled={true} name="user_certificate" label="读者号" />
        <ProFormText
          rules={[{ required: true, message: '必填项' }]}
          name="user_name"
          label="用户名"
        />
        <ProFormText rules={[{ required: true, message: '必填项' }]} name="password" label="密码" />
        <ProFormText rules={[{ required: true, message: '必填项' }]} name="user_sex" label="性别" />
        <ProFormText
          rules={[{ required: true, message: '必填项' }]}
          name="lend"
          label="可借阅数量"
        />
        <ProFormText
          rules={[{ required: true, message: '必填项' }]}
          name="borrowed"
          label="已借阅数量"
        />
        <ProFormText
          rules={[{ required: true, message: '必填项' }]}
          name="is_loss"
          label="是否挂失"
        />
        <ProFormText
          rules={[{ required: true, message: '必填项' }]}
          name="unpaid"
          label="欠款罚金"
        />
      </ModalForm>
    </div>
  );
};

export default userControl;
