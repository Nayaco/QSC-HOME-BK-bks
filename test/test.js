const objery = require('../routers/util/objery')
const fieldscheck = require('../routers/util/fieldscheck').FieldsCheck

const arr = ['da', 'fa', 'ga']
const Obj = {
    a: true,
    b: false,
}
const cObj = {
    b: 1,
}
const checker = new fieldscheck(Obj)
console.log(objery.A2O(arr))
console.log(checker.check(cObj))