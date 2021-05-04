export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },
  {
    path: '/Lend',
    name: '借阅管理',
    component: './lend',
  },
  {
    path: '/return',
    name: '归还管理',
    component: './return',
  },
  {
    path: '/Book',
    name: '图书管理',
    component: './book',
  },
  {
    path: '/userControl',
    name: '用户管理',
    component: './userControl',
  },
  {
    path: '/adminControl',
    name: '管理员',
    component: './adminControl',
  },
  {
    path: '/classify',
    name: '分类管理',
    component: './classify',
  },
  {
    path: '/account/center',
    // name: 'center',
    component: './center',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    // admin权限
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    path: '/',
    redirect: './lend',
  },
  {
    component: './404',
  },
];
