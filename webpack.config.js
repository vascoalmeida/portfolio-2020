const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const dirBuild = path.join(__dirname, "build");
const dirSource = path.join(__dirname, "src");
const dirPublic = path.join(__dirname, "public");
const dirPages = path.join(dirSource, "pages");

module.exports = {
    entry: [
        path.join(dirPages, "index.js"),
        path.join(dirPages, "_index.scss"),
    ],
    output: {
        path: path.resolve(__dirname, dirBuild),
        filename: "[name].js",
    },
    resolve: {
        modules: [
            dirSource,
			dirPublic,
            "node_modules",
        ],
    },
    module: {
        rules: [
            {
                test: /\.pug/,
                loader: "pug-loader",
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: "css-loader"},
                    {loader: "sass-loader"},
                ],
            },
            {
                test: /\.(png|jpe?g|svg|gif)$/i,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                    outputPath: "images/",
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                    outputPath: "fonts/",
                }
            },
            {
                test: /\.(glsl|frag|vert)$/,
                loader: "raw-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(glsl|frag|vert)$/,
                loader: 'glslify-loader',
                exclude: /node_modules/
            },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "./"),
        compress: true,
        port: 8000,
        historyApiFallback: true,
        writeToDisk: true,
    },
    plugins: [
        new MiniCssExtractPlugin(),
        /*new CopyWebpackPlugin({
            from: "./static",
            to: "./",
        }),*/
    ],
};
