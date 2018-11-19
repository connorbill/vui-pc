let topicsRouter = [
    {
        path: '/topics',
        component: () => import('../views/topics/TopicIndex'),
        children: [
            {
                path: '',
                name: 'topics',
                component: () => import('../views/topics/TopicList'),
                meta: {
                    // navTop: true,
                    navTopTitle: '话题',
                    navBottom: true,
                    navBottomActive: 1,
                    keepAlive: true,
                    isUseCache: false
                }
            },
            {
                path: 'item/:topicId',
                name: 'TopicItem',
                component: () => import('../views/topics/TopicItem'),
                meta: {
                    // navTop: true,
                    navTopTitle: '话题',
                    navBottom: false,
                    navBottomActive: 1,
                    keepAlive: true,
                    isUseCache: false
                }
            }
        ]
    }
];
export default topicsRouter;
