## 目录

### 说明
- 复制与模仿，增加风控项目所需功能 [element-ui: https://element.eleme.io](https://element.eleme.io)
- 文档地址 https://docs.qianxiangbank.com/vui/new


### 打包组件
> npm run dist

### 将组件发布到 https://www.npmjs.com/
- 1 登录 npm 账号

  > npm login

- 2 上传组件代码

  > npm publish

### 打包在线文档（注意：先发布到npm, 再打包在线文档）
- 1 修改 package.json 中 version，比如目前版本号为1.1.2， 一般优化，没有增删组件，则改变第三位版本号：1.1.3； 如果是增加了组件：则改变为 1.2.0；

- 2 修改 build/bin/version.js, 例如：

    如果是1.1.3版本，则如下修改方式
    ```javascript
    //原来：
    var content = { '0.9.9': '0.9', '1.0.1': '1.0', '1.1.2': '1.1'};
    if (!content[version]) content[version] = '1.1';
    
    // 修改后：
    var content = { '0.9.9': '0.9', '1.0.1': '1.0', '1.1.3': '1.1'};
    if (!content[version]) content[version] = '1.1';
    ```

    如果是1.2.0版本，则如下修改方式
    ```javascript
    //原来：
    var content = { '0.9.9': '0.9', '1.0.1': '1.0', '1.1.2': '1.1'};
    if (!content[version]) content[version] = '1.1';
    
    // 修改后：增加一个版本
    var content = { '0.9.9': '0.9', '1.0.1': '1.0', '1.1.2': '1.1',  '1.2.0': '1.2'};
    if (!content[version]) content[version] = '1.2';

    
    ```

    // 也就是说：0.9, 1.0, 1.1, 1.2 分别对应 http://139.224.43.8:88/chizhan/doc/src/master/dist_publish/vui 目录中的 0.9, 1.0, 1.1, 1.2 文件夹， 其中 new/ 文件夹是放最新版本文档，目前状态下，new文件夹中内容实际是和1.2 文件中一样，代表着最新版本。也是对应着文档网站 切换版本的时候会找寻对应的文件夹，切换版本的功能由nginx配置，nginx配置如下：

    // $1 是代表版本号，比如访问https://docs.qianxiangbank.com/vui/new/ 就会访问最新版本/data/chizhan/doc/dist_publish/vui/new文件夹打包好的文档， 访问https://docs.qianxiangbank.com/vui/1.1 就会访问/data/chizhan/doc/dist_publish/vui/1.1 文件夹下打包好的index.html
    ```javascript
    location ~ /vui/(.*) {
        alias /data/chizhan/doc/dist_publish/vui/$1;
        index  index.html index.htm;
    }
    ```
    // 当文档请求版本号时，都去访问最新版本的 versions.json， 这样当我们切换到1.1版本的时候，在页面上还是能看到四个版本【0.9, 1.0, 1.1, 1.2】可以进行切换， 而不会是这样的情况： 切换到0.9版本，页面上的版本列表只有 【0.9】， 切换到1.0版本，页面上的版本列表只有 【0.9，1.0】，依次类推。
    ```javascript
    location /versions.json {
        alias /data/chizhan/doc/dist_publish/vui/new/versions.json;
    }
    ```
- 3 修改更新日志
    记录每次版本更新日志文件：CHANGELOG.zh-CN.md 。 这样每个人可以了解更新了什么。

- 4 执行打包，这一步骤要在第2，3步骤之后执行

    > npm run deploy:build

- 5 找到 examples/vui-pc 文件夹，将其中内容复制到文档git仓库：http://139.224.43.8:88/chizhan/doc/src/master/dist_publish/vui，分两种情况：
    
        
    如果是1.1.3版本，则如下修改方式
    //将打包好文件替换掉 http://139.224.43.8:88/chizhan/doc/src/master/dist_publish/vui/  1.1 和 new 文件夹中的内容， 他们都代表 1.1版本下最新的内容

    如果是1.2.0版本，大版本修改，则如下修改方式
    //将打包好文件替换掉 http://139.224.43.8:88/chizhan/doc/src/master/dist_publish/vui/  new 文件夹中的内容， 并新建 1.2 文件夹，复制打包文件到1.2 文件夹。
    提交代码；

- 6 最后一步：打开 jumpserver web 终端: http://106.75.9.154:8088/luna/，打开 qx-test-uat 执行命令

    > cd /data/chizhan/doc/

    > git pull

    > 访问 https://docs.qianxiangbank.com/vui/new




