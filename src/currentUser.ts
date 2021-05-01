const currentUsers = () => {
  const currentUser = JSON.parse(localStorage.getItem('admin') || '');
  if (!currentUser) {
    return {
      data: {
        isLogin: false,
      },
      errorCode: '401',
      errorMessage: '请先登录！',
      success: true,
    };
  }
  return currentUser;
};
export default currentUsers;
