const menuList = function () {
  return [
    {
      path: '/verbalTrickManagement',
      name: 'verbalTrickManagement',
      permId: 1,
      show: false,
      title: '话术管理'
    },
    {
      path: '/taskResource',
      name: 'taskResource',
      permId: 2,
      show: false,
      title: '任务资源',
      children:[
        {
          path: '/mediaResource',
          name: 'mediaResource',
          permId: 3,
          show: false,
          title: '媒体资源',
        },
        {
          path: '/questionnaireResource',
          name: 'questionnaireResource',
          permId: 4,
          show: false,
          title: '问卷资源',
        },
        {
          path: '/formResource',
          name: 'formResource',
          permId: 5,
          show: false,
          title: '表单资源',
        }
      ]
    },
    {
      path: '/userManagement',
      name: 'userManagement',
      permId: 6,
      show: false,
      title: '用户管理'
    },
    {
      path: '/dataStatistics',
      name: 'dataStatistics',
      permId: 7,
      show: false,
      title: '数据统计'
    },
    
  ]
};

export default menuList;
