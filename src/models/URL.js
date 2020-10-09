const mongoose = require('mongoose');
 
const URLSchema = mongoose.Schema(
    {
        full_url: {
            type: String,
            required: true,
            minLength: 1,
            maxlength: 255
        },
        short_url: {
            type: String,
            required: true,
            minLength: 1,
            maxlength: 255 // we'll change it once we introduce hashing
        }
    },
    {
        timestamp: true
    }
);

module.exports = mongoose.model('URL',URLSchema);