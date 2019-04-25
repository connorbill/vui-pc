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


z-index 层级要集中备注， 最大值不要超过2000，防止页面层级高于vant提示框， vant组件的弹层值为2000

vant-Toast 提示框 2000
- 上下导航栏： 900-1000
评论输入框 900-1000
回复列表

router router.history.base + to.path
http router.history.base + router.history.current.path;

### 移动端调试工具
```html
方法一
<script src="http://weinre.hijs.cc/target/target-script-min.js#anonymous"></script>


方法二：
<script type="text/javascript" src="//cdn.jsdelivr.net/npm/eruda"></script>
<script>eruda.init();</script>
```

- 如何返回不刷新
```javascript

// 例子
//在HomeRouter.js中,定义keepAlive为true表示这个路由返回不刷新，isUseCache为false代表不缓存数据
{
    path: 'dynamic',
    name: 'dynamic',
    component: () => import('../views/home/DynamicList'),
    meta: {
        keepAlive: true,
        isUseCache: false
    }
}

// 在App.vue, v-if="$route.meta.keepAlive" 如果路由中keepAlive：true,那么就使用<keep-alive></keep-alive>
<keep-alive>
    <router-view v-if="$route.meta.keepAlive" />

<router-view v-if="!$route.meta.keepAlive" />


            
// DynamicList.vue
methods: {
    activated () {
        this.getDynamicTopThree();
        // isUseCache为false时才重新刷新获取数据
        // 因为对list使用keep-alive来缓存组件，所以默认是会使用缓存数据的
        if (!this.$route.meta.isUseCache) {
            this.dynamicList = [];
            this.loading = true;
            this.changeRecommendList('refresh');
        }
        this.$route.meta.isUseCache = false;
    },
    beforeRouteLeave (to, from, next) {
        // 只有点击进入详情页，返回列表页才不会刷新，若进入其它页面，返回会刷新
        if (to.name === 'detail') {
            from.meta.isUseCache = true;
        }
        next();
    }
}

// 如果像进入详情页，然后要删除这个数据，返回的时候这个数不存在了，不需要显示了，怎么办？那点进去的时候，肯定知道是数组中的第几个，那么返回到页面的时候删除了呗

```

- 如果我们在官网中，有好几个像社区这样的独立项目，而要共用账户信息怎么办？
```javascript
// 在BootRouter.js 中，不同的项目的base值不一样，base: '/community',base: '/community2'
```


- 假如社区里面有一个不存在的地址怎么办？
```javascript
// 在BootRouter.js 中，redirect的值就是地址不存在时，你希望跳转到的页面
{
    path: '*',
    redirect: '/'
}
```

- 目前定义了哪些公用的板块？
```javascript
// 说实话，目前项目未成熟，大约能剥离出去的只有 src/common 文件夹中的js文件了，而且尚未成长成大树

```

- 数据是如何请求的
```javascript
// 我们以倒推的思维来理一下，以HomeHot.vue 为例，
// 第1步：HomeHot.vue   只管字段传参（this.cardPageNum），不管其它事项
getHomeCardList (refresh) {
    this.cardPageNum++;
    this.$http.HomeHotService.getCardList(this.cardPageNum)
        .then(res=>{
            // 这里只会接收到 code:'000000'的情况，其余code值都会在 catch()方法中，原因在后面继续推导。
            // 这样的好处是1：错误可以集中处理
            // 2：这样写的话，而不是直接在页面中调用ajax,像 jQuery中， 
            // 如果这样的话，我们每次都要在 ajax方法外面定义一个类似 var self = this; ,在 success方法中 self.isLoading = res.isLoading;
            // 而可以直接使用
            this.isLoading = res.isLoading;
            // 
        })
        .then(res=>{
            //在 ECMA2015 的Promise 这个东西，这样子显得更好看
        })
        .catch(res=>{
            
        })
}

// jquery 请求
var self = this;
$.ajax({
    url:'',
    type:'get',
    success:function(res){
        self.isLoading = res.isLoading;
    }
})

// 第2步：HomeHotService.js 中，只管接受参数，和定义请求方式（get 或 post)
// 首页热门推荐
getCardList (pageNum, ...pageSize) {
    // let pSize = pageSize[0];
    let data = {
        page: pageNum
    };
    return instanceAxios.get(base.homeHot.getCardList, data)
        .then(res => {
            // console.log(res);
            return res;
        })
        .catch(err => {
            return Promise.reject(err);
        });
}

// 第3步：HomeHotService.js 中，只管接受参数，接口和请求方式（get 或 post)，base.homeHot.getCardList就是管理接口的（在BaseService.js）
// 首页热门推荐
getCardList (pageNum, ...pageSize) {
    // let pSize = pageSize[0];
    let data = {
        page: pageNum
    };
    return instanceAxios.get(base.homeHot.getCardList, data)
        .then(res => {
            // console.log(res);
            return res;
        })
        .catch(err => {
            return Promise.reject(err);
        });
}

// 第4步：HttpService.js 中，使用 axios 插件来处理 ajax请求
// 1定义get和post请求，
// 2将参数进行处理，
// 3响应请求统一处理（000003 是未登录等等）
// 4 设置 Content-type方式
// 创建axios实例
let instance = axios.create({
    // baseURL: 'http://levi.mobile.qianxiangbank.com',
    // baseURL: 'http://levi.wap.qianxiangbank.com',
    // timeout: 2500,
    // headers: {
    //     'Content-type': 'application/x-www-form-urlencoded'
    // }
});
let instanceAxios = {
    get (url, params) {
        return instance.get(url, {
            params: params
        });
    },
    post (url, params) {
        return instance.post(url, Qs.stringify(params));
    }
};
```

- 当查看帖子详情中，点击跳转一个评论的评论列表页，看到一个有意思的评论，我可以分享这个评论页给朋友吗？
- 答：可以的，每个页面都是一个地址，即使是一个评论中的回复页，我们都要尽可能的做成一个地址，以备将来做成一个可分享的地址。



- 威慑么发表评论不可以插入表情？
- 答：这个功能后续再拓展。点击评论是跳转了一个页面，后续可拓展，发表图片等等。


- 威慑么发表评论跳转了一个页面，而不是直接在当前页面评论
- 答：因为把输入框放在底部，在ios中兼容性不是很好，如果有好的方法，欢迎贴代码就是上。
















