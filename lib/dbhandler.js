const mysql = require('mysql2')
const dbconfig = require('./dbconfig')
const dboption = {
    host : dbconfig.host,
    port : dbconfig.port,
    database : dbconfig.database,
    user : dbconfig.user,
    password : dbconfig.password
}
const dbpool = mysql.createPool(dboption)   
const query = () =>{
    dbpool.getConnection((err,connect)=>{
        if(err){
             return{
                'err' : err
             }       
        }else{
            return{
                'data' : 'aaa' 
            }
        }
    })

}

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