const Koa = require('koa')
const parser = require('koa-bodyparser')
const router = require('koa-router')()
const controller = require('./controller')
const koaBody = require('koa-body')
const v_server = new Koa()

v_server.use(async(ctx,next) => {  
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)  
    let start = new Date().getTime()
    let execTime   
    await next()
    execTime = new Date().getTime() - start   
    ctx.response.set('X-Response-Time', `${execTime}ms`)
})

v_server.use(koaBody({ multipart: true }))
v_server.use(parser())
v_server.use(controller())

v_server.listen(8080)

///................................................................
///Gangdou create a basic server with koa
///'GET /list'works and I finish the appendupload of 'POST /insert'.
///The 'breakpoint' still undinished
///.................GD201712090128................................
///Gangdou abandon the koa-multer for that it's ridiculous, i rewrite  
///the '/insert' by koa-body 
///.................GD201712092137................................