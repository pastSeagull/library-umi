import { request } from 'umi';

// 登录
export async function login(body: any, options?: Record<string, any>) {
  return request<API.LoginResult>('/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
// admin
export async function adminLogin(body: any, options?: Record<string, any>) {
  return request<API.LoginResult>('/api/v1/adminLogin', {
    method: 'POST',
    // 拦截器不生效
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: body,
    ...(options || {}),
  });
}

/* export async function outLogin(options?: Record<string, any>) {
  access = '';
  return request<Record<string, any>>('/api/v1/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}
 */
// 获取用户信息
export async function currentUser(options?: Record<string, any>) {
  return request<API.CurrentUser>('/api/v1/currentUser', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    ...(options || {}),
  });
  /* if(getAccess()){
    const result = {
      status: 401,
      data: {
        isLogin: false,
      },
      errorCode: '401',
      errorMessage: '请先登录！',
      success: true,
    }
    return result
  }
  return res */
}

// 查询借阅信息
export async function borrowAll(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
    // 查询读者编号
    user_certificate?: any;
    // 查询图书编号
    book_isbn?: number;
  },
  options?: Record<string, any>,
) {
  return request<API.RuleList>('/api/v1/borrow', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
// 添加借阅
export async function borrowAdd(params: any, options?: Record<string, any>) {
  return request<API.RuleList>('/api/v1/borrowAdd', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: params,
    ...(options || {}),
  });
}

export async function borrowUpdate(params: any, options?: Record<string, any>) {
  return request<API.RuleList>('/api/v1/borrowUpdate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: params,
    ...(options || {}),
  });
}
export async function borrowRenew(borrow_id: any, options?: Record<string, any>) {
  return request<API.RuleList>('/api/v1/borrowRenew', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    params: {
      borrow_id,
    },
    ...(options || {}),
  });
}

// 图书信息
export async function book(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
    // 查询图书名字
    book_name?: string;
  },
  options?: Record<string, any>,
) {
  return request<API.RuleList>('/api/v1/findAll', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
// 添加图书
export async function addBook(params: any, options?: Record<string, any>) {
  return request<API.RuleList>('/api/v1/addBook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: params,
    ...(options || {}),
  });
}

// 删除图书
export async function deleteBook(params: any, options?: Record<string, any>) {
  return request<API.RuleList>('/api/v1/deleteBook', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    params: {
      // 单个参数
      id: params,
    },
    ...(options || {}),
  });
}

// 修改
export async function updateBook(params: any, options?: Record<string, any>) {
  return request<API.RuleList>('/api/v1/updateBook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: params,
    ...(options || {}),
  });
}

// User
export async function UserAll(
  params: {
    // query
    // 用户名
    user_name?: string;
  },
  options?: Record<string, any>,
) {
  return request<API.RuleList>('/api/v1/userAll', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function addUser(params: any, options?: Record<string, any>) {
  return request<API.RuleList>('/api/v1/useradd', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: params,
    ...(options || {}),
  });
}

export async function userDel(params: any, options?: Record<string, any>) {
  return request<API.RuleList>('/api/v1/userDel', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    params: {
      // 单个参数
      id: params,
    },
    ...(options || {}),
  });
}

export async function userUpdate(params: any, options?: Record<string, any>) {
  return request<API.RuleList>('/api/v1/userUpdate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: params,
    ...(options || {}),
  });
}

// classify
export async function tagcolAll(
  params: {
    // query
    // 分类名
    tag_name?: string;
  },
  options?: Record<string, any>,
) {
  return request<API.RuleList>('/api/v1/tagcolAll', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function tagcolAdd(params: any, options?: Record<string, any>) {
  return request<API.RuleList>('/api/v1/tagcolAdd', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: params,
    ...(options || {}),
  });
}

export async function tagcolupdata(params: any, options?: Record<string, any>) {
  return request<API.RuleList>('/api/v1/tagcolupdata', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: params,
    ...(options || {}),
  });
}

export async function tagcolDel(params: any, options?: Record<string, any>) {
  return request<API.RuleList>('/api/v1/tagcolDel', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    params: {
      // 单个参数
      id: params,
    },
    ...(options || {}),
  });
}

// admin
export async function adminAll(
  params: {
    // query
    // name
    admin_name?: string;
  },
  options?: Record<string, any>,
) {
  return request<API.RuleList>('/api/v1/adminAll', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function adminAdd(params: any, options?: Record<string, any>) {
  return request<API.RuleList>('/api/v1/adminAdd', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: params,
    ...(options || {}),
  });
}
export async function adminUpdate(params: any, options?: Record<string, any>) {
  return request<API.RuleList>('/api/v1/adminUpdate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: params,
    ...(options || {}),
  });
}

export async function adminDel(params: any, options?: Record<string, any>) {
  return request<API.RuleList>('/api/v1/adminDel', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    params: {
      // 单个参数
      id: params,
    },
    ...(options || {}),
  });
}

// return
export async function returnAdd(params: any, actual: any, options?: Record<string, any>) {
  const data = {
    params,
    actual,
  };
  return request<API.RuleList>('/api/v1/returnAdd', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data,
    ...(options || {}),
  });
}
export async function borrowDel(params: any, options?: Record<string, any>) {
  return request<API.RuleList>('/api/v1/borrowDel', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    params: {
      // 单个参数
      id: params,
    },
    ...(options || {}),
  });
}

export async function returnAll(
  params: {
    // query
    // 分类名
    tag_name?: string;
  },
  options?: Record<string, any>,
) {
  return request<API.RuleList>('/api/v1/returnAll', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
