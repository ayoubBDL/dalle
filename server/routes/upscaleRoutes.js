const express = require('express')
require('dotenv').config();
const fs = require('fs');
const multer = require('multer')
const axios = require('axios');
const FormData = require('form-data');

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.png') //Appending .png
    }
  })
const upload = multer({storage})

router.route('/').post(upload.single('image'),async (req,res)=>{
    const formData = new FormData();
    try {
        // const reader = fs.createReadStream(`uploads/${req.file.filename}`, { encoding: 'base64' })
        const contents = fs.readFileSync(`uploads/${req.file.filename}`, {encoding: 'base64'});
        formData.append('upscale', 2);
        formData.append('image', 'https://jixjiastorage.blob.core.windows.net/public/sensor-ai/super_image/example1.jpg');
        
        const response = await axios({
        method: 'POST',
        url: 'https://super-image1.p.rapidapi.com/run',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': process.env.UPSCALE_API_KEY,
            'X-RapidAPI-Host': 'super-image1.p.rapidapi.com'
        },
        data: {"image": `${fs.readFileSync(`uploads/${req.file.filename}`, {encoding: 'base64'})}`, "upscale": 2}
        })

        console.log(response)
        // const b64 = Buffer.from(response.data).toString('base64');

        res.status(200).json({
            image:response.data.output_url
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