const path = require('path')
v_index = async(ctx, next)=>{
    console.log(`Index on running...`)
    ctx.response.body = `<h1>Hello</h1>`
}//Haven't started yet

const v_filesr = (v_path) =>{
    return new Promise((resolve, reject)=>{
        const fs = require('fs')
        fs.readdir(v_path,(err,files)=>{
            if(err)return reject(err)
            else resolve(files)
        })
    })
}

v_list = async(ctx, next)=>{
    const v_path = path.resolve(__dirname,'..') + '/static'
    const v_files = await v_filesr(v_path)
    ctx.res.type = 'text/plain'
    ctx.body = v_files.toString()
}
module.exports = {
    'GET /' : v_index,
    'GET /list' : v_list
}