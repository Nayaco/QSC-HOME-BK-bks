const Koa = require('koa')
const parser = require('koa-bodyparser')
const router = require('koa-router')()
const controller = require('./controller')
const static = require('koa-statics')
const v_server = new Koa()

v_server.use(static('static'))
v_server.use(parser())
v_server.use(controller())

v_server.listen(8080)