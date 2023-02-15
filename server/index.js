const express = require('express')
require('dotenv').config();
const bodyParser = require('body-parser')
const cors = require('cors')

const connectDB  = require("./mongodb/connect.js");
const postRoutes  = require("./routes/postRoutes.js")
const dalleRoutes  = require("./routes/dalleRoutes.js")
const removebgRoutes  = require("./routes/removebgRoutes.js")
const upscaleRoutes  = require("./routes/upscaleRoutes.js")


const app = express()
app.use(cors())
app.use(express.json({limit: '50mb'})),
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use(express.static(__dirname));

app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)
app.use('/api/v1/removebg', removebgRoutes)
app.use('/api/v1/upscale', upscaleRoutes)

app.get('/', async (req, res)=>{
    res.send('Hello from DALL-E!')
})

const startServer = async ()=>{
    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, ()=> console.log('Server has started'))
    }catch(error){
        console.log(error)
    }
}

startServer()
