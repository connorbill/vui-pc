module.exports = {
	root: true,
	env: {
		browser: true,//browser全局变量
		node: true  //node全局变量
	},
	'extends': [
		'plugin:vue/essential',
		'@vue/standard'
	],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // allow debugger during development
		
		//语法
		'no-func-assign': 2,  // 禁止对 function 声明重新赋值
		'no-dupe-args': 2, // 禁止 function 定义中出现重名参数
		'no-dupe-keys': 2,// 禁止对象字面量中出现重复的 key
		'no-duplicate-case': 2, //禁止重复的 case 标签
		'no-eval': 2, //不允许使用eval
		'no-with': 2,  //不允许使用with
		
		/*变量*/
		'no-delete-var': 2, // 禁止删除变量
		'no-use-before-define': 1, // 不允许在变量定义之前使用它们
		
		/*风格*/
		'indent': [0, 4], // 4个空格缩进
		'semi': [1, 'always'], // 结尾使用分号
		'quotes': [1, 'single'], // 引号类型-单引号
		'no-tabs' : 0,
		"no-multiple-empty-lines": [1, {"max": 2}],//空行最多不能超过2行
        // 'space-before-function-paren': 0
	},
	parserOptions: {
		parser: 'babel-eslint'
	}
};
