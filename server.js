var express=require('express')
var app=express()
var bodyParser= require('body-parser')
var path = require('path')

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'public','dist')))

var routes_setter= require('./server/config/routes.js')
routes_setter(app);
app.listen(8000,()=>{
  console.log('listening for further stuff!')
})
