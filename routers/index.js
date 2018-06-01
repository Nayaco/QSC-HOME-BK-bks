'use strict'


const AppGet = (router)=>{
}

const AppPost = (router)=>{
}


module.exports = {
    ADDROUTES: (router)=>{
        AppGet(router)
        AppPost(router)
        return router.routes()
    },
    LIST: {
        
    },
}

