'use strict'

const path = require('path')

module.exports = {
/// General Configs
    StaticPath: path.join(path.resolve(__dirname, '..'), '/statics'),
    AssetPath: path.join(path.resolve(__dirname, '..'), 'assets'),
    ListenPort: 8080,
    ExpireTime: 3600,

/// Fields Configs
  FeildsConfig: {
    Fields:{
      id: true,
      name: true,
      author: true,
      time: true,
      des: false,
    },
  },
    
/// SQL Configs
    MysqlConfig: {
      host: 'localhost',
      port: 3306,
      database: 'testdb',
      user: 'chan',
      password: 'chan',  
    },
    DataStruct: {
      id: 'VARCHAR(255)',
      name: 'VARCHAR(255)',
      author: 'VARCHAR(255)',
      time: 'VARCHAR(255)',
      des: 'VARCHAR(255)',
    },
    File2ID: {
      id: 'VARCHAR(255)',
      file: 'VARCHAR(255)',
      downloads: 'LONG'
    },
    Table1: 'ObjectInfo',
    Table2: 'ObjectInfo',
///-------------
}