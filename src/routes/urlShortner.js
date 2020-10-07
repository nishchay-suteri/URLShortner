const express = require('express');

const router = express.Router();

router.get('/:short_url', (req,res)=>{
    res.send('GET Request for short URL');
})

router.post('/new', (req,res) => {
    res.send('Post Request for new URL');
})

module.exports = router;