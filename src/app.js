const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const urlShortnerRouter = require('./routes/urlShortner');

dotenv.config();
const app = express();

app.use(cors({optionsSuccessStatus: 200}));
app.use('/api/shorturl', urlShortnerRouter);

app.get('/',(req,res)=>{
    res.send('URL Shortner API')
})

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`Server is listning on port ${port}`));