import { useRef, useEffect, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import type { FormInstance } from 'antd';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormDateTimeRangePicker } from '@ant-design/pro-form';
import { returnAll } from '@/services/api';

type re = {
  retrun_id: number;
  return_date: any;
  sreturn_date: any;
  reality_date: any;
  unpaid: string;
  book_isbn: string;
  user_id: number;
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

  const columns: ProColumns<re>[] = [
    {
      dataIndex: 'return_id',
      width: 48,
      search: false,
    },
    {
      title: '读者编号',
      dataIndex: 'user_id',
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
      dataIndex: 'return_date',
      valueType: 'date',
      hideInSearch: true,
      search: false,
    },
    {
      title: '理应归还时间',
      key: 'showTime',
      dataIndex: 'sreturn_date',
      valueType: 'date',
      hideInSearch: true,
      search: false,
    },
    {
      title: '实际时间',
      key: 'showTime',
      dataIndex: 'reality_date',
      valueType: 'date',
      hideInSearch: true,
      search: false,
    },
    {
      title: '罚金',
      dataIndex: 'unpaid',
      copyable: true,
      ellipsis: true,
      search: false,
    },
  ];

  return (
    <div>
      <ProTable<re>
        columns={columns}
        actionRef={actionRef}
        options={false}
        request={returnAll}
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
        headerTitle="借阅查看"
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
        <ProFormText name="user_certificate" label="读者编号" />
        <ProFormText name="book_isbn" label="图书编号" />
        <ProFormDateTimeRangePicker required={true} name="dateTimeRange" label="借阅时间选择" />
      </ModalForm>
    </div>
  );
};

export default Lend;
