var webpack = require("webpack");

module.exports = {

    entry : {
        bundle : './fwk7/my-app.js'
    },

    output : {
        path : __dirname + '/fwk7/',
        filename : "[name].js"
    },

	module: {
        loaders: [
            { test: /\.tpl$/, loader: "raw" },
        ]
    },

    externals : {
        $$ : 'Dom7',
        Template7 : "Template7"
    },

    plugins: [
	  new webpack.ProvidePlugin({
		"A": __dirname + "/fwk7/components/comm/A.js"
	  }) 
//      new webpack.optimize.UglifyJsPlugin()
	]
}
