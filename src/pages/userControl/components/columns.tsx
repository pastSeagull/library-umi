import type { ProColumns } from '@ant-design/pro-table';
import Editbook from './editbook'
import { userDel } from '@/services/api'


type users = {
  user_certificate: number;
  user_name: string;
  password: string;
  user_sex: string;
  lend: number;
  is_loss: number;
  borrowed: number;
  unpaid: any;
}
// 借阅管理列表内容
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
      <Editbook value={record}/>,
      <a
      onClick={() => {
        userDel(record.user_certificate)
        /* action.startEditable?.(record.id); */
      }}
      href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        删除
      </a>,
    ],
  },
];

export default columns
