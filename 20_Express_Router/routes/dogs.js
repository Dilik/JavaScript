const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.send('All Dogs');
})

router.post('/', (req, res)=>{
    res.send('Creating A Dog');
})

router.get('/:id', (req, res)=>{
    res.send('Showing one specific Dog');
})

router.get('/:id/edit', (req, res)=>{
    res.send('Editing one specific Dog');
})

module.exports = router;