const os = require('os')
const path = require('path')
const fs = require('fs')
const serverconfig = require('../configs/serverconfig')
const mime = require('../configs/MIME').type 
//--------------------------------------------------------
//Universal handles adder
//1.GET /
//2.GET /list
//3.POST /insert
//4.POST /edit
//5.POST /delete 
//---------------------------------------------------------
addHandles = (router, handles) => {
    for (let url in handles) {
        if (url.startsWith('GET ')) {
            let path = url.substring(4)
            router.get(path, handles[url])
            console.log(`register URL handles: GET ${path}`)
        } else if (url.startsWith('POST ')) {
            let path = url.substring(5)
            router.post(path, handles[url])
            console.log(`register URL handles: POST ${path}`)
        } else if (url.startsWith('PUT ')) {
            let path = url.substring(4)
            router.put(path, handles[url])
            console.log(`register URL handles: PUT ${path}`)
        } else if (url.startsWith('DELETE ')) {
            let path = url.substring(7)
            router.del(path, handles[url])
            console.log(`register URL handles: DELETE ${path}`)
        } else {
            console.log(`invalid URL: ${url}`)
        }
    }
}

addControllers = (router, c_dir) => {
    fs.readdirSync(__dirname + '/' + c_dir).filter((f) => {
        return f.endsWith('.js')
    }).forEach((f) => {
        let handles = require(__dirname + '/' + c_dir + '/' + f)
        addHandles(router, handles)
    })
}

addstaticr = (router) =>{
    console.log(`register URL handles: GET /console/...`)
    router.get('/index.html',async(ctx,next)=>{
    const s_path = path.resolve(__dirname,'..') + '/' + ctx.request.url.substring(1)
    console.log(s_path)
    const file = fs.readFileSync(s_path)
    const extnames = path.extname(s_path)
    ctx.body = file
    ctx.type = mime[extnames]
    ctx.status = 200
    })
    router.get('/static/js/:id',async(ctx,next)=>{
        const s_path = path.resolve(__dirname,'..') + '/' + ctx.request.url.substring(1)
        console.log(s_path)
        const file = fs.readFileSync(s_path)
        const extnames = path.extname(s_path)
        ctx.body = file
        ctx.type = mime[extnames]
        ctx.status = 200
    })
    router.get('/static/css/:id',async(ctx,next)=>{
        const s_path = path.resolve(__dirname,'..') + '/' + ctx.request.url.substring(1)
        console.log(s_path)
        const file = fs.readFileSync(s_path)
        const extnames = path.extname(s_path)
        ctx.body = file
        ctx.type = mime[extnames]
        ctx.status = 200
    })
}

//All right we now have a exported ...
module.exports = function (dir) {
    let c_dir = dir || ''
    let  router = require('koa-router')()
    addstaticr(router)
    addControllers(router, c_dir)
    return router.routes()
};