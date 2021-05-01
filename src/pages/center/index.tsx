import ProCard from '@ant-design/pro-card';
import { useRef } from 'react';
import { useModel } from 'umi'
import { Avatar, Tabs  } from 'antd'
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import columns  from './components/columns'
import { book } from '@/services/api'

const { TabPane } = Tabs;

function callback(key: any) {
  console.log(key);
}

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

const Center = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const actionRef = useRef<ActionType>();

  const { currentUser } = initialState;

  return(
    <div>
      <>
        <ProCard style={{ marginTop: 8, background: '#f0f2f5' }} gutter={8} title="个人中心">
          <ProCard
            layout="default"
            colSpan={{
              md: '30%',
            }}
            bordered
          >
                <div><Avatar size="large"  src={currentUser.avatar} alt="avatar" /></div>
                <br />
                <div>用户名：Gaviota</div>
                <br />
                <div>性别：男</div>
                <br />
                <div>可借阅书籍：5</div>
                <br />
                <div>已借阅书籍：2</div>
                <br />
                <div>罚金：0</div>
          </ProCard>
          <ProCard layout="default" bordered>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="正在借阅图书" key="1">
              <div>
                  <ProTable<books>
                  search={false}
                  options={false}
                  columns={columns}
                  actionRef={actionRef}
                  request={book}
                  editable={{
                    type: 'multiple',
                  }}
                  rowKey="id"
                  pagination={{
                    pageSize: 5,
                  }}
                />
              </div>
              </TabPane>
              <TabPane tab="即将归还图书" key="2">
                即将归还图书
              </TabPane>
              <TabPane tab="已借阅图书" key="3">
                全部已借阅图书
              </TabPane>
            </Tabs>
          </ProCard>
        </ProCard>
      </>
    </div>
  )
}

export default Center
