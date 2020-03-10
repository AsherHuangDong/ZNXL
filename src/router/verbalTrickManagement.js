export const verbalTrickManagement = {
    path: '/verbalTrickManagement',
    name: 'verbalTrickManagement',
    title: '话术管理',
    component: () => import("../components/page/verbalTrickManagement/verbalTrickManagement"),
    meta:{title:'话术管理'},
    children:[
        {
            path: '/addnode',
            name: 'addnode',
            title: '话术管理',
            component: () => import("../components/page/verbalTrickManagement/addNode"),
        },
        {
            path: '/editnode',
            name: 'editnode',
            title: '话术管理',
            component: () => import("../components/page/verbalTrickManagement/editNode"),
        }
    ]
}