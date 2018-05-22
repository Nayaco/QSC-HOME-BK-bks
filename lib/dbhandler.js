const config = require('../configs/dbconfig')
const sql = require('./sqlhandler')
const pool = new sql(config)

const db_filelist = (id) =>{
    return new Promise((resolve,reject)=>{          
        resolve(1)
    })
}
const db_filesearch = (name) =>{
    return new Promise((resolve,reject)=>{          
        resolve(1)
    })
}                                                   
const db_filewriter = (info) =>{                    
    return new Promise((resolve,reject)=>{          
        resolve(1)
    })                                              
}
const db_getinfobyid = (id) =>{
    return new Promise((resolve,reject)=>{          
        resolve(1)
    })
}
const db_filedelete = (id) =>{
    return new Promise((resolve,reject)=>{
        resolve(1)
    })
}

exports.db_filelist = db_filelist
exports.db_filesearch = db_filesearch
exports.db_filewriter = db_filewriter
exports.db_filedelete = db_filedelete
exports.db_getinfobyid = db_getinfobyid