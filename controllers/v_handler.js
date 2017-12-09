const path = require('path')
const fs = require('fs')

const v_filesr = () =>{
    return new Promise((resolve, reject)=>{
        resolve('...')
    })
}
v_list = async(ctx, next)=>{
    const v_files = await v_filesr()
    ctx.res.type = 'text/plain'
    ctx.body = v_files
}

v_insert = async(ctx, next)=>{
    console.log(`Insert on running...`)
    v_info = {
        'id' : ctx.request.header['id'],
        'title' : ctx.request.header['title'],
        'description' : ctx.request.header['description'],
        'author' : ctx.request.header['author'],
        'date' : ctx.request.header['date'],
        'directory' : ctx.request.header['directory'],
        'file' : ctx.request.header['file'],
        'view' : 0
    }
}

const db_requster = (id) =>{
    return new Promise((resolve, reject)=>{
        resolve('...')
    })
}
v_delete = async(ctx, next)=>{
    const v_info = await db_requster(ctx.request.header['id'])
    try{
        fs.unlink(v_info[],(err)=>{
            throw err
        })
        ctx.response.set({
            'status' : 1
        })
    }catch(err){
        ctx.response.set({
            'status' : 0
        })
    }
}

v_edit = async(ctx, next)=>{
    v_info = {
        'id' : ctx.request.header['id'],
        'title' : ctx.request.header['title'],
        'description' : ctx.request.header['description'],
        'author' : ctx.request.header['author'],
        'date' : ctx.request.header['date'],
    }
}

module.exports = {
    'GET /list' : v_list,
    'POST /insert' : v_insert,
    'POST /delete' : v_delete,
    'POST /edit' : v_edit
}