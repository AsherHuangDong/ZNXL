export const taskResource = {
    path: '/taskResource',
    name: 'taskResource',
    title: '任务资源',
    component: () => import("../components/page/taskResource/taskResource"),
    children:[
        {
            path:'/mediaResource',
            name:'mediaResource',
            component:() => import("../components/page/taskResource/mediaResource"),
            meta:{title:'任务资源/媒体资源'}
        },
        {
            path:'/questionnaireResource',
            name:'questionnaireResource',
            meta:{title:'任务资源/问卷资源'},
            component:() => import("../components/page/taskResource/questionnaireResource")
        },
        {
            path:'/questionnaireAdd',
            name:'questionnaireAdd',
            meta:{title:'任务资源/问卷资源/新增问卷'},
            component:() => import("../components/page/taskResource/questionnaireAdd")
        },
        {
            path:'/questionnaireEdit',
            name:'questionnaireEdit',
            meta:{title:'任务资源/问卷资源/编辑问卷'},
            component:() => import("../components/page/taskResource/questionnaireEdit")
        },
        {
            path:'/formResource',
            name:'formResource',
            meta:{title:'任务资源/表单资源'},
            component:() => import("../components/page/taskResource/formResource")
        },
    ]
}