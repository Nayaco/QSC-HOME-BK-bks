const path = require('path')
const fs = require('fs')
const s_path = require('../serverconfig').static
const mime = require('../lib/MIME')

v_index = async(ctx, next)=>{
    console.log(`Index on running...`)
    try{
        const s_file = fs.readFileSync(s_path + '\\index.html')
        ctx.body = s_file
        ctx.response.type = 'text/html'
        ctx.response.status = 200
    }catch(err){
        ctx.response.body = `<h1>No such file</h1>`
    }
}

//Haven't started yet. Luobeng will handle that.(Evil smile)//

module.exports = {
    'GET /' : v_index
}