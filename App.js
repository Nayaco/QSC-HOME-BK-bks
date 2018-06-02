'use strict'

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const KoaRouter = require('koa-router')()
const session = require('koa-session-minimal')
const Routers = require('./routers/index').ADDROUTES
const AppConfig = require('./configs/App.config')
const koaBody = require('koa-body')
const koaStatic = require('koa-static')

const App = new Koa()

App.use(async(ctx, next)=>{
    try{
        console.log(`Processing ${ctx.request.method} ${ctx.request.url}...`)  
        let start = new Date().getTime()
        let execTime
        await next()
        execTime = new Date().getTime() - start   
        ctx.res.setHeader('X-Response-Time', `${execTime}ms`)
        ctx.res.setHeader('Access-Control-Allow-Origin', '*')
    }catch(e){
        console.log(e)
        ctx.res.statusCode = e.statusCode || e.status || 500
        ctx.body = {
            err: 'Some Error Occurs, We Will Fix It Soon'
        }
    }
})

/*v_server.use(session({
    key : 'USER_SID',
    store: new Mysqlstorage(Mysqlconfig)
}))*/

App.use(koaBody({
    multipart: true,
}))
App.use(koaStatic(AppConfig.StaticPath))
App.use(Routers(KoaRouter))

App.listen(AppConfig.ListenPort, ()=>
console.log(`Port ${AppConfig.ListenPort} on listening`))
///................................................................
///Gangdou create a basic server with koa
///'GET /list'works and I finish the appendupload of 'POST /insert'.
///The 'breakpoint' still undinished
///...................201712090128................................
///Gangdou abandon the koa-multer for that it's ridiculous, i rewrite  
///the '/insert' by koa-body 
///We need database API
///...................201712092137................................
///Gnagdou made a better work uploader by 'koa-body' + 'fs' 
///...................201712101759................................
///Gangdou fix some bugs
///.................201712102139................................