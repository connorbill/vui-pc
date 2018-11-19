# 钱香社区

**启动流程**

- 1   npm install  安装依赖
- 2   npm run serve  运行
- 3   npm run build  打包

**技术栈**

vuecli3  版本3.0.1
vue-router  版本3.0.1
vuex  版本3.0.1
axios 版本0.18.0


**适配：**

安卓4.4以上 + ios 9及以上

**目录：**

```
+-- node_modules 依赖库目录
+-- dist  打包文件目录
+-- public 公共资源目录
|   +-- favicon.ico  fav图标
|   +-- index.html   入口html文件
+-- src 业务代码目录
|   +-- assets 资源目录
|   +-- components vue组件目录
|   +-- views vue文件目录
|   +-- router 路由目路
|   +-- store vuex 目錄
|   +-- App.vue
|   +-- main.js
+-- test 测试代码目录
|   +-- e2e  e2e测试目录
|   +-- unit  单元测试目录
+-- .browserslistrc    浏览器兼容性适配配置文件
+-- .env.development   vue 开发环境配置文件
+-- .env.production    vue 生产环境配置文件
+-- .eslintrc.js     eslint配置文件
+-- .gitignore       git .gitignore文件
+-- babel.config.js  babel配置文件
+-- cypress.json    e2e测试cypress框架配置文件
+-- package.json    项目package文件
+-- package-lock.json  项目package-lock文件
+-- postcss.config.js   postcss配置文件
+-- README.md     readme文件
+-- vue.config.js   vuecli配置文件
```

### 配置相关

开发调试
vue.config.js
- 跨域调接口配置：proxy: 'http://localhost:8988'
- 执行 npm run serve



打包配置 vue.config.js
- 执行 npm run build
- baseUrl: '/community', 配置文件根目录
- 打包后生成目录：dist

### 与ios Android 相互调用相关函数

```javascript
// app主动调用，执行 QX_AppCallback.back_getQxToken('传token字符串')， js就可以获取token
//
window.QX_AppCallback = {
    // 传token
    back_getQxToken: function (res) {
        localStorage.setItem('token', res);
        console.log(res);
        document.getElementById("aa").innerHTML = 'token=' + res;
    },
    // 传app信息
    back_getQxAppInfo: function (res) {
        // localStorage.setItem('appinfo', res);
        console.log(res);
        document.getElementById("bb").innerHTML = 'appinfo=' + res;
        let appInfo = {};
        if (res) {
            appInfo = JSON.parse(res);
            localStorage.setItem('appInfo', appInfo);
        }
    }
}

// js 主动调用 app方法

QxAppJump('login');// 登录
QxAppJump('home');// 主页
QxAppShowSharePanel()// 分享
等等
```


### vue文件 export default {}方法放置顺序
```
name
components
props
data
created
mounted
activited
update
beforeRouteEnter
beforeRouteUpdate
methods
filter  數據格式化
computed //计算属性
watch  // 監控值的變化

export default {
        name: 'HomeHot',
        components: {
            CardList,
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem
        },
        props: ['PropsOne', 'PropsTwo'],
        data () {
            return {
                id: '',
                name: '',
                count: 0,
                activeName: 'first',
                cardArr: [],
                topicObj: ''
            };
        },
        created () {
            this.setData();
        },
        mounted () {
            setData () {
                // ...
            }
        }
        beforeRouteEnter (to, from, next) {
            next(gui => {
                gui.setData()
            });
        },
        methods: {
            setData () {
                // ...
            }
        },
}
        等等。。。
```




### vue 代码风格指南
> [vue 代码风格指南https://cn.vuejs.org/v2/style-guide/](https://cn.vuejs.org/v2/style-guide/)

### vue项目文件命名介绍
- css 文件名暂定<br>
- image 小图(icon)名字：icon-xxx-xxx, 放入src/assets/images/icon文件夹<br>
image 非小图分类存放：home文件夹，my文件夹，主要是为了查找方便，以及编辑器点开文件夹时，不会展开很长<br>
- js router类文件名单词大写开头 (PascalCase)：HomeRouter.js，后面加上Router 这么做为了一看就能识别这个js文件的用途<br>
js api接口类文件单词大写开头 (PascalCase)：HomeService.js,后面加Service,便于识别，分模块组合<br>
- vue components文件(PascalCase):公用组件文件名后面加 Component.vue ，便于识别，区别于其他一般的视图页面组件，<br>
vue 一般视图文件(PascalCase)：至少两个单词，便于在编辑器里识别，
- import HomeHotService from './HomeHotService'; import 后面 一般以大写开头 (PascalCase)
-
```javascript
    export default{
        name: 'HomeHot',//name:''(PascalCase)
        data () {
            //
        },
        created () {
            //针对这类vue方法名括号前后加空格
        }
    }
```
- js 文件中，export 的接口里的代码不要包含 this,会导致指向undefined


### webstorm对vue文件格式化设置
File->Settings->Editor->Code Style->Javascript->Spaces->
<br>
Before Parentheses->Function declaration parentheses 打勾
```javascript
    export default{
        data () {

        },
        created () {
            //针对这类vue方法名括号前后加空格
        }
    }
```
Before Parentheses->Function callparentheses 不打勾
<br>等等


z-index 层级要集中备注， 最大值不要超过2000， vant组件的弹层值为2000

vant-Toast 提示框 2000
- 上下导航栏： 900-1000
评论输入框 900-1000
回复列表

router router.history.base + to.path
http router.history.base + router.history.current.path;

### 移动端调试工具
```html
<script src="http://weinre.hijs.cc/target/target-script-min.js#anonymous"></script>
<script type="text/javascript" src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>


<script type="text/javascript" src="//cdn.jsdelivr.net/npm/eruda"></script>
<script>eruda.init();</script>
```











