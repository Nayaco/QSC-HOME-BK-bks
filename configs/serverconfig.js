const path = require('path')
module.exports = {
    'port' : 80,
    'document_path' : path.resolve(__dirname,'..') + '/documents',
    'static' : path.resolve(__dirname,'..') + '/static'
}