const express=require('express')
const path=require('path')
const api=express()


api.use(express.static(path.join(__dirname,'public')))

api.use('/',express.static('index.html'))

// api.listen(3000,()=>{
//     console.log(`listening on port 3000 using express`)
// });

module.exports=api