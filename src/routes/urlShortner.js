const express = require('express');
const validUrl = require('valid-url');
const URL_DB = require('../models/URL');

const router = express.Router();

let kv_db = {};
let key = 0;

router.get('/:short_url', async (req,res)=>{
    // TODO: Try/catch Statements in await functions
    let s_url = req.params.short_url;
    if(s_url)
    {
        let presentUrl = await URL_DB.findOne({short_url: s_url});
        if(presentUrl)
        {
            // console.log(`Long URL is URL ${presentUrl.full_url}`);
            return res.redirect(presentUrl.full_url);
        }
        else
        {
            output_format = {error: "invalid URL"};
            res.json(output_format);
        }
    }
    else
    {
        output_format = {error: "invalid URL"};
        res.json(output_format);
    }
    
})

router.post('/new', async (req,res) => {
    // TODO: Try/catch Statements in await functions
    const requested_url = req.body.url;
    let output_format;
    if(requested_url)
    {
        let isValidUrl = validUrl.isWebUri(requested_url)
        if(isValidUrl)
        {
            let isAlreadyPresent = await URL_DB.findOne({full_url: requested_url});
            if(isAlreadyPresent)
            {
                output_format = {original_url: requested_url, short_url: isAlreadyPresent.short_url};
            }
            else
            {
                const Url_obj = new URL_DB({
                    full_url: requested_url,
                    short_url: key + ""
                });
                const savedUrl = await Url_obj.save();
                // TODO: validation using savedUrl Returned
                output_format = {original_url: requested_url, short_url: key};
                key+=1;
            }
        }
        else
        {
            output_format = {error: "invalid URL"};
        }
    }
    else
    {
        output_format = {error: "invalid URL"};
    }
    res.json(output_format);
})

module.exports = router;