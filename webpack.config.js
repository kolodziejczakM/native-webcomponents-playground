module.exports = {
    entry: {
        main: [
            '@webcomponents/webcomponentsjs/webcomponents-loader',
            '@webcomponents/webcomponentsjs/custom-elements-es5-adapter',
            './src/index.mjs',
        ]
    },
    module: {
        rules: [
            {
                test: /\.mjs$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};
