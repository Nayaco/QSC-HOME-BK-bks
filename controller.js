const os = require('os')
const path = require('path')
const fs = require('fs')
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

function addControllers(router, c_dir) {
    fs.readdirSync(__dirname + '/' + c_dir).filter((f) => {
        return f.endsWith('.js')
    }).forEach((f) => {
        console.log(`process controller: ${f}...`)
        let handles = require(__dirname + '/' + c_dir + '/' + f)
        addHandles(router, handles)
    });
}

//I need a isolated uploader listener,though I don't know why.
let counter = {}
function addUploader(router){
    router.post('/upload',async (ctx,next) => {
        const v_info = ctx.request.body.fields
        let sizer = 0
        try{
            if(v_info.tag > counter[v_info.id] + 1)throw('File Losted')
            const tmpdir = __dirname + '\\documents\\'
            const filePaths = []
            const files = ctx.request.body.files || {}
            for (let key in files) {
                const file = files[key]
                sizer += file.size
                const filePath = tmpdir + file.name
                const v_sourse = fs.createReadStream(file.path)
                const v_writer = fs.createWriteStream(filePath,{'flags':'a'})
                v_sourse.pipe(v_writer)
                filePaths.push(filePath)
            }
            if(!filePaths.length)throw('File Break')
            ctx.response.status = 200
            ctx.response.set({
                'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept',
                'Access-Control-Allow-Origin' : '*',
                'Cache-Control' : 'no-store, no-cache, must-revalidate',
                'status' : 1
            })
            if(counter[v_info.id] === undefined)counter[v_info.id] = 1
                else counter[v_info.id] ++
            if(sizer < 5*1024*1024){
                delete(counter[v_info.id])
                ctx.body = 'Trans Finished'
            }
        }catch(err){
            delete(counter[v_info.id])
            ctx.response.status = 400
            ctx.response.set({
                'status' : 0
            })
            ctx.body = {
                'Errmessage' : err
            }
        }
    })
}
//All right we now have a exported ...
module.exports = function (dir) {
    let c_dir = dir ||
     'controllers'
    let  router = require('koa-router')()
    addControllers(router, c_dir)
    addUploader(router)
    return router.routes()
};