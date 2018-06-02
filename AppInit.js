'use strict'

const Config = require('./configs/App.config')

const Grabber = require('./lib/grabber')
const grabber = new Grabber(Config.MysqlConfig)

const CreateTable = async()=>{
    const res = await grabber.lcreatetable(Config.Table1, Config.DataStruct)
    return res
}

const __Main__ = async()=>{
    const res = await CreateTable()
    return res
}

__Main__().then((res)=>{
    console.log(res)
    process.exit()
}).catch((err)=>console.log(err))