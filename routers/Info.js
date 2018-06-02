'use strict'

const path = require('path')
const MySQL = require('../lib/grabber')
const AllowType = require('../configs/MediaList')
const AppConfig = require('../configs/App.config')
const pool = new MySQL(AppConfig.MysqlConfig, AppConfig.Reg)
const Objery = require('./util/objery')
const Fieldc = require('./util/fieldscheck').FieldsCheck
const UdorNl=  require('./util/fieldscheck').UdorNl
const fieldc = new Fieldc(AppConfig.FeildsConfig.Fields) 
const AllowTypes = Objery.O2A(AllowType)

/*
 * insert an object from db
 * @param
 *   {
 *     info : object[should be legal as what i said in md]
 *   }
 * @return
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
    
    ///get an ID
    const FileName = fields.file
    const IDList = await pool.lgetdata(AppConfig.Table1, 'id')
    let id = -1
    for(let i = 0; i < IDList.length; i++)id = Math.max(id, IDList[i].id)
    id++

    ///Check if filename exists
    const CheckFN = await pool.lgetdatabyID(AppConfig.Table1, 'file', 'file', FileName)
    if(CheckFN.length != 0){
        Res.status = 'Exists'
        ctx.body = JSON.stringify(Res)
        ctx.status = 200
        return
    }

    ///Check if file allowed
    if(!AllowTypes.includes(path.extname(FileName))){
        Res.status = 'File Not Allow'
        ctx.body = JSON.stringify(Res)
        ctx.status = 200
        return
    } 
    //. handle the infomation
    const Info = {
        id: id,
        name: fields['name'],
        file: fields['file'],
        author: fields['author'],
        time: fields['time'],
        des: fields['des'] || '',
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
 * @param
 *   {
 *     id : string[should be a legal ID]
 *   }
 * @return
 *   {
 *     status : string
 *   }
 */
const Delete = async(ctx, next)=>{
    const id = ctx.request.query.id
    let Res = {status: ''}
    const Info = await pool.lgetdatabyID(AppConfig.Table1, 'id', 'id', id)
    if(Info.length === 0){
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
 * get an object from db
 * @param
 *   {
 *     id : string[should be a legal ID]
 *   }
 * @return
 *   {
 *     status : string
 *   }
 */
const GetInfo = async(ctx, next)=>{
    const id = ctx.request.query.id
    let Res = {status: ''}
    try{
        const Info = await pool.lgetdatabyID(AppConfig.Table1, '*', 'id', id)
        if(Info.length === 0){
            Res = 'No Such Object'
            ctx.body = JSON.stringify(Res)
            ctx.status = 200
            return
        }
        const Temp = Info[0]
        const NewInfo = {
            id: id,
            name: Temp.name,
            file: Temp.file,
            author: Temp.author,
            des: Temp.des,
        }
        ctx.body = JSON.stringify(NewInfo)
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
 * @param
 *   {
 *     info : object[should be legal as what i said in md(PS:should have a legal ID)]
 *   }
 * @return
 *   {
 *     status : string       
 *   }
 */
const Edit = async(ctx, next)=>{
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

    const id = Info['id']
    /// check if id is legal
    const CheckInfo = await pool.lgetdatabyID(AppConfig.Table1, 'id', 'id', id)
    if(CheckInfo.length == 0){
        Res = 'No Such Object'
        ctx.body = JSON.stringify(Res)
        ctx.status = 200
        return
    }
    /// check if filename is legal
    if(!UdorNl(fields['file'])){
        if(!AllowTypes.includes(path.extname(fields['file']))){
            Res.status = 'File Not Allow'
            ctx.body = JSON.stringify(Res)
            ctx.status = 200
            return
        }
    }
    /// handle change
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

module.exports = {
    API: {
        '/info/insert': Insert,
        '/info/delete': Delete, 
        '/info/edit': Edit,
        '/info/get': GetInfo
    },
    LIST: {
        Insert: 'POST /info/insert',
        Delete: 'GET /info/delete',
        Edit: 'POST /info/edit',
        GetInfo: 'GET /info/edit',
    },
}