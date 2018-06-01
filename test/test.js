const objery = require('../routers/util/objery')
const Koa = require('koa')
const App = new Koa()
App.use((ctx, next)=>{
})
const arr = ['da', 'fa', 'ga']
console.log(objery.A2O(arr))
