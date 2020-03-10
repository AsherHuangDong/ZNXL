import iView from 'iview';

export const copySuccess = function(){
  return iView.Message.success({
    content: '复制成功',
    duration: 2
  });
};


export const copyError = function(){
  return iView.Message.error({
    content: '复制失败',
    duration: 2
  });
};

export const repeatEmail = function(){
  return iView.Message.error({
    content: '邮箱重复',
    duration: 2
  });
};

export const repeatMobile = function(){
  return iView.Message.error({
    content: '手机号重复',
    duration: 2
  });
};

export const formVerSuccess = function(){
  return iView.Message.success({
    content: '表单验证正确',
    duration: 2
  });
};

export const formVerError = function(){
  return iView.Message.error({
    content: '表单验证错误',
    duration: 2
  });
};

export const addAdminSuccess = function(){
  return iView.Message.success({
    content: '添加成功',
    duration: 2
  });
};

export const saveSuccess = function(){
  return iView.Message.success({
    content: '保存成功',
    duration: 2
  });
};
export const saveError = function(){
  return iView.Message.error({
    content: '保存失败',
    duration: 2
  });
};

export const moveSuccess = function(){
  return iView.Message.success({
    content: '移动成功',
    duration: 2
  });
};

export const editSuccess = function(){
  return iView.Message.success({
    content: '修改成功',
    duration: 2
  });
};

export const pleaseSelectPerm = function(){
  return iView.Message.info({
    content: '所选权限不能为空',
    duration: 2
  });
};

export const freezeFinish = function(){
  return iView.Message.success({
    content: '冻结成功',
    duration: 2
  });
};

export const unFreezeFinish = function(){
  return iView.Message.success({
    content: '解冻成功',
    duration: 2
  });
};

export const loginSuccess = function(){
  return iView.Message.success({
    content: '登录成功',
    duration: 2
  });
};

export const loginFail = function(){
  return iView.Message.error({
    content: '登录失败',
    duration: 2
  });
};
