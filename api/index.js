const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User.js');
const bcrypt = require('bcryptjs')
const dotenv = require("dotenv");
require('dotenv').config()
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const bcryptSalt = bcrypt.genSaltSync(16); 


mongoose.connect(process.env.MONGO_URL);

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))



app.get('/test', (req,res) => {
    res.json('test isnt ok asdfasd');
});


try{

    app.post('/register',async (req,res) => {
        const{name,email,password} = req.body;
    
        const userDoc = await User.create({
            name,
            email,
            password:await bcrypt.hashSync(password, bcryptSalt),
        });
    
        res.json(userDoc);
    })
    

} catch(e) {
    res.status(422).json(e);
}


app.post('/login', async(req,res) =>{
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if(userDoc) {
        res.json('Bulundu');

    } else{
        res.json('Bulunamadı');
        console.log(req.body)

    }
})

app.listen(4000)