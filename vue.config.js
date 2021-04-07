module.exports = {
    css: {
        loaderOptions: {
            sass: {

            }
        }
    },
    chainWebpack: config => {
        config.externals({
            'velocity': 'Velocity',
        })
    }
}