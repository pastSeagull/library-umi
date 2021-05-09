import { useEffect, useRef, useState } from 'react';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage } from 'umi';
import { ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-table';
import type { FormInstance } from 'antd';
import { message, Button } from 'antd';
import { tagcolDel, tagcolAdd, tagcolupdata, tagcolAll } from '@/services/api';

type tag = {
  url: string;
  tag_id: number;
  class_id: number;
};

// add
const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await tagcolAdd({ ...fields });
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
    await tagcolupdata({ ...fields });
    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败请重试！');
    return false;
  }
};

const Classify = () => {
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

  // 分离后删除添加无法刷新（暂时找不到好的方法）
  const columns: ProColumns<tag>[] = [
    {
      dataIndex: 'tag_id',
      // valueType: 'indexBorder',
      width: 48,
      search: false,
    },
    {
      title: '分类名',
      dataIndex: 'tag_name',
      copyable: true,
      ellipsis: true,
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
            tagcolDel(record.tag_id)
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
      <ProTable<tag>
        options={false}
        columns={columns}
        actionRef={actionRef}
        request={tagcolAll}
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
        headerTitle="分类管理"
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
        title="添加分类"
        width="400px"
        formRef={addRef}
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
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
          name="tag_name"
          label="分类名"
        />
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
          rules={[{ required: true, message: '必填项' }]}
        />
      </ModalForm>
      {/* 编辑窗口 */}
      <ModalForm
        title="编辑分类"
        width="400px"
        initialValues={{
          tag_id: list.current.tag_id,
          tag_name: list.current.tag_name,
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
        <ProFormText
          rules={[{ required: true, message: '必填项' }]}
          disabled={true}
          name="tag_id"
        />
        <ProFormText
          rules={[{ required: true, message: '必填项' }]}
          name="tag_name"
          label="分类名"
        />
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
          rules={[{ required: true, message: '必填项' }]}
        />
      </ModalForm>
    </div>
  );
};

export default Classify;
