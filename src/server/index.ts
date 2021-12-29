import * as express from 'express'
import * as bodyParser from 'body-parser'
import { Logger } from './logger'
const appIndexHtml = require('../app/index.html')

const logger = new Logger()
const port = process.env.PORT || 11111
let expressServerApp = express()
expressServerApp.listen(port)
logger.Info(`server started at port:${port}`)
logger.Info(`http://localhost:${port}`)

expressServerApp.use(bodyParser.urlencoded({ extended: true }))
expressServerApp.use(bodyParser.json())

expressServerApp.get('/', async (_req, res) => {
    logger.Info(`GET: /`)
    res.set('Content-Type', 'text/html')
    res.send(appIndexHtml.default)
})