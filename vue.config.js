module.exports = {
    //这个值也可以被设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径。
    publicPath: './',
    devServer: {
        open: false,//启动不打开网页
        host: '0.0.0.0',
        port: 92,
        https: false,
        hotOnly: false,
        proxy: {
            '': {
                target: 'http://39.97.214.57:91', // 你接口的域名
                secure: false, // 如果是https接口，需要配置这个参数为true
                changeOrigin: true, // 如果接口跨域，需要进行这个参数配置为true
                pathRewrite: {
                    '': 'http://39.97.214.57:91'
                }
            }
        }
    }
}