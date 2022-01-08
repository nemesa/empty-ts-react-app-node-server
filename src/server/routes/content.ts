import express from 'express'


export default function (expressServerApp: express.Express) {
    expressServerApp.use(express.static(__dirname + '/public'))
}