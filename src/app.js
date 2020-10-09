const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const urlShortnerRouter = require('./routes/urlShortner');

// Warning Resolution
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);

dotenv.config();
const app = express();
mongoose.connect(process.env.MONGO_URI , ()=>console.log(`Connected to DB!`));

app.use(cors({optionsSuccessStatus: 200}));
app.use(express.json());
app.use('/api/shorturl', urlShortnerRouter);

app.get('/',(req,res)=>{
    res.send('URL Shortner API')
})

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`Server is listning on port ${port}`));