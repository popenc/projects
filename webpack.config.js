const
	path = require('path');



module.exports = {
    entry: './public/js/main.js',
    devtool: 'inline-source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
    	rules: [
    		{
    			test: /\.css$/,
    			use: [
    				'style-loader',
    				'css-loader'
    			]
    		}
    	]
    }
};