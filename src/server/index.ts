import express from 'express'
import * as bodyParser from 'body-parser'
import { Logger } from './logger'

const logger = new Logger()
const port = process.env.PORT || 11111
const expressServerApp = express()
expressServerApp.listen(port)
logger.Info(`server started at port:${port}`)
logger.Info(`http://localhost:${port}`)

expressServerApp.use(bodyParser.urlencoded({ extended: true }))
expressServerApp.use(bodyParser.json())

import registerContentRoutes from './routes/content'
registerContentRoutes(expressServerApp)
