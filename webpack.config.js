const path = require('path')
const CopyPlugin = require("copy-webpack-plugin");

const getMode = (env) => {
    if (env.development) {
        return "development"
    }
    if (env.production) {
        return "production"
    }
    return null
}
const getFolder = (env) => {
    if (env.development) {
        return "dev"
    }
    if (env.production) {
        return "prod"
    }
    return null
}

const serverConfigFactory = (env) => {
    let folder = getFolder(env)

    let config = {
        target: 'node',
        mode: getMode(env),
        devtool: "inline-source-map",
        entry: "./src/server/index.ts",
        devServer: {
            port: 11111,
            open: true,
            historyApiFallback: true,
        },
        output: {
            path: path.join(__dirname, `/dist/${folder}`),
            filename: `empty-ts-react-app-node-server.server.js`
        },
        resolve: {
            // Add `.ts` and `.tsx` as a resolvable extension.
            extensions: [".html", ".ts", ".tsx", ".js"]
        },
        module: {
            rules: [
                // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
                { test: /\.tsx?$/, loader: "ts-loader" },
                {
                    test: /\.html$/,
                    loader: "html-loader",
                    options: {
                        sources: {
                            urlFilter: (attribute, value, resourcePath) => {
                                //remove app-bundle.js from sources as GET /bundle.js will be resolved runtime by express
                                if (/app\-bundle\.js$/.test(value)) {
                                    return false;
                                }
                                return true;
                            }
                        }
                    }
                }
            ]
        },
        plugins: [
          new CopyPlugin({
            patterns: [
              { from: `./src/app/public`, to: path.join(__dirname, `/dist/${folder}/public`) }
            ],
          }),
        ]
    }

    return config
}

const clientSideWebAppConfigFactory = (env) => {
    let folder = getFolder(env)

    let config = {
        target: 'web',
        mode: getMode(env),
        devtool: "inline-source-map",
        entry: "./src/app/scripts/index.tsx",
        output: {
            path: path.join(__dirname, `/dist/${folder}`),
            filename: `empty-ts-react-app-node-server.app.js`
        },
        resolve: {
            // Add `.ts` and `.tsx` as a resolvable extension.
            extensions: [".css", ".scss", ".html", ".ts", ".tsx", ".js"]
        },
        module: {
            rules: [
                // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
                { test: /\.tsx?$/, loader: "ts-loader" },
                { test: /\.html$/, loader: "html-loader" },
                {
                    test: /\.(s[ac]ss|css)$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        "style-loader",
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",
                    ],
                },
                {
                    test: /\.(svg|eot|woff|woff2|ttf)$/,
                    use: ['file-loader']
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                        },
                    ],
                },
            ]
        }
    };
    return config;
}

const webpackConfig = (env) => {

    console.log("*".repeat(20))
    //console.log(env)
    console.log(`Build:${getMode(env)}`)
    console.log("*".repeat(20))


    return [clientSideWebAppConfigFactory(env), serverConfigFactory(env)]    
}

module.exports = webpackConfig

