import type { ProColumns } from '@ant-design/pro-table';
import { message } from 'antd';
import { tagcolDel } from '@/services/api';
import Editclassify from './editclassify';

type tag = {
  url: string;
  tag_id: number;
  class_id: number;
};
// 借阅管理列表内容
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
    tip: '标题过长会自动收缩',
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, action) => [
      <Editclassify value={record} />,
      <a
        onClick={() => {
          tagcolDel(record.tag_id)
            .then(() => {
              message.success('删除成功！');
              action.current.reload();
            })
            .catch(() => {
              message.success('删除失败');
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

export default columns;

{
  /* <Editclassify value={record} />, */
}
