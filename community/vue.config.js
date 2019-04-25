var webpack = require('webpack');
module.exports = {
    baseUrl: '/community',
    devServer: {
        port: 8890,
        open: true,
        // proxy: 'http://localhost:8007'
        proxy: {
            // 本地
            '/wxActivity/uploadActivityPic2.api': {
                target: 'http://127.0.0.1:8007',
                pathRewrite: { '^/wxActivity/uploadActivityPic2.api': '/wxActivity/uploadActivityPic2.api' },
                ws: true,
                changeOrigin: true
            },
            '/communityQx': {
                target: 'http://127.0.0.1:8988',
                pathRewrite: { '^/communityQx': '/communityQx' },
                ws: true,
                changeOrigin: true
            }
            // 线上
            // '/communityQx': {
            //     target: 'https://cunapi.qianxiangbank.com',
            //     // pathRewrite: { '^/communityQx': '/communityQx' },
            //     ws: true,
            //     changeOrigin: true
            // },
            // 'https://cunapi.qianxiangbank.com/share/shareSign.api': {
            //     target: 'https://cunapi.qianxiangbank.com/share/shareSign.api',
            //     // pathRewrite: { '^/communityQx': '/communityQx' },
            //     ws: true,
            //     changeOrigin: true
            // }
        }
    },
    css: {
        sourceMap: true,
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `src/variables.scss` 这个文件
                data: `@import "@/assets/style/common/variables.scss";`
            }
        }
    },
    productionSourceMap: false,
    configureWebpack: {
        devtool: false,
        plugins: [
            new webpack.SourceMapDevToolPlugin({})
        ]
    }

};
