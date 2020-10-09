const express = require('express');
const validUrl = require('valid-url');

const router = express.Router();

let kv_db = {};
let key = 0;

router.get('/:short_url', (req,res)=>{
    let k = req.params.short_url;
    console.log(`key: ${k} Value: ${kv_db[k]}`);
    if(kv_db[k])
    {
        console.log(`Long URL is URL ${kv_db[k]}`);
        return res.redirect(kv_db[k]);
    }
    else
    {
        output_format = {error: "invalid URL"};
        res.json(output_format);
    }
})

router.post('/new', (req,res) => {
    const requested_url = req.body.url;
    let output_format;
    let isValidUrl = validUrl.isWebUri(requested_url)
    if(isValidUrl)
    {
        kv_db[key] = requested_url;
        output_format = {original_url: requested_url, short_url: key};
        key+=1;
    }
    else
    {
        output_format = {error: "invalid URL"};
    }
    res.json(output_format);
})

module.exports = router;