const fs = require('fs')
const path = require('path')

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

function addUploader(router){
    console.log(`register URL handles: POST /insert`)
    const multer = require('koa-multer')
    const MyCustomStorage = require('./UploadMode')
    let storage = MyCustomStorage({
        destination:function (req,file,cb) {
            let final_path = __dirname + '\\static\\' 
            console.log(final_path)
            cb(null,final_path)  
        },
        filename:function (req,file,cb){
            let fileFormat = (file.originalname).split(".")
            cb(null,fileFormat[0] + "." + fileFormat[fileFormat.length - 1])
        }
    })
    let upload = multer({storage:storage})
    router.post('/insert',upload.single('file'),async (ctx,next) => {  
        ctx.response.body ='<h1>SUCCED</h1>'
    })
}

module.exports = function (dir) {
    let c_dir = dir || 'controllers'
    let  router = require('koa-router')()
    addControllers(router, c_dir)
    addUploader(router)
    return router.routes()
};