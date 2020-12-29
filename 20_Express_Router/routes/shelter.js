const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.send('All Shelters');
})

router.post('/', (req, res)=>{
    res.send('Creating a shelter');
})

router.get('/:id', (req, res)=>{
    res.send('Showing one specific shelter');
})

router.get('/:id/edit', (req, res)=>{
    res.send('Editing one specific shelter');
})

module.exports = router;