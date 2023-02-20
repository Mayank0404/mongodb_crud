const express = require('express')
const engine=require('express-handlebars').engine

const handlebars=require('handlebars')

const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
require('./model/db')

const app=express()
app.engine('handlebars',engine({
    handlebars: allowInsecurePrototypeAccess(handlebars),
}));
app.set('view engine','handlebars')
app.set('views','./views')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/emp',require('./controllers/routes'))

const PORT=3000
app.listen(PORT,()=> console.log(`SERVER IS RUNNING AT ${PORT}`))   