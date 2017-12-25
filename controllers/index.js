v_index = async(ctx, next)=>{
    ctx.status = 301
    ctx.redirect('/console/index.html')
}
favicon = async(ctx, next) => {
    ctx.status = 301
    ctx.redirect('/console/favicon.ico')
}
//Haven't started yet. Luobeng will handle that.(Evil smile)//

module.exports = {
    'GET /' : v_index,
    'GET /favicon' : favicon
}