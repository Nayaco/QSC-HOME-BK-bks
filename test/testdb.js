const InfoSQL = require('../lib/InfoSQL')

InfoSQL.GetInfoById({id: 0}).then((res)=>{
    console.log(res)
})

