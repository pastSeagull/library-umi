import type { ProColumns } from '@ant-design/pro-table';
// import { borrowDel } from '@/services/api'

/* type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
}; */

type borrow = {
  url: string;
  borrow_id: number;
  user_certificate: number;
  book_isbn: string;
  lend_date: string;
  return_date: string;
};

// 借阅管理列表内容
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
        key="editable"
        onClick={() => {
          action.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a onClick={() => {}} href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        归还
      </a>,
    ],
  },
];

export default columns;
