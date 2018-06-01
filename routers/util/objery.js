'use strict'

const A2O = arr =>{
    return arr.reduce((res, item, index)=>{
        res[index] = item
        return res
    }, {})
}

const O2A = obj =>{
    return Object.keys(obj).map((x)=>Val[x])
}

module.exports = {
    A2O: A2O,
    O2A: O2A,
}