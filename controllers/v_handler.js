const path = require('path')
const fs = require('fs')

//..........................................//
const db_filelist = () =>{                  //
    return new Promise((resolve, reject)=>{ //
        resolve('...')                      //
    })                                      //
}                                           //
const db_filesearch = (id) =>{              //
    return new Promise((resolve, reject)=>{ //
        const v_info = {                    //
            'directory' : ''                //
        }                                   //
        resolve(v_info)                     //
    })                                      //
}                                           //
const db_filewriter = (info) =>{            //
    return new Promise((resolve,reject)=>{  //
        resolve(1)                          //
    })                                      //We need some database handles.
}                                           //I need to know it's myQSL or others.(I'm just kidding)
//..........................................//emmmmm...
v_list = async(ctx, next)=>{
    const v_files = await db_filelist()
    ctx.res.type = 'text/plain'
    ctx.body = v_files
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
    const v_info = await db_filesearch(v_grabber.id)
    try{
        let un_flag
        fs.unlink(v_info.directory, (err)=>{
            un_flag = err
        })
        if(un_flag)throw(un_flag)
        ctx.response.status = 200
        ctx.response.set({
            'status' : 1
        })
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
        'status' : w_status
    })
}

module.exports = {
    'GET /list' : v_list,
    'POST /insert' : v_insert,
    'POST /delete' : v_delete,
    'POST /edit' : v_edit
}