'use strict'
const app = require('./app')
const config = require('./config')
require('./db')
const PORT = config.server.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`api run http://localhost:${PORT}`)
})