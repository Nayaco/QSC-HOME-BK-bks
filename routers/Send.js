'use strict'

const fs = require('fs-extra')
const AppConfig = require('../configs/App.config')
const MySQL = require('../lib/grabber')
const pool = new MySQL(AppConfig.MysqlConfig)

const Dowload = async(ctx, next) =>{
    const id = ctx.request.query.id
    let Err = {status: ''}
    if(id === undefined || id === null){
        Err = 'Should Have an ID'
        ctx.body = JSON.stringify(Err)
        ctx.status = 200
        return
    }  
    const Filename =   
    if()
    const File = await fs.readFile(AppConfig.) 
}


module.exports = {
    API: {
    },
    LIST: {
    },
}