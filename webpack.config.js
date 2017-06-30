var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: path.resolve(__dirname, "./src/main.html"),
	filename: "index.html",
	inject: "body"
});

var config = {
	entry: "./src/main.tsx",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "./dist")
	},
	devtool: "source-map",
	resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "awesome-typescript-loader"
			},
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			},
			{
				 test: /\.css$/,
				 loader: "style-loader!css-loader"
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				loader: 'url-loader?limit=100000'
			}
		]
	},
	plugins: [ HtmlWebpackPluginConfig ]
}

module.exports = config;
