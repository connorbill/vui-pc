import Index from '../views/home/HomeIndex';
let homeRouter = [
    {
        path: '/',
        name: 'index',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Index,
        children: [
            {
                path: '',
                name: 'HomeHot',
                component: () => import('../views/home/HomeHot'),
                meta: {
                    // navTop: true,
                    navTopTitle: '钱香社区',
                    navBottom: true,
                    navBottomActive: 0,
                    keepAlive: true,
                    isUseCache: false
                }
            },
            {
                path: 'dynamic',
                name: 'dynamic',
                component: () => import('../views/home/DynamicList'),
                meta: {
                    // navTop: true,
                    navTopTitle: '钱香动态',
                    navBottom: true,
                    navBottomActive: 0,
                    keepAlive: true,
                    isUseCache: false
                }
            }
        ]
    },
    {
        path: '/dyitem/:id',
        name: 'DyItem',
        component: () => import('../views/home/DynamicItem'),
        meta: {
            // navTop: true,
            navTopTitle: '钱香动态',
            navBottom: false,
            keepAlive: true,
            isUseCache: false
        }
    },
    {
        path: '/detail/:id',
        name: 'detail',
        component: () => import('../views/home/TopicDetail'),
        meta: {
            // navTop: true,
            navTopTitle: '内容详情',
            navBottom: false
        }
    },
    {
        path: '/compose',
        name: 'compose',
        component: () => import('../views/home/ComposeTopic'),
        meta: {
            requiresAuth: true,
            // navTop: true,
            navTopTitle: '发帖',
            navBottom: false
        }
    },
    {
        path: '/comment',
        name: 'ComposeComment',
        component: () => import('../views/home/ComposeComment'),
        meta: {
            requiresAuth: true,
            // navTop: true,
            navTopTitle: '评论帖子',
            navBottom: false
        }
    },
    {
        path: '/reply',
        name: 'ComposeReply',
        component: () => import('../views/home/ComposeReply'),
        meta: {
            requiresAuth: true,
            // navTop: true,
            navTopTitle: '回复评论',
            navBottom: false
        }
    }
];
export default homeRouter;
