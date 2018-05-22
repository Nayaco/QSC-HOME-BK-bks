/*..........................................
//Video admin backend (almost finished)
//Video user backend (unfinished) 
...........................................*/
const Koa = require('koa')
const koaBody = require('koa-body')
const parser = require('koa-bodyparser')
const router = require('koa-router')()
const session = require('koa-session-minimal')
const Mysqlstorage = require('koa-mysql-session')
const dbconfig = require('./configs/dbconfig')
const controller = require('./controllers/index')
const serverconfig = require('./configs/serverconfig')
const list = require('./configs/requestlist')
const v_server = new Koa()

//Mysqlsession config
const Mysqlconfig = {
    user: dbconfig.user,
    password: dbconfig.password,
    database: dbconfig.database,
    host: dbconfig.host
}

v_server.use(async(ctx,next) => {  
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)  
    let start = new Date().getTime()
    let execTime   
    await next()
    execTime = new Date().getTime() - start   
    ctx.response.set('X-Response-Time', `${execTime}ms`)
})
v_server.use(async(ctx,next) => {
    try {
        await next();
    }catch(err){
        ctx.response.status = err.statusCode || err.status || 500
        ctx.response.body = {
          message: err.message
        };
    }
})
/*v_server.use(session({
    key : 'USER_SID',
    store: new Mysqlstorage(Mysqlconfig)
}))*/
v_server.use(async(ctx, next)=>{
    ctx.set('Access-Control-Allow-Origin', '*') 
    await next()
})
v_server.use(koaBody({multipart: true, formLimit: 5*1024}))
v_server.use(parser())
v_server.use(controller())

v_server.listen(serverconfig.port)
console.log(`Port ${serverconfig.port} on listening`)
///................................................................
///Gangdou create a basic server with koa
///'GET /list'works and I finish the appendupload of 'POST /insert'.
///The 'breakpoint' still undinished
///.................GD201712090128................................
///Gangdou abandon the koa-multer for that it's ridiculous, i rewrite  
///the '/insert' by koa-body 
///We need database API
///.................GD201712092137................................
///Gnagdou made a better work uploader by 'koa-body' + 'fs' 
///.................GD201712101759................................
///Gangdou fix some bugs
///.................GD201712102139................................