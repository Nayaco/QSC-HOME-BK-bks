'use strict'

const fs = require('fs-extra')
const AppConfig = require('../configs/App.config')
const MySQL = require('../lib/grabber')
const UdorNl=  require('./util/fieldscheck').UdorNl
const pool = new MySQL(AppConfig.MysqlConfig)

const Dowload = async(ctx, next) =>{
    const id = ctx.params.id
    let Err = {status: ''}
    if(id === undefined || id === null){
        Err = 'Should Have an ID'
        ctx.body = JSON.stringify(Err)
        ctx.status = 200
        return
    }  
     
}


module.exports = {
    API: {
    },
    LIST: {
    },
}