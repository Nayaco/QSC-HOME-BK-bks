const path = require('path')

v_index = async(ctx, next)=>{
    console.log(`Index on running...`)
    ctx.response.body = `<h1>Hello</ h1>`
}

//Haven't started yet. Luobeng will handle that.(Evil smile)//

module.exports = {
    'GET /' : v_index
}