'use strict';

var webpack    = require('webpack');
var path       = require('path');

var srcPath    = path.join(__dirname, 'src/frontend');
var buildPath  = path.join(__dirname, 'src/frontend/build');
var modulePath = path.join(srcPath, 'run.js');

var fileName = '[name]-[hash:7].[ext]';

module.exports = {
	target: 'web',
	cache: true,
	entry: {
		module: modulePath,
	},
	resolve: {
		root: srcPath,
		extensions: ['', '.js', '.scss', '.css'],
		modulesDirections: ['node_modules', 'src']
	},
	output: {
		path: buildPath,
		publicPath: '/static/',
		filename: 'app.js'
	},
	module: {
		loaders: [
			{ test: /\.js?$/, exclude: /node_modules/, loader: 'babel?cacheDirectory'},
			{ test: /\.scss$/, loader: 'style!css?root=..!sass!autoprefixer' },
			{ test: /\.css$/, loader: 'style!css?root=..!autoprefixer' },
			{ test: /\.png$/, loader: 'url-loader?limit=100000' },
			{ test: /\.(png|gif|jpg)$/, loader: 'file-loader', query: { name: fileName } },
			{ test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader', query: { root: '..', name: fileName }}
		]
	},
	plugins: [
		new webpack.NoErrorsPlugin()
	],
	debug: true,
	watchOptions: {
		poll: true
	},
};