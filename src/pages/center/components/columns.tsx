import type { ProColumns } from '@ant-design/pro-table';
import { deleteBook } from '@/services/api'

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
}
// 借阅管理列表内容
const columns: ProColumns<books>[] = [
  {
    dataIndex: 'book_id',
    valueType: 'indexBorder',
    width: 48,
    search: false,
  },
  {
    title: '图书名字',
    dataIndex: 'book_name',
    copyable: true,
    ellipsis: true,
    search: false,
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
    search: false,
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
    title: '操作',
    valueType: 'option',
    render: (text, record, action) => [
      <a
      onClick={() => {
        console.log(record.book_id)
        deleteBook(record.book_id)
        /* action.startEditable?.(record.id); */
      }}
      href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        删除
      </a>,
    ],
  },
];

export default columns
