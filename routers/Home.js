'use strict'

const Home = async(ctx, next)=>{
    ctx.status = 302
    ctx.redirect('/index.html')
    return
}

module.exports = {
    API: {
        '/': Home,
    },
    LIST: {
        Home: 'GET /',
    },
}