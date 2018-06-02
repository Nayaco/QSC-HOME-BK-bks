'use strict'

const fs = require('fs-extra')
const Send = require('koa-send')
const path = require('path')
const AppConfig = require('../configs/App.config')
const MySQL = require('../lib/grabber')
const UdorNl=  require('./util/fieldscheck').UdorNl
const pool = new MySQL(AppConfig.MysqlConfig)
const MIME = require('../configs/MIME')

const Dowload = async(ctx, next) =>{
    const id = ctx.params.id
    let Err = {status: ''}
    if(id === undefined || id === null){
        Err = 'Should Have an ID'
        ctx.body = JSON.stringify(Err)
        ctx.status = 200
        return
    }
    let FileName = ''
    let FilePath = ''
    try{
        const FileLists = await pool.lgetdatabyID(AppConfig.Table1, 'file', 'id', id)
        if(FileLists.length == 0){
            Err = 'No Such ID'
            ctx.body = JSON.stringify(Err)
            ctx.status = 200
            return
        }
        FileName = FileLists[0].file
        FilePath = path.join(AppConfig.AssetPath, FileName)

        let GnfoPath = path.join(AppConfig.AssetPath, 'Gnfo.json')
        let Fnfo = await fs.readJson(GnfoPath)
        let Lnfo = Object.keys(Fnfo)
        if(!Lnfo.includes(FileName)){
            Err = 'No Such ID'
            ctx.body = JSON.stringify(Err)
            ctx.status = 200
            return
        }
    }catch(err){
        throw {
            status: 200,
            err: err, 
        }
    }

    ctx.res.setHeader('Content-Type', MIME[path.extname(FileName)])
    await Send(ctx, FilePath)
    return
     
}


module.exports = {
    API: {
        '/apiv1/:id': Dowload,
    },
    LIST: {
        Download: 'GET /apiv1/:id'
    },
}