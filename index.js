/* eslint-disable */
const express = require('express');
const cors = require("cors")
const app = express()
app.use(express.json())
const whiteList=  [
  'http://127.0.0.1:5500'
]
const options = {
  origin: (origin, cb)=> {
    if(whiteList.includes(origin) || !origin ){
      cb(null,true)
    }
    else {
      cb(new Error('Origen no permitido'))
    }
  }

}
app.use(cors(options))

const routerApi = require('./routes');
const { errorHandler, logErrors, boomErrorHandler } =require("./middlewares/error.handler")
const port = process.env.PORT || 3000;
app.get('/', (req,res) => {
  res.send('Hola mi server en express')
})

routerApi(app)
// despues de rutas
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen( port , () => {
  console.log(`SERVER RUNNING ON PORT ${port} 🚀 `)
})
