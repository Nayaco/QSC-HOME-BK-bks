'use strict'

const MySQL = require('../lib/grabber')
const AppConfig = require('../configs/App.config')
const pool = new MySQL(AppConfig.MysqlConfig)
const Fieldc = require('./util/fieldscheck').FieldsCheck
const UdorNl=  require('./util/fieldscheck').UdorNl
const fieldc = new Fieldc(AppConfig.FeildsConfig) 

/*
 * insert an object from db
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
        const poolRes = await pool.linsertdata(AppConfig.Table1, Info)
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

/*
 * delete an object from db
 * @ query :
 *   {
 *     id : string[should be a legal ID]
 *   }
 * @ return :
 *   {
 *     status : string
 *   }
 */
const Delete = (ctx, next)=>{
    const id = ctx.request.query.id
    let Res = {status: ''}
    const Info = await pool.lgetdatabyID(AppConfig.Table1, 'id', 'id', id)
    if(Info[data].length == 0){
        Res = 'No Such Object'
        ctx.body = JSON.stringify(Res)
        ctx.status = 200
        return
    }
    try{
        const poolRes = await pool.ldeletedata(AppConfig.Table1, 'id', id)
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

/*
 * edit an object from db
 * @ param :
 *   {
 *     info : object[should be legal as what i said in md(PS:should have a legal ID)]
 *   }
 * @ return :
 *   {
 *     status : string       
 *   }
 */
const Edit = (ctx, next)=>{
    const {fields, files} = ctx.request.body
    const keys = Object.keys(fields)
    let Res = {status: ''}
    /// chack if there's an ID
    if(UdorNl(fields['id'])){
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
    const CheckInfo = await pool.lgetdatabyID(AppConfig.Table1, 'id', 'id', id)
    if(CheckInfo[data].length == 0){
        Res = 'No Such Object'
        ctx.body = JSON.stringify(Res)
        ctx.status = 200
        return
    }

    try{
        const poolRes = await pool.lupdate(AppConfig.Table1, 'id', Info.id, Info)
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


const GetID = async(ctx, next) =>{
    try{
        const CheckID = await pool.lgetdatabyID(AppConfig.Table2, 'id', 'id', id)
        const IDList = CheckID['data']
    }catch(err){
        throw {
            status: 200,
            err: err, 
        }
    }
}
const SetID = async(ctx, next) =>{
    const FileName = ctx.query.file
    const id = ctx.query.id
    let Res = {status: ''} 
    if(UdorNl(FileName) || UdorNl(id)){
        Res.status = 'Should Have ID And Filename'
        ctx.body = JSON.stringify(Res)
        ctx.status = 200
        return
    }
    try{
        const CheckID = await pool.lgetdatabyID(AppConfig.Table2, 'id', 'id', id)
        const CheckFN = await pool.lgetdatabyID(AppConfig.Table2, 'file', 'file', FileName)
        if(CheckID['data'].length != 0 && CheckFN['data'].length != 0){
            Res.status = 'Exist'
            ctx.body = JSON.stringify(Res)
            ctx.status = 200
            return
        }
        pool.linsertdata(AppConfig.Table2, {id: id, file: FileName, downloads: 0})
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
        '/info/edit': Edit,
        '/info/setid': SetID,
    },
    LIST: {
        Insert: 'POST /info/insert',
        Delete: 'GET /info/delete',
        Edit: 'POST /info/edit',
        SetID: 'GET /info/setid',
    },
}