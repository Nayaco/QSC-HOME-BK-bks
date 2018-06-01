'use strict'

const A2O1 = arr =>{
    return arr.reduce((res, item, index)=>{
        res[index] = item
        return res
    }, {})
}

const A2O2 = (keys, vals) =>{
    return keys.reduce((res, item, index)=>{
        res[item] = vals[item]
        return res
    }, {})
}

const O2A = obj =>{
    return Object.keys(obj).map((x)=>obj[x])
}

module.exports = {
    A2O: A2O1,
    A2O2: A2O2,
    O2A: O2A,
}