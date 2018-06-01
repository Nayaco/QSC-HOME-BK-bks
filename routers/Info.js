const path = require('path')

const MySQL = require('../lib/grabber')
const AppConfig = require('../configs/App.config')
const pool = new MySQL(AppConfig.MysqlConfig)
const Fieldc = require('./util/fieldscheck').FieldsCheck
const fieldc = new Fieldc(AppConfig.FeildsConfig) 

const Insert = async(ctx, next) =>{
    const {fields, files} = ctx.request.body
    let Res = {status: ''}
    if(fieldc.check(fields) === false){
        Res.status = 'Lack'
        ctx.body = JSON.stringify(Res)
        ctx.status = 200
        return
    }

    const Info = {
        id: fields.id,
        name: fields.name,
        author: fields.author,
        time: fields.time,
        desc: fields.des || '',
    }
    try{
        const poolRes = await pool.linsertdata(AppConfig.Table, Info)
        Res.status = 'Okay'
        ctx.body = JSON.stringify(Res)
        ctx.status = 200
    }catch(err){
        throw {
            status: 200,
            err: err, 
        }
    }
    return
}

const Delete = (ctx, next)=>{
    const id = ctx.request.query.id
    let Res = {status: ''}
    const Info = await pool.lgetdatabyID(AppConfig.Table, 'id', 'id', id)
    if(Info[data].length == 0){
        Res = 'No Such File'
        ctx.body = Res
        ctx.status = 200
        return
    }
    try{
        const poolRes = await pool.ldeletedata(AppConfig.Table, 'id', id)
        Res.status = 'Okay'
        ctx.body = JSON.stringify(Res)
        ctx.status = 200
    }catch(err){
        throw {
            status: 200,
            err: err, 
        }
    }
    return
}    

const Edit = (ctx, next)=>{
    const {fields, files} = ctx.request.body
    let Res = {status: ''}
    if(fieldc.check(fields) === false){
        Res.status = 'Lack'
        ctx.body = JSON.stringify(Res)
        ctx.status = 200
        return
    }

    const Info = {
        id: fields.id,
        name: fields.name,
        author: fields.author,
        time: fields.time,
        desc: fields.des || '',
    }
    try{
        const poolRes = await pool.lupdate(AppConfig.Table, ,Info)
        Res.status = 'Okay'
        ctx.body = JSON.stringify(Res)
        ctx.status = 200
    }catch(err){
        throw {
            status: 200,
            err: err, 
        }
    }
    return 
}
module.exports = {
    API: {
        '/info/insert': Insert,
        '/info/delete': Delete, 
    },
    LIST: {
        Insert: 'POST /info/insert',
        Delete: 'GET /info/delete',
    },
}