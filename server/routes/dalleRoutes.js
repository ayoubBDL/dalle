const express = require('express')
require('dotenv').config();
const fs = require('fs');
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.png') //Appending .png
    }
  })
const upload = multer({storage})

const { Configuration, OpenAIApi } = require("openai");


const router = express.Router()

const configuration = new Configuration({
    apiKey:process.env.OPENAI_API_KEY
})


const openai = new OpenAIApi(configuration)

router.route('/').get((req,res)=>{
    res.send('Hello from Dalle')
})

router.route('/').post(async (req,res)=>{
    try {
        const {prompt} = req.body

        const aiRes = await openai.createImage({
            prompt,
            n:1,
            size:'1024x1024',
            response_format: 'b64_json'
        })

        const image = aiRes.data.data[0].b64_json

        res.status(200).json({photo:image})

    } catch (error) {
        console.log(error)
        res.status(500).send(error?.response.data.error.message)
    }
})


router.route('/variations').post(upload.single('image'),async (req,res)=>{
    const {numberImages} = req.body
    try {
        const reader = fs.createReadStream(`uploads/${req.file.filename}`)
        const response = await openai.createImageVariation(
            reader,
            parseInt(numberImages),
            "1024x1024"
          );
        res.status(200).json({
            images:response.data.data
        })
    } catch (error) {
        res.status(500).json({error})
        if (error.response) {
            res.status(500).json({error})
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
          console.log(error.message);
        }
      }
})

module.exports = router