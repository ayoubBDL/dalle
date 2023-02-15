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
      cb(null, Date.now() + ' ') //Appending .png
    }
  })
const upload = multer({storage})

//Remove BG  
router.route('/').post(upload.single('image_file'),async (req,res)=>{
    const formData = new FormData();
    try {
        formData.append('size', 'regular');
        formData.append('image_file', fs.createReadStream(`uploads/${req.file.filename}`));
        const response = await axios({
            method: 'post',
            url: 'https://api.remove.bg/v1.0/removebg',
            data: formData,
            responseType: 'arraybuffer',
            headers: {
              ...formData.getHeaders(),
              'X-Api-Key': process.env.REMOVEBG_API_KEY,
            },
            encoding: null
        })

        const b64 = Buffer.from(response.data).toString('base64');

        res.status(200).json({
            image:b64
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