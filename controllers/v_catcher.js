const fs = require('fs')
const Formparser = require('co-busboy')
const path = require('path')
const Koa = require('koa')

/*v_insert = async(ctx, next) => {
    
    if(1){console.log('On insert...')
        v_upload(ctx)
    }else{
        await next()
    }
}

function *v_upload(ctx){console.log(ctx.request.hostip)
    const parts = Formparser(ctx.request)
    
    let f_Name = []
    let part
    while(part = yield parts){
        let f_name = part.filename
        f_Name.push(f_name)
        let v_dir = path.resolve(__dirname,'..')
        let final_path = v_dir + '/static/' + f_name
        //console.log(final_path)
        const w_stream = fs.createWriteStream(final_path)
        part.pipe(w_stream)
    }
    if(f_Name.length){
        console.log('Files:',f_Name)
        ctx.response.set({
            'Status' : 'Succsess'
        })
    }
}*/

module.exports = {
    'POST /insert' : function *(cxt,next){
        console.log('On insert...')
        const parts = Formparser(ctx.request)
        
        let f_Name = []
        let part
        while(part = yield parts){
            let f_name = part.filename
            f_Name.push(f_name)
            let v_dir = path.resolve(__dirname,'..')
            let final_path = v_dir + '/static/' + f_name
            //console.log(final_path)
            const w_stream = fs.createWriteStream(final_path)
            part.pipe(w_stream)
        }
        if(f_Name.length){
            console.log('Files:',f_Name)
            ctx.response.set({
                'Status' : 'Succsess'
            })
        }
    }
}