const path = require('path')
const fs = require('fs')
const db = require('../lib/dbhandler')

const table = ''

const local_filelist = (v_path) =>{                          
    return new Promise((resolve, reject)=>{                            
        fs.readdir(v_path,(err,files)=>{            
            if(err){                                
                return reject(err)                  
            }                                       
            else{                                   
                resolve(files)                    
            }                                       
        })                                          
    })                                              
}

const local_delete = (v_path) =>{
    return new Promise((resolve,reject)=>{
        fs.unlink(v_path, (err)=>{
            if(err)reject(err)
            else resolve() 
        })
    })
}
v_list = async(ctx, next)=>{
    const v_files = await db.db_filelist()
    ctx.res.type = 'text/plain'
    ctx.body = 'aaaaaa'
}

v_insert = async(ctx, next)=>{
    console.log(`Insert on running...`)
    const v_grabber = ctx.request.body.fields
    const v_info = {
        'id' : v_grabber.id,
        'title' : v_grabber.title,
        'description' : v_grabber.description,
        'author' : v_grabber.author,
        'date' : v_grabber.date,
        'directory' : v_grabber.directory,
        'file' : v_grabber.file,
        'view' : 0
    }
    ctx.response.status = 200
    ctx.response.body = {
        'status' : 1
    }
}

v_delete = async(ctx, next)=>{
    const v_grabber = ctx.request.body.fields
    //const v_info = await db.filesearch(table, v_grabber.name)
    v_info = {
        directory : 'documents\\T.png'
    }
    try{
        const un_flag = await local_delete(v_info.directory)
        if(un_flag)throw(err)
        else{
            ctx.response.status = 200
            ctx.response.set({
                'status' : 1
            })
        }   
    }catch(err){
        ctx.response.status = 404
        ctx.response.set({
            'status' : 0
        })
    }
}

v_edit = async(ctx, next)=>{
    const v_grabber = ctx.request.body.field
    const v_info = {
        'id' : v_grabber.id,
        'title' : v_grabber.title,
        'description' : v_grabber.description,
        'author' : v_grabber.author,
        'date' : v_grabber.date
    }
    const w_status = await db_filewriter(v_info)
    ctx.response.status = 200
    ctx.response.set({
        'status' : w_statusk
    })
}

module.exports = {
    'GET /list' : v_list,
    'POST /insert' : v_insert,
    'POST /delete' : v_delete,
    'POST /edit' : v_edit
}