const fspr = require('fs-promise')
const path = require('path')
const fs = require('fs')
const serverconfig = require('../lib/serverconfig')
const crypto = require('crypto')

//This is a video uploader

const f_write = (path1, path2, tag) =>{
    return new Promise((resolve,reject)=>{
        const hash = crypto.createHash('md5')
        const v_sourse = fs.createReadStream(path1)
        const v_writer = fs.createWriteStream(path2,{'flags':'a'})
        v_sourse.pipe(v_writer)
        v_sourse.on('error',(err)=>{
            throw(err)
        })
        if(tag == 0)v_sourse.on('data',(data)=>{hash.update(data)})
        v_sourse.on('end',()=>{
            resolve(hash)
        })
    })
}

v_upload = async(ctx,next) => {
    const v_info = ctx.request.body.fields
    const tmpdir = serverconfig.document_path
    let f_info
    //const file_list_t = fs.readFileSync(path.join(tmpdir,`filelist.json`),{flag : 'w+'})
    //const file_list = (file_list_t!='')?JSON.parse(file_list_t):{}
    //const name = file.ctx.response.body.files['file'].name
    //const filename = (file_list[name])?file_list[name]:(new Date().toTimeString())
    const filename = ctx.request.body.files['file'].name
    if(v_info.tag == 0){
        if(fs.existsSync(path.join(tmpdir,`${filename}.json`))){
            f_info = JSON.parse(fs.readFileSync(path.join(tmpdir,`${filename}.json`),{'encoding':null,'flag':'r'}))
            if(f_info.isfinish == true)throw({message : 'Twice upload'})
                else{
                    ctx.response.status = 200
                    ctx.body = {
                        'breakpoint' : f_info.tag
                    }
                    return
                }
        }
        else{
            fs.writeFileSync(path.join(tmpdir,`${filename}.json`),JSON.stringify({'tag':0,'isfinish':false}),'utf-8')
            f_info = JSON.parse(fs.readFileSync(path.join(tmpdir,`${filename}.json`),{'encoding':null,'flag':'r'}))
        }
    }
    
    if(v_info.tag > f_info.tag + 1){
        throw({message : 'File Losted'})
    }

    const file = ctx.request.body.files['file'] || {}
    const sizer = file.size
    const filePath = v_info.tag == 0?path.join(tmpdir,filename):path.join(tmpdir,)
    
    const hash = await f_write(file.path,filePath,v_info.tag)
    //console.log(hash.digest('hex'))

    if(!filePath){
        throw({message : 'No file'})
    }
    else{
        ctx.response.status = 200
        ctx.response.set({
            'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept',
            'Access-Control-Allow-Origin' : '*',
            'Cache-Control' : 'no-store, no-cache, must-revalidate'
        })
        ctx.body = {
                'status' : 1
        }
        const j_info = {
            tag : f_info.tag + 1
        }
        if(sizer < 5*1024*1024){
            j_info['isfinish'] = true
        }else{
            j_info['isfinish'] = false
        }
        fs.writeFileSync(path.join(tmpdir,`${filename}.json`),JSON.stringify(j_info),'utf-8')
    }
}

module.exports = {
    'POST /console/upload' : v_upload
}