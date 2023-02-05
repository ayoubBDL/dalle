const express = require('express')
require('dotenv').config();
const cloudinary = require('cloudinary')

const Post = require("../mongodb/models/post.js")


const router = express.Router()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//GET all post
router.route('/').get(async (req,res)=>{
    try {
        const posts = await Post.find({})
        res.status(200).json({success:true, data:posts})
    } catch (error) {
        res.status(500).json({success:false, message:error})
    }
})

//Create post
router.route('/').post(async (req,res)=>{
    try {
        const {name, prompt, photo} = req.body;
        
        const newPost = await Post.create({
            name,
            prompt,
            photo
        })
        
        res.status(201).json({success:true, data:newPost})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message:error})
    }
})

module.exports = router