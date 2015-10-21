'use strict';

var webpack    = require('webpack');
var path       = require('path');

var srcPath    = path.join(__dirname, 'src/frontend');
var buildPath  = path.join(__dirname, 'src/frontend/assets/js');
var modulePath = path.join(srcPath, 'run.js');

console.log(buildPath)

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
		publicPath: '',
		filename: 'app.js'
	},
	module: {
		loaders: [
			{ test: /\.js?$/, exclude: /node_modules/, loader: 'babel?cacheDirectory'},
			{ test: /\.scss$/, loader: 'style!css!sass!autoprefixer' },
			{ test: /\.css$/, loader: 'style!css!autoprefixer' }
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