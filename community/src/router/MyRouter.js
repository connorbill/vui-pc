let myRouter = [
    {
        path: '/my',
        name: 'my',
        meta: {
            requiresAuth: true,
            // navTop: true,
            navBottom: true,
            navTopTitle: '我的主页',
            navBottomActive: 2
        },
        component: () => import('../views/my/MyIndex')
    },
	{
		path: '/profile',
		name: 'profile',
		meta: {
			requiresAuth: true,
			// navTop: true,
			navBottom: false,
			navTopTitle: '个人信息'
		},
		component: () => import('../views/my/PersonInfo')
	},
	{
		path: '/post/:userId',
		name: 'post',
		meta: {
			// navTop: true,
			navBottom: false,
			navTopTitle: '个人动态',
            keepAlive: true,
            isUseCache: false
		},
		component: () => import('../views/my/MyDynamic')
	},
	{
		path: '/message',
		redirect: '/message/chat',
		component: () => import('../views/my/NotificationMain'),
		children: [
			{
				path: 'chat',
				name: 'NotificationChat',
				component: () => import('../views/my/NotificationChat'),
				meta: {
					requiresAuth: true,
					// navTop: true,
					navTopTitle: '我的消息',
					navBottom: false
				}
			},
			{
				path: 'like',
				name: 'NotificationLike',
				component: () => import('../views/my/NotificationLike'),
				meta: {
					requiresAuth: true,
					// navTop: true,
					navTopTitle: '我的消息',
					navBottom: false
				}
			}
		]
	}
];
export default myRouter;
