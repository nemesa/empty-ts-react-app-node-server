import { Logger } from '../logger'
import express from 'express'
import * as fs from 'fs';
/* eslint  @typescript-eslint/no-var-requires: "off" */
const appIndexHtml = require('../../app/index.html')


export default function (logger: Logger, expressServerApp: express.Express) {

    expressServerApp.use(express.static(__dirname + '/public'))

    expressServerApp.get('/', async (_req, res) => {
        logger.Info(`GET: /`)
        res.set('Content-Type', 'text/html')
        res.send(appIndexHtml.default)
    })

    expressServerApp.get('/app-bundle.js', async (_req, res) => {
        logger.Info(`GET: /app-bundle.js`)
        res.set('Content-Type', 'text/javascript');
        const clientApp = fs.readFileSync(`${__dirname}/empty-ts-react-app-node-server.app.js`);
        res.send(clientApp);
    })
}