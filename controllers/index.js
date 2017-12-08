v_index = async(ctx, next)=>{
    console.log(`Index on running...`)
    ctx.response.body = `<h1>Hello</h1>`
}

module.exports = {
    'GET /' : v_index
}