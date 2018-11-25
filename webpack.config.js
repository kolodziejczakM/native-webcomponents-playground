module.exports = {
    entry: {
        main: [
            '@webcomponents/webcomponentsjs/webcomponents-loader',
            '@webcomponents/webcomponentsjs/custom-elements-es5-adapter',
            './src/index.js',
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};
