const path                 = require('path');
const HtmlWebPackPlugin    = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssPresetEnv     = require("postcss-preset-env");
const autoprefixer         = require("autoprefixer");
const webpack              = require('webpack');

module.exports = {
    entry: {
        bundle: [
            relativePath('./src/index.jsx'),
            relativePath('./src/index.scss')
        ]
    },
    output: {
        publicPath: '/',
        path: relativePath("./dist")
    },
    devtool: "sourcemap",
    devServer: {
        contentBase: relativePath("./dist"),
        compress: true,
        port: 8080,
        hot: true
    },
    resolve: {
        extensions: [".js", ".jsx"] ,
        alias: { 
            "@app":        relativePath("./src"),
            "@components": relativePath("./src/components"),
            "@routes":     relativePath("./src/routes"),
            "@services":   relativePath("./src/services"),
            "@configs":    relativePath("./src/configs")
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: relativePath("./src"),
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader"
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    {
                        loader: 'css-loader',
                    }, 
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    postcssPresetEnv(),
                                    autoprefixer()
                                ];
                            }
                        }
                    }, 
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: relativePath("./src/index.html"),
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};

function relativePath(pathString) {
    return path.resolve(__dirname, pathString);
}