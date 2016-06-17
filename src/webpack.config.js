var webpack = require("webpack");

module.exports = {

    entry: {
        bundle: './fwk7/my-app.js'
    },

    output: {
        path: __dirname + '/fwk7/',
        filename: "[name].js",
        chunkFilename: "[id].chunk.js"
    },

    module: {
        loaders: [{
            test: /\.(html)|(tpl)$/,
            name: "mandrillTemplates",
            loader: "raw!html-minify"
        }, {
            test: /\.js?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel', // 'babel-loader' is also a legal name to reference
            query: {
                presets: ['es2015']
            }
        }]
    },

    externals: {
        $$: 'Dom7',
        Template7: "Template7"
    },

    plugins: [
        new webpack.ProvidePlugin({
            "A": __dirname + "/fwk7/components/comm/A.js",
            "$$": "$$"
        })
        //      new webpack.optimize.UglifyJsPlugin()
    ]
}
