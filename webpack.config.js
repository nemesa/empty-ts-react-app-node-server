const path = require('path')


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
                { test: /\.html$/, loader: "html-loader" }
            ]
        }
    }

    return config
}

const webpackConfig = (env) => {

    console.log("*".repeat(20))
    //console.log(env)
    console.log(`Build:${getMode(env)}`)
    console.log("*".repeat(20))


    return serverConfigFactory(env);
}

module.exports = webpackConfig

