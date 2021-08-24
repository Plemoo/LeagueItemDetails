module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                //target: 'http://lolitemdetails.eu-4.evennode.com/',
                target: 'http://localhost:3080',
                changeOrigin: true
            },
        }
    }
}