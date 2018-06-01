'use strict'

const path = require('path')
const fs = require('fs-extra')
const AppConfig = require('../configs/App.config')
const Crypto = require('crypto')
const Objery = require('./util/objery')

const WriteF = async(file, filePath) =>{
    return new Promise((resolve,reject) =>{
        const Hash = Crypto.createHash('md5')
        const Sourse = fs.createReadStream(file)
        const Dst = fs.createWriteStream(filePath, {flags: 'a'})
        Sourse.pipe(Dst)
        .on('data', (data)=>{Hash.update(data)})
        .on('error', (err)=>{reject(err)})
        .on('end', ()=>{resolve(Hash.digest('hex'))})
    })
}


/* 
 * Recieve the uploaded file
 * @ param :
 * {
 *   tag: number,
 *   complete: bool,
 *   file: file,
 * }
 * @ return :
 * {
 *   status: string,
 *   tag[when break]: number,
 * }
 */
const Upload = async(ctx, next) =>{
    const {fields, files} = ctx.request.body
    const Dir = AppConfig.AssetPath
    const FileName = files['file'].name
    const InfoPath = path.join(Dir, `${FileName}.json`),
          FilePath = path.join(Dir, `${FileName}`),
          GnfoPath = path.join(Dir, `Gnfo.json`)

    let   Info = (await fs.pathExists(InfoPath))?(await fs.readJson(InfoPath)):({tag: 0, complete: false, hash: ''})
    let   Fnfo = (await fs.pathExists(GnfoPath))?(await fs.readJson(GnfoPath)):({})
    let   Lnfo = Object.keys(Fnfo)
    let   Gnfo = Objery.O2A(Fnfo)
    let   Res =  {status: ''}
    /// fileExist => {'Exist'}
    if(Info.complete == true){
        Res.status = 'Exist'
        ctx.body = JSON.stringify(Res)
        ctx.status = 200
        return
    }
    /// Transmission Breaked => {'Breaked', Last-Tag}
    if(Info.tag >= fields.tag && Info.tag > 0){
        Res = Object.assign(Res, {status: 'Breaked',tag: Info.tag})
        ctx.body = JSON.stringify(Res)
        ctx.status = 200
        return
    }

    /// Transmission
    try{
        const Hash = await WriteF(files['file'], FilePath)
        if(fields.tag == 0){
    /// fileHashExist => {'Exist'} 
            if(Gnfo.includes(Hash)){
                fs.unlink(FilePath)
                Res.status = 'Exist'
                ctx.body = JSON.stringify(Res)
                ctx.status = 200
                return
            }
            Lnfo.push(FileName)
            Gnfo.push(Hash)
            const NewFnfo = Objery.A2O2(Lnfo ,Gnfo)
            fs.writeJson(NewGnfo, GnfoPath)
        }
        Info.tag = fields.tag
        Info.complete = fields.complete
        fs.writeJson(Info, InfoPath)
        Res.status = 'Okay'
        ctx.body = JSON.stringify(Res)
        ctx.status = 200
    }catch(err){
    /// Transmission Failed => {'Error'}
        Res.status = 'Error'
        ctx.body = JSON.stringify(Res)
        ctx.status = 200
        return
    }
    return
}


/* 
 * List files
 * @ return :
 * {
 *   0: string
 *   1: string
 *   ...(filelist)
 * }
 */
const List = async(ctx, next) =>{
    const Dir = AppConfig.AssetPath
    const GnfoPath = path.join(Dir, `Gnfo.json`)
    
    let   Fnfo = (await fs.pathExists(GnfoPath))?(await fs.readJson(GnfoPath)):({})
    let   Lnfo = Object.keys(Fnfo)
    const NewGnfo = Objery.A2O(Lnfo)
    ctx.body = JSON.stringify(NewGnfo)
    ctx.status = 200
    return
}

/* 
 * Delete the file
 * @ query : 
 *   name = string
 * @ return :
 * {
 *   status: string,
 * }
 */
const Delete = async(ctx, next) =>{
    const FileName = ctx.request.query.name
    const Dir = AppConfig.AssetPath
    const InfoPath = path.join(Dir, `${FileName}.json`),
          FilePath = path.join(Dir, `${FileName}`),
          GnfoPath = path.join(Dir, `Gnfo.json`)
    let   Fnfo = (await fs.pathExists(GnfoPath))?(await fs.readJson(GnfoPath)):({})
    let   Lnfo = Object.keys(Fnfo)
    let   Gnfo = Objery.O2A(Fnfo) 

    let Res = {status: ''}
    if(Lnfo.includes(FileName)){
        Res.status = 'Not Exist'
        ctx.body = JSON.stringify(Res)
        ctx.status = 200
        return
    }
    fs.unlink(FilePath)
    fs.unlink(InfoPath)
    let   index = Lnfo.indexOf(FileName)
    Lnfo.splice(index, 1)
    Gnfo.splice(index, 1)
    const NewGnfo = Objery.A2O2(Lnfo ,Gnfo)
    fs.writeFile(NewGnfo, GnfoPath)
    Res.status = 'Okay'
    ctx.body = JSON.stringify(Res)
    ctx.status = 200
    return
}

module.exports = {
    API: {
        '/console/upload': Upload,
        '/console/list': List,
        '/console/delete': Delete,
    },
    LIST: {
        Upload: 'POST /console/upload',
        List: 'GET /console/list',
        Delete: 'GET /console/delete',
    },
}
