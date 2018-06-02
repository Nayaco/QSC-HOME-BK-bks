'use strict'

function fieldscheck(struct){
    this.struct = struct || {}
    this.check = (data) =>{
        const keys = Object.keys(this.struct)
        for(let i = 0; i < keys.length; i++){
            if((data[keys[i]] === null || data[keys[i]] === undefined || data[keys[i]] === '') && this.struct[keys[i]] === true){
                return false
            }
        }
        return true
    }
}

const UDoNL = (data) =>{
    if(data === undefined || data === null || data === '')return true
        else return false
}

module.exports = {
    UdorNl: UDoNL,  
    FieldsCheck: fieldscheck,
}