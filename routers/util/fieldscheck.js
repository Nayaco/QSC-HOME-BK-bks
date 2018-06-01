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

const UDoNL = (data) =>{
    if(data === undefined || data === null)return true
        else return false
}

module.exports = {
    UdorNl: UDoNL,  
    FieldsCheck: fieldscheck,
}