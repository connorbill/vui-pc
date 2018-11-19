import Vue from 'vue';
import Router from 'vue-router';
// import store from '../store/store';
import home from './HomeRouter';
import topic from './TopicRouter';
import my from './MyRouter';
import { commonFunction } from '../common/CommonFunction';

Vue.use(Router);

const routerMap = {
    base: '/community',
    routes: [
        ...home,
        ...my,
        ...topic,
        // {
        //     path: '/nomsg',
        //     name: 'nomsg',
        //     meta: {
        //         navTop: true,
        //         navBottom: true,
        //         navTopTitle: '缺省页示例'
        //     },
        //     component: () => import('../views/home/DefaultPage')
        // },
        {
            path: '*',
            redirect: '/'
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            // alert(savedPosition.y);
            return savedPosition;
        } else {
            if (from.meta.keepAlive) {
                from.meta.savedPosition = document.body.scrollTop;
            }
            return { x: 0, y: to.meta.savedPosition || 0 }
            // return {x: 0, y: 0};
        }
        // return 期望滚动到哪个的位置
    },
    mode: 'history'// history模式才可以返回页面记住位置，需要服务器支持
};

let router = new Router(routerMap);

// 全局前置钩子
router.beforeEach((to, from, next) => {
    // 进入 TopicItem.vue 防止title先变 '话题'， 然后变成对应的title
    if (to.name !== 'TopicItem') {
        commonFunction.setPageTitle(to.meta.navTopTitle);
    }
    if (to.meta.requiresAuth) {
        // if (commonFunction.isApp()) {
        //     commonFunction.isRefreshAppToken();
        // }
        // 如果是 app 那么重新刷新获取token, 防止登录后进入页面不刷新执行 window.getQxToken()
        if (commonFunction.hasLogin()) {
            // 如果有token就转向,不返回登录页
            next();
        } else {
            commonFunction.toLogin(to.path);
            // next();
        }
    } else {
        next();
    }
});

// 全局后置钩子
router.afterEach((to, from) => {
    //
    // if (commonFunction.isWeChat()) {
    //     // let url = commonFunction.currentUrl();
    //     // let share = {
    //     //     // title: to.meta.navTopTitle,
    //     //     // desc: '银行存管，11.2%近3月平均历史年化，是您放心之选。',
    //     //     link: url
    //     // };
    //     commonFunction.wechatShare();
    // }
});

export default router;
