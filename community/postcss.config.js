module.exports = {
	plugins: {
        'autoprefixer': {
            browsers: ['Android >= 4.0', 'iOS >= 7', 'last 7 versions']
        },
        'postcss-pxtorem': {
            // px rem 比例
            rootValue: 100,
            propList: ['*']
            // 不转为rem,使用 PX 为单位
        }
	}
};
