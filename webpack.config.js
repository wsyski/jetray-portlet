var webpack = require('webpack');
var path = require('path');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;

const appRoot = path.resolve('./src/app');

module.exports = {
    mode: 'development',
    optimization: {
        minimize: false,
        noEmitOnErrors: true
    },
    bail: true,
    entry: {
        // NOTE: entry settings will be overridden when invoked from gulp
        'main': ['./src/app/main.ts'],
    },
    output: {
        filename: '[name].js',
        // NOTE: path will be overridden when invoked from gulp
        path: path.resolve('./build'),
        devtoolModuleFilenameTemplate: '[resource-path]',
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(path.join(__dirname, 'ng_runtime', 'ng_runtime-manifest.json'))
        }),
        new AngularCompilerPlugin({
            tsConfigPath: './tsconfig.json',
            entryModule: './src/app/app.module#AppModule',
            sourceMap: true
        })
        // suppress Typescript warnings when building Angular into vendor package
        // new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,appRoot),
        // new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/,appRoot),
        // new webpack.ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)fesm5/, appRoot),
    ],
    resolve: {
        extensions: ['*', '.ts', '.js']
    },
    module: {
        rules: [
            // process Angular templates to inline HTML/CSS then invoke Typescript
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                loader: '@ngtools/webpack'
            },
            // used to load Angular HTML/CSS files for templates
            {test: /\.(html|css)$/, loader: 'raw-loader'},
            {test: /\.scss$/, exclude: /node_modules/, loaders: ['raw-loader', 'sass-loader']}
        ],
        noParse: /path.join(__dirname,'node_modules', 'angular2', 'bundles')/
    },
    devtool: 'source-map'
};
