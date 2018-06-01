'use strict'

const MySQL = require('../lib/grabber')
const AppConfig = require('../configs/App.config')
const pool = new MySQL(AppConfig.MysqlConfig)
const Fieldc = require('./util/fieldscheck').FieldsCheck
const fieldc = new Fieldc(AppConfig.FeildsConfig) 

/*
 * insert an object
 * @ param :
 *   {
 *     info : object[should be legal as what i said in md]
 *   }
 * @ return :
 *   {
 *     status : string       
 *   }
 */
const Insert = async(ctx, next) =>{
    const {fields, files} = ctx.request.body
    let Res = {status: ''}
    if(fieldc.check(fields) === false){
        Res.status = 'Lack Fields'
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
        Res = 'No Such Object'
        ctx.body = JSON.stringify(Res)
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
    const keys = Object.keys(fields)
    let Res = {status: ''}
    /// chack if there's an ID
    if(fields['id'] === undefined || fields['id'] === null){
        Res = 'Should Have An ID'
        ctx.body = JSON.stringify(Res)
        ctx.status = 200
        return 
    }
    
    const Info = keys.reduce((res, item, index)=>{
        res[item] = fields[item]
        return res
    }, {})
    /// check if id is legal
    const CheckInfo = await pool.lgetdatabyID(AppConfig.Table, 'id', 'id', id)
    if(CheckInfo[data].length == 0){
        Res = 'No Such Object'
        ctx.body = JSON.stringify(Res)
        ctx.status = 200
        return
    }

    try{
        const poolRes = await pool.lupdate(AppConfig.Table, 'id', Info.id, Info)
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