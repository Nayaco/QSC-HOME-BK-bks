'use strict'

const Mysql = require('mysql2/promise')
const AppConfig = require('../configs/App.config')
const Pool = Mysql.createPool(AppConfig.MysqlConfig)
const Table = AppConfig.Table1

const GetIdList = async()=>{
    const Res = await Pool.query('SELECT DISTINCT id FROM ??', Table)
    return Res
}  

const GetFileList = async()=>{
    const Res = await Pool.query('SELECT DISTINCT file FROM ??', Table) 
}

const GetNameList = async()=>{
    const Res = await Pool.query('SELECT DISTINCT name FROM ??', Table) 
}

const GetInfoById = async(id)=>{
    const ID = id
    const Res = await Pool.query(`SELECT DISTINCT * FROM ${Table} WHERE ?`, ID)
}

const InsertData = async(data)=>{
    const Data = Object.keys(data).map((x)=>{
        data[x]
    })
    const Res = await Pool.query(`INSERT INTO ${Table} (??) VALUES (??)`, [Object.keys(AppConfig.DataStruct), Data])
    return Res
}

module.exports = {
    GetIdList: GetIdList,
    GetFileList: GetIdList,
    GetNameList: GetNameList,
    GetInfoById: GetInfoById,
    InsertData: InsertData,
}