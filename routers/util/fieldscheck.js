'use strict'

function fieldscheck(struct){
    this.struct = struct || {}
    this.check = (data) =>{
        const keys = Object.keys(this.struct)
        for(key in keys){
            if((data[key] === null || data[key] === undefined) && this.struct[key] === true){
                return false
            }
        }
        return true
    }
}

module.exports = {
     FieldsCheck: fieldscheck,
}