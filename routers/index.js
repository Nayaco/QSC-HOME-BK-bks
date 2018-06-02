'use strict'

const Home = require('./Home')
const Info = require('./Info')
const Files = require('./Files')
const Send = require('./Send')

const AppGet = (router)=>{
    router.get('/', Home.API['/'])
    router.get('/info/delete', Info.API['/info/delete'])
    router.get('/info/get', Info.API['/info/get'])
    router.get('/console/list', Files.API['/console/list'])
    router.get('/console/delete', Files.API['/console/delete'])
}

const AppPost = (router)=>{
    router.post('/info/insert', Info.API['/info/insert'])
    router.post('/info/edit', Info.API['/info/edit'])
    router.post('/console/upload', Files.API['/console/upload'])
}

module.exports = {
    ADDROUTES: (router)=>{
        AppGet(router)
        AppPost(router)
        return router.routes()
    },
    LIST: {
        Home: Home.LIST,
        Info: Info.LIST,
        Files: Files.LIST,
        Send: Send.LIST,
    },
}

