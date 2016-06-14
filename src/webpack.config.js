var webpack = require("webpack");

module.exports = {

    entry : {
        bundle : './fwk7/js/my-app.js'
    },

    output : {
        path : __dirname + '/fwk7/js/',
        filename : "[name].js"
    },

	module: {
        loaders: [
            { test: /\.tpl$/, loader: "raw" },
        ]
    },

    externals : {
        $$ : 'Dom7'
    },

    plugins: [
	  new webpack.ProvidePlugin({
		"A": __dirname + "/fwk7/js/A.js"
	  }) 
	]
}
