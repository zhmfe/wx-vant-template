import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

let router = new Router({
    base: process.env.ROUTER_BASE,
    mode: process.env.ROUTER_HISTORY,
    routes: [
        {
            path: "/",
            redirect: "/index"
        },
        {
            path: '/',
            component: resolve => require(['../common/Home.vue'], resolve),
            meta: {title: '自述文件'},
            children: [
                {
                    path: '/index',
                    name: "index",
                    component: resolve => require(['@/page/index/Index.vue'], resolve),
                    meta: {title: '首页'}
                },
                {
                    path: '/personal',
                    name: 'personal',
                    component: resolve => require(['@/page/personal/PersonalCenter.vue'], resolve),
                    meta: {title: '我的'}
                },
            
            ],
        },
    ]
})
router.beforeEach((to, from, next) => {
    next();
});
export default router;
