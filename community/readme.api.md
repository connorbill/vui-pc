## 钱香社区api文档

### 接口ip和端口
示例：http://123.34.123.11:2390

### http状态码

> 200 成功 <br>
400 表示xxx <br>

### 返回code 说明
> 0 成功 <br>
69633表示token无效
-1 表示xxx <br>

### Android 和 ios 端app 的 登录 token 传值
> 待定

### 文档中出现的特殊文字，说明
optional 在"请求参数"中出现意思是调用接口时可以不传这个字段，在"返回示例"中出现意思是非必须返回这个字段。


### 后端接口和文档自动化
> [TommyLemon/APIJSON](https://github.com/TommyLemon/APIJSON)

### 1首页
### 1.1获取banner滚动图（首页热门）

- 请求说明 
> 请求地址: [  /api/homeHot/getBanner ](#)<br>
请求方式：get

- 是否登录权限
> false


- 请求参数

| 请求参数      |     参数类型 |   参数说明   |
| :-------- | :--------| :------ |

- **返回示例**
>    
```javascript
{
  code: 0, // type:"int",description:"状态代码（0表示成功,69633表示token无效,其它值表示失败）",
  msg: "操作正确", // type:"String30",optional:"FALSE",description:"状态描述",
  data: [
    {
      avatar: "http://7xljdd.com2.z0.glb.qiniucdn.com/fa767b500c58206f5f213a0fe4187e47.jpg",//banner图片
      address:"www.qianxiangbank.com/abcd/1" //点击banner图片跳转地址
    },
    {
      avatar: "http://7xljdd.com2.z0.glb.qiniucdn.com/fa767b500c58206f5f213a0fe4187e47.jpg",
      address:"www.qianxiangbank.com/abcd/1"
    }
  ],
}
```

### 1.2公告位（首页热门）

- 请求说明 
> 请求地址: [  /api/homeHot/getNotice ](#)<br>
请求方式：get

- 是否登录权限
> false



- 请求参数
> 
| 请求参数      |     参数类型 |   参数说明   |
| :-------- | :--------| :------ |


- **返回示例**
>    
```javascript
{
  code: 0,
  msg: "xxxx",
  data: [
    {
      type:"常见问题"
      name: "新手宝典，必读精英钻石贴",
      time:"147234564321", //时间戳
      url:""
    },
    {
      type:"公司动态"
      name: "钱香金融为什么要推出等额本息？",
      time:"147234564321", //时间戳
      url:""
    },
    {
      type:"最新活动"
      name: "新手宝典，必读精英砖石贴！",
      time:"147234564321", //时间戳
      url:""
    }
  ],
}
```


### 1.3 话题分页数据（首页热门）

- 请求说明 
> 请求地址: [  /api/homeHot/getCardList ](#)<br>
请求方式：get

- 是否登录权限
> false

- 请求参数

| 请求参数      |     参数类型 |   参数说明   |
| :-------- | :--------| :------ |
| pageNumber(optional) | number | 页容量(default: 10) |
| pageSize(optional) | number | 页码(default: 1) |


- **返回示例**
>    
```javascript
{
  code: 0,
  msg: "xxxx",
  data: [
    {
        created_at:"12312321",// 发帖时间时间戳
        id: "4293709631725157",// 帖子id
        favorited: "我是否点赞",
        text: "帖子内容",
        textLength: "", //帖子长度
        topicType: "来源分类，平台公告，新人专区等",
        looksCount:0, //"查看人数"
        commentsCount: 0,
        attitudesCount: 0,
        isLongText: false,//是否是长文
        pics:[
            'http://www.qqzhi.com/uploadpic/2014-12-07/165956548.jpg',
            'http://uploads.5068.com/allimg/120112/10341JT1-3.jpg',
            'http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/0b55b319ebc4b745551b5d46c7fc1e178b8215d6.jpg',
            'http://s.wasu.tv/mrms/manage/images/201504/15/552e2a34b9261.jpg'
        ],
        user: {
            id: 5907208915, //本条帖子用户id
            screenName: "用户昵称", 
            profileImageUrl: "",//头像图片地址
            profileUrl: "", // 用户个人信息地址
            following: false, //是否关注
            followMe: false, //是否关注我
            userType:"", //投资等级香妹1号
        },
        talkDetail: [
            // 显示三条评论，如果小于或等于三条评论，全部传输。如果大于三条，只传三条数据
            {
                userId: '8',
                userName: '朽木',
                isRe: false,
                replayName: '',
                replayId: '',
                talkContent: '相当有意思'
            },
            {
                userId: '8',
                userName: '史蒂夫',
                isRe: true,
                replayName: '柯林斯',
                replayId: '10',
                talkContent: '还行'
            },
            {
                userId: '8',
                userName: '史密斯',
                isRe: true,
                replayName: '鲍勃',
                replayId: '10',
                talkContent: '真热闹'
            }
        ]
    }
  ],
}
```


### 1.4热门话题（首页热门）

- 请求说明 
> 请求地址: [  /api/homeHot/getHotTopic ](#)<br>
请求方式：get

- 是否登录权限
> false



- 请求参数
> 
| 请求参数      |     参数类型 |   参数说明   |
| :-------- | :--------| :------ |


- **返回示例**
>    
```javascript
{
  code: 0,
  msg: "xxxx",
  data: [
        {
            title: '苏联的飞机', // 热门话题名字
            number: 155 // 参与人数
        },
        {
            title: '苏十六分',
            number: 166
        },
        {
            title: '上了飞机数量',
            number: 895
        }
  ],
}
```


### 1.5 话题详情页

- 请求说明 
> 请求地址: [  /api/homeHot/getTopicDetail ](#)<br>
请求方式：get

- 是否登录权限
> false


- 请求参数
> 
| 请求参数      |     参数类型 |   参数说明   |
| :-------- | :--------| :------ |
| id | int | 话题id |


- **返回示例**
>    
```javascript
{
  code: 0,
  msg: "xxxx",
  data: [
      userInfo: {
            headImg: 'http://tx.haiqq.com/uploads/allimg/170510/00345T064-8.jpg', // 头像
            name: '也子',//用户名
            time: '14723564654', //时间戳
            isFollow: true, //是否关注(若没有登录则为false)
            type: '香妹1号' //投资等级
        },
        card: {
            title: '动画片展在明天召开', //帖子名字
            content: '绿色减肥乐山大佛是两地分居收到了发接受的绿色的减肥乐山大佛就收到了发接受的雷锋精神的龙卷风', //帖子内容
            imgArr: [
                'http://www.qqzhi.com/uploadpic/2014-12-07/165956548.jpg',
                'http://uploads.5068.com/allimg/120112/10341JT1-3.jpg',
                'http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/0b55b319ebc4b745551b5d46c7fc1e178b8215d6.jpg',
                'http://s.wasu.tv/mrms/manage/images/201504/15/552e2a34b9261.jpg'
            ] //帖子图片，
        },
        number: {
            lookNum: 600, //阅读数量
            talkNum: 25, // 评论数量
            likeNum: 100 // 点赞数量
        },
        noticeAddress: '', // 来源平台公告
        otherTopic:{
            preTopic：{
                title:'标题',
                address:'地址'
            },
            nextTopic：{
                title:'下一个标题',
                address:'地址'
            }
        },
        admire: {
            admireNum:'111', //赞赏人数
            admireScore:'111', //积分
            admireArr:[
                '1.jpg','2.jpg' //头像
            ]
        }
    }
  }
}
```



### 1.6 话题详情评论

- 请求说明 
> 请求地址: [  /api/homeHot/getTopicDetailTalk ](#)<br>
请求方式：get

- 是否登录权限
> false


- 请求参数
> 
| 请求参数      |     参数类型 |   参数说明   |
| :-------- | :--------| :------ |
| id | int | 话题id |
| type | int | 评论类别（0是热门评论，1是所有评论，当type为0时，不需要传分页字段，） |
| pageNumber(optional) | number | 页容量(default: 10) |
| pageSize(optional) | number | 页码(default: 1) |


- **返回示例**
>    
```javascript
{
  code: 0,
  msg: "xxxx",
  data: [
            {
                userId: '8',
                userName: '朽木',
                talkContent: '相当有意思',
                talkNum:'200', //回复人数
                talkLike:'200', // 点赞人数
                time:'' //时间戳
            },
            {
                userId: '8',
                userName: '朽木',
                talkContent: '相当有意思',
                talkNum:'200', //回复人数
                talkLike:'200', // 点赞人数
                time:'' //时间戳
            }

        ]
  
}
```

### 1.7 话题详情评论中的评论

- 请求说明 
> 请求地址: [  /api/comments/hotFlowChild ](#)<br>
请求方式：get

- 是否登录权限
> false


- 请求参数
> 
| 请求参数      |     参数类型 |   参数说明   |
| :-------- | :--------| :------ |
| id | int | 话题id |
| talk_id | int | 帖子评论id |
| pageNumber(optional) | number | 页容量(default: 10) |
| pageSize(optional) | number | 页码(default: 1) |


- **返回示例**
>    
```javascript
{
    code: 0,
    msg: "xxxx",
    data: {
        total_number:"对这条评论的评论数量",
        rootComment:[
            created_at:'',
            id:'',
            text:'相当有意思,不错啊',
            user:{
                id:'',
                screen_name:'这条根评论人的名字',
                profile_image_url:'头像',
                profile_url:'个人信息地址'
            }
        ],
        data:[
            {
                created_at:'',
                id:'',
                text:'你是不是刚刚菜知道',
                user:{
                    id:'',
                    screen_name:'评论列表的人的名字',
                    profile_image_url:'头像',
                    profile_url:'个人信息地址',
                }
            }，
            {
                created_at:'',
                id:'',
                text:'你是不是刚刚菜知道',
                user:{
                    id:'',
                    screen_name:'评论列表的人的名字',
                    profile_image_url:'头像',
                    profile_url:'个人信息地址',
                }
            }，
            {
                created_at:'',
                id:'',
                text:'你是不是刚刚菜知道',
                user:{
                    id:'',
                    screen_name:'评论列表的人的名字',
                    profile_image_url:'头像',
                    profile_url:'个人信息地址',
                }
            }
        ]
    }
}
```

### 1.8 发帖（暂定）

- 请求说明 
> 请求地址: [  /api/homeHot/compose ](#)<br>
请求方式：post

- 是否登录权限
> true


- 请求参数
> 
| 请求参数      |     参数类型 |   参数说明   |
| :-------- | :--------| :------ |



- **返回示例**
>    
```javascript
// xxxx
{
  code: 0,
  msg: "xxxx",
  data: {

  }
}
```

## 2钱香动态

### 2.1钱香动态头部内容栏

- 请求说明 
> 请求地址: [  /api/dynamic/topContent ](#)<br>
请求方式：post

- 是否登录权限
> true


- 请求参数
> 
| 请求参数      |     参数类型 |   参数说明   |
| :-------- | :--------| :------ |



- **返回示例**
>    
```javascript
// xxxx
{
    code: 0,
    msg: "xxxx",
    data: {
        topContent:[
            {
                user:{
                    id:'',
                    screen_name:'评论列表的人的名字',
                    profile_image_url:'头像',
                    profile_url:'个人信息地址',
                }
                avatar: "http://7xljdd.com2.z0.glb.qiniucdn.com/fa767b500c58206f5f213a0fe4187e47.jpg",
                id:"帖子id"
            },
            {
                user:{
                    id:'',
                    screen_name:'评论列表的人的名字',
                    profile_image_url:'头像',
                    profile_url:'个人信息地址',
                }
                avatar: "http://7xljdd.com2.z0.glb.qiniucdn.com/fa767b500c58206f5f213a0fe4187e47.jpg",
                id:"帖子id"
            },
        ],
    }
}
```


### 2.2钱香动态热门推荐

- 请求说明 
> 请求地址: [  /api/dynamic/hotCommend ](#)<br>
请求方式：post

- 是否登录权限
> true


- 请求参数
> 
| 请求参数      |     参数类型 |   参数说明   |
| :-------- | :--------| :------ |
| isHot | true | 热门推荐, |
| type(optional) |  |  |
| pageNumber(optional) | number | 页容量(default: 10) |
| pageSize(optional) | number | 页码(default: 1) |



- **返回示例**
>    
```javascript
// xxxx
{
    code: 0,
    msg: "xxxx",
    data: {
        hotCommend:[
            {
                avatar: "http://7xljdd.com2.z0.glb.qiniucdn.com/fa767b500c58206f5f213a0fe4187e47.jpg",
                id:"帖子id",
                likeNumber:'',
                talkNumber:''
            },
            {
                avatar: "http://7xljdd.com2.z0.glb.qiniucdn.com/fa767b500c58206f5f213a0fe4187e47.jpg",
                id:"帖子id",
                likeNumber:'',
                talkNumber:''
            },
        ],
    }
}
```


### 2.2钱香动态分类动态

- 请求说明 
> 请求地址: [  /api/dynamic/hotCommend ](#)<br>
请求方式：post

- 是否登录权限
> true


- 请求参数
> 
| 请求参数      |     参数类型 |   参数说明   |
| :-------- | :--------| :------ |
| isHot | boolean | false热门推荐, |
| type(optional) | int  | 0小A动态 1钱香零距离 2钱香时间等等  |
| pageNumber(optional) | number | 页容量(default: 10) |
| pageSize(optional) | number | 页码(default: 1) |



- **返回示例**
>    
```javascript
// xxxx
{
    code: 0,
    msg: "xxxx",
    data: {
        list:[
            {
                avatar: "http://7xljdd.com2.z0.glb.qiniucdn.com/fa767b500c58206f5f213a0fe4187e47.jpg",
                id:"帖子id",
                likeNumber:'78908',
                talkNumber:'123421'
            },
            {
                avatar: "http://7xljdd.com2.z0.glb.qiniucdn.com/fa767b500c58206f5f213a0fe4187e47.jpg",
                id:"帖子id",
                likeNumber:'',
                talkNumber:''
            },
        ],
    }
}
```


## 3话题

### 3.1大家热议

- 请求说明 
> 请求地址: [  /api/topic/hotTalk ](#)<br>
请求方式：post

- 是否登录权限
> true

- 请求参数
> 
| 请求参数      |     参数类型 |   参数说明   |
| :-------- | :--------| :------ |
| isHot | boolean | true大家热议, false 热门推荐 |
| pageNumber(optional) | number | 页容量(default: 10) |
| pageSize(optional) | number | 页码(default: 1) |


- **返回示例**
>    
```javascript
{
  code: 0,
  msg: "xxxx",
  data: {
      talk:[
        {
            created_at:"12312321",// 发帖时间时间戳
            id: "4293709631725157",// 帖子id
            favorited: "我是否点赞",
            
            userInfo: {
                headImg: 'http://tx.haiqq.com/uploads/allimg/170510/00345T064-8.jpg', // 头像
                name: '也子',//用户名
                time: '14723564654', //时间戳
                isFollow: true, //是否关注(若没有登录则为false)
                type: '香妹1号' //投资等级
            },
            card: {
                title: '动画片展在明天召开', //帖子名字
                content: '绿色减肥乐山大佛是两地分居收到了发接受的绿色的减肥乐山大佛就收到了发接受的雷锋精神的龙卷风', //帖子内容显示大约前140字(具体字数还未规定，后续修改)
                imgArr: [
                    'http://www.qqzhi.com/uploadpic/2014-12-07/165956548.jpg',
                    'http://uploads.5068.com/allimg/120112/10341JT1-3.jpg',
                    'http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/0b55b319ebc4b745551b5d46c7fc1e178b8215d6.jpg',
                    'http://s.wasu.tv/mrms/manage/images/201504/15/552e2a34b9261.jpg'
                ] //帖子图片，
            },
            number: {
                lookNum: 600, //阅读数量
                talkNum: 25, // 评论数量
                likeNum: 100 // 点赞数量
            },
            talkDetail: [
                // 显示三条评论，如果小于或等于三条评论，全部传输。如果大于三条，只传三条数据
                {
                    userId: '8',
                    userName: '朽木',
                    isRe: false,
                    replayName: '',
                    replayId: '',
                    talkContent: '相当有意思'
                },
                {
                    userId: '8',
                    userName: '史蒂夫',
                    isRe: true,
                    replayName: '柯林斯',
                    replayId: '10',
                    talkContent: '还行'
                },
                {
                    userId: '8',
                    userName: '史密斯',
                    isRe: true,
                    replayName: '鲍勃',
                    replayId: '10',
                    talkContent: '真热闹'
                }
            ]
        }
    ]

}
```


### 3.2 帖子分类的评论

- 请求说明 
> 请求地址: [  /api/topic/class ](#)<br>
请求方式：post

- 是否登录权限
> true

- 请求参数
> 
| 请求参数      |     参数类型 |   参数说明   |
| :-------- | :--------| :------ |
| type(optional) | int  | 0平台公告 1投友交流 2新人专区等等  |
| isAll(optional) | boolean  | true 全部， false 精华  |
| pageNumber(optional) | number | 页容量(default: 10) |
| pageSize(optional) | number | 页码(default: 1) |


- **返回示例**
>    
```javascript
{
  code: 0,
  msg: "xxxx",
  data: {
      comment_num:'参与人数',
      talk:[
        {
            created_at:"12312321",// 发帖时间时间戳
            id: "4293709631725157",// 帖子id
            favorited: "我是否点赞",
            
            userInfo: {
                headImg: 'http://tx.haiqq.com/uploads/allimg/170510/00345T064-8.jpg', // 头像
                name: '也子',//用户名
                time: '14723564654', //时间戳
                isFollow: true, //是否关注(若没有登录则为false)
                type: '香妹1号' //投资等级
            },
            card: {
                title: '动画片展在明天召开', //帖子名字
                content: '绿色减肥乐山大佛是两地分居收到了发接受的绿色的减肥乐山大佛就收到了发接受的雷锋精神的龙卷风', //帖子内容显示大约前140字(具体字数还未规定，后续修改)
                imgArr: [
                    'http://www.qqzhi.com/uploadpic/2014-12-07/165956548.jpg',
                    'http://uploads.5068.com/allimg/120112/10341JT1-3.jpg',
                    'http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/0b55b319ebc4b745551b5d46c7fc1e178b8215d6.jpg',
                    'http://s.wasu.tv/mrms/manage/images/201504/15/552e2a34b9261.jpg'
                ] //帖子图片，
            },
            number: {
                lookNum: 600, //阅读数量
                talkNum: 25, // 评论数量
                likeNum: 100 // 点赞数量
            },
            talkDetail: [
                // 显示三条评论，如果小于或等于三条评论，全部传输。如果大于三条，只传三条数据
                {
                    userId: '8',
                    userName: '朽木',
                    isRe: false,
                    replayName: '',
                    replayId: '',
                    talkContent: '相当有意思'
                },
                {
                    userId: '8',
                    userName: '史蒂夫',
                    isRe: true,
                    replayName: '柯林斯',
                    replayId: '10',
                    talkContent: '还行'
                },
                {
                    userId: '8',
                    userName: '史密斯',
                    isRe: true,
                    replayName: '鲍勃',
                    replayId: '10',
                    talkContent: '真热闹'
                }
            ]
        }
    ]

}
```


### 3.2 帖子分类的评论

- 请求说明 
> 请求地址: [  /api/topic/class ](#)<br>
请求方式：post

- 是否登录权限
> true

- 请求参数
> 
| 请求参数      |     参数类型 |   参数说明   |
| :-------- | :--------| :------ |
| type(optional) | int  | 0平台公告 1投友交流 2新人专区等等  |
| isAll(optional) | boolean  | true 全部， false 精华  |
| pageNumber(optional) | number | 页容量(default: 10) |
| pageSize(optional) | number | 页码(default: 1) |


- **返回示例**
>    
```javascript
{
  code: 0,
  msg: "xxxx",
  data: {
      comment_num:'参与人数',
      talk:[
        {
            created_at:"12312321",// 发帖时间时间戳
            id: "4293709631725157",// 帖子id
            favorited: "我是否点赞",
            
            userInfo: {
                headImg: 'http://tx.haiqq.com/uploads/allimg/170510/00345T064-8.jpg', // 头像
                name: '也子',//用户名
                time: '14723564654', //时间戳
                isFollow: true, //是否关注(若没有登录则为false)
                type: '香妹1号' //投资等级
            },
            card: {
                title: '动画片展在明天召开', //帖子名字
                content: '绿色减肥乐山大佛是两地分居收到了发接受的绿色的减肥乐山大佛就收到了发接受的雷锋精神的龙卷风', //帖子内容显示大约前140字(具体字数还未规定，后续修改)
                imgArr: [
                    'http://www.qqzhi.com/uploadpic/2014-12-07/165956548.jpg',
                    'http://uploads.5068.com/allimg/120112/10341JT1-3.jpg',
                    'http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/0b55b319ebc4b745551b5d46c7fc1e178b8215d6.jpg',
                    'http://s.wasu.tv/mrms/manage/images/201504/15/552e2a34b9261.jpg'
                ] //帖子图片，
            },
            number: {
                lookNum: 600, //阅读数量
                talkNum: 25, // 评论数量
                likeNum: 100 // 点赞数量
            },
            talkDetail: [
                // 显示三条评论，如果小于或等于三条评论，全部传输。如果大于三条，只传三条数据
                {
                    userId: '8',
                    userName: '朽木',
                    isRe: false,
                    replayName: '',
                    replayId: '',
                    talkContent: '相当有意思'
                },
                {
                    userId: '8',
                    userName: '史蒂夫',
                    isRe: true,
                    replayName: '柯林斯',
                    replayId: '10',
                    talkContent: '还行'
                },
                {
                    userId: '8',
                    userName: '史密斯',
                    isRe: true,
                    replayName: '鲍勃',
                    replayId: '10',
                    talkContent: '真热闹'
                }
            ]
        }
    ]

}
```

