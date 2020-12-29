const express = require('express');
const router = express.Router();


router.use((req, res, next)=>{
    if(req.query.isAdmin){
        next();
    }
    res.send('Sorry Not Admin');
})

router.get('/topsecret', (req, res)=>{
    res.send('This is a top secret');
})

router.get('deleteeverything', (req, res)=>{
    res.send('OK Deleted All');
})

module.exports = router;