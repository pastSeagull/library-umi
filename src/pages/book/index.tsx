import { useRef, useState, useEffect } from 'react';
import { message, Button } from 'antd';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import type { FormInstance } from 'antd';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import { book, deleteBook, addBook, updateBook } from '@/services/api';

type books = {
  url: string;
  book_id: number;
  book_name: string;
  author: string;
  book_intro: string;
  classify: number;
  ISBN: string;
  paulisher: string;
  state: any;
};

// add
const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addBook({ ...fields });
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
    await updateBook({ ...fields });
    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败请重试！');
    return false;
  }
};

const Book = () => {
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

  const columns: ProColumns<books>[] = [
    {
      dataIndex: 'book_id',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '图书名字',
      dataIndex: 'book_name',
      copyable: true,
      ellipsis: true,
    },
    {
      title: '作者',
      dataIndex: 'author',
      copyable: true,
      ellipsis: true,
      search: false,
    },
    {
      title: '介绍',
      dataIndex: 'author',
      copyable: true,
      ellipsis: true,
      search: false,
    },
    {
      title: '分类',
      dataIndex: 'classify',
      copyable: true,
      ellipsis: true,
      search: false,
    },
    {
      title: 'ISBN',
      dataIndex: 'ISBN',
      copyable: true,
      ellipsis: true,
    },
    {
      title: '出版社',
      dataIndex: 'publisher',
      copyable: true,
      ellipsis: true,
      search: false,
    },
    {
      title: '位置',
      dataIndex: 'location',
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
            deleteBook(record.book_id)
              .then(() => {
                message.success('删除成功！');
                actionRef.current?.reload();
              })
              .catch(() => {
                message.success('删除失败请重试！');
                actionRef.current?.reload();
              });
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
      <ProTable<books>
        columns={columns}
        actionRef={actionRef}
        request={book}
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
        title="添加图书"
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
        <ProFormText required={true} name="book_name" label="图书名字" />
        <ProFormText required={true} name="author" label="作者" />
        <ProFormText required={true} name="book_intro" label="介绍" />
        <ProFormText required={true} name="classify" label="分类" />
        <ProFormText required={true} name="ISBN" label="ISBN" />
        <ProFormText required={true} name="publisher" label="出版社" />
        <ProFormText required={true} name="location" label="放置地点" />
      </ModalForm>

      {/* 编辑窗口 */}
      <ModalForm
        width="400px"
        title="编辑图书"
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
          book_id: list.current.book_id,
          book_name: list.current.book_name,
          author: list.current.author,
          classify: list.current.classify,
          ISBN: list.current.ISBN,
          publisher: list.current.publisher,
          book_intro: list.current.book_intro,
          location: list.current.location,
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
        <ProFormText disabled={true} name="book_id" label="序号" />
        <ProFormText name="book_name" label="图书名字" />
        <ProFormText name="author" label="作者" />
        <ProFormTextArea name="book_intro" label="介绍" />
        <ProFormText name="classify" label="分类" />
        <ProFormText name="ISBN" label="ISBN" />
        <ProFormText name="publisher" label="出版社" />
        <ProFormText name="location" label="位置" />
      </ModalForm>
    </div>
  );
};

export default Book;
