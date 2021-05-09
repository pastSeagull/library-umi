import { useRef, useEffect, useState } from 'react';
import { Button, message } from 'antd';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'umi';
import type { FormInstance } from 'antd';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormDateTimeRangePicker } from '@ant-design/pro-form';
import { useModel } from 'umi';
import {
  borrowAll,
  borrowAdd,
  borrowUpdate,
  borrowRenew,
  returnAdd,
  borrowDel,
} from '@/services/api';

// add
const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await borrowAdd({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
// update
const handleUpdate = async (fields: any) => {
  const hide = message.loading('正在修改');
  try {
    await borrowUpdate({ ...fields });
    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败请重试！');
    return false;
  }
};
// renew
/* const handRenew = async (fields: any) => {
  const hide = message.loading('正在修改');
  try {
    await borrowUpdate({ ...fields });
    hide();
    message.success('续借成功');
    return true;
  } catch (error) {
    hide();
    message.error('续借失败请重试！');
    return false;
  }
}; */

// 暂时未分离出来，和columns重复了
type borrow = {
  url: string;
  borrow_id: number;
  user_certificate: number;
  book_isbn: string;
  lend_date: string;
  return_date: string;
  is_renew: number;
};

const Lend = () => {
  const actionRef = useRef<ActionType>();
  const addRef = useRef<FormInstance>();
  const editRef = useRef<FormInstance>();

  const list = useRef<any>({ current: {} });

  // add
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  // update
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  useEffect(() => {
    // 先重置一次编辑的initialValues，不然数据不同步
    editRef.current?.resetFields();
  });
  const { initialState, setInitialState } = useModel('@@initialState');

  const columns: ProColumns<borrow>[] = [
    {
      dataIndex: 'borrow_id',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '读者编号',
      dataIndex: 'user_certificate',
      copyable: true,
      ellipsis: true,
    },
    {
      title: '图书编号',
      dataIndex: 'book_isbn',
      copyable: true,
      ellipsis: true,
    },
    {
      title: '借阅时间',
      key: 'showTime',
      dataIndex: 'lend_date',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '理应归还时间',
      key: 'showTime',
      dataIndex: 'return_date',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'return_date',
      valueType: 'dateRange',
      hideInTable: true,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
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
          key="config"
          onClick={() => {
            borrowRenew(record.borrow_id)
              .then(() => {
                message.success('续借成功！');
                actionRef.current?.reload();
              })
              .catch(() => {
                message.success('续借失败请重试！');
                actionRef.current?.reload();
              });
          }}
        >
          续借
        </a>,
        <a
          onClick={() => {
            returnAdd(record, new Date())
              .then(() => {
                message.success('归还成功！');
                actionRef.current?.reload();
                borrowDel(record.borrow_id);
              })
              .catch(() => {
                message.success('归还失败！');
                actionRef.current?.reload();
              });
          }}
          href={record.url}
          target="_blank"
          rel="noopener noreferrer"
          key="view"
        >
          归还
        </a>,
      ],
    },
  ];

  return (
    <div>
      <ProTable<borrow>
        columns={columns}
        actionRef={actionRef}
        request={borrowAll}
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
        title="添加"
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
          console.log(value);
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
          width="300px"
          name="user_certificate"
          label="读者编号"
          tooltip="最长为 24 位"
          placeholder="请输入读者编号"
          required={true}
        />
        <ProFormText
          rules={[{ required: true, message: '必填项' }]}
          required={true}
          width="300px"
          name="book_isbn"
          label="图书编号"
          placeholder="请输入图书编号"
        />
        <ProFormDateTimeRangePicker
          rules={[{ required: true, message: '必填项' }]}
          required={true}
          name="dateTimeRange"
          label="借阅时间选择"
        />
      </ModalForm>

      {/* 编辑窗口 */}
      <ModalForm
        title="编辑分类"
        width="400px"
        initialValues={{
          user_certificate: list.current.user_certificate,
          book_isbn: list.current.book_isbn,
          dateTimeRange: [list.current.lend_date, list.current.return_date],
          borrow_id: list.current.borrow_id,
        }}
        formRef={editRef}
        visible={updateModalVisible}
        onVisibleChange={handleUpdateModalVisible}
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
        <ProFormText disabled={true} name="borrow_id" label="id" />
        <ProFormText
          rules={[{ required: true, message: '必填项' }]}
          name="user_certificate"
          label="读者编号"
        />
        <ProFormText
          rules={[{ required: true, message: '必填项' }]}
          name="book_isbn"
          label="图书编号"
        />
        <ProFormDateTimeRangePicker
          rules={[{ required: true, message: '必填项' }]}
          required={true}
          name="dateTimeRange"
          label="借阅时间选择"
        />
      </ModalForm>
    </div>
  );
};

export default Lend;
