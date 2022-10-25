const express=require("express");
require("dotenv").config({path:"./config/.env"});
const connectDB = require('./config/connectDB');
const Gouvernorat = require('./routes/Gouvernorat');
const Setup = require('./routes/Setup');
const Expediteur = require('./routes/Expediteur');
const Livreur = require('./routes/Livreur');
const Colis = require('./routes/Colis')
const HistColis = require('./routes/HistColis')
const RunSheet = require('./routes/RunSheet')
const Soldee = require('./routes/Soldee')
const User = require('./routes/Users')
const path = require('path')

connectDB();
const app= express();
app.use(express.json());
const PORT = process.env.PORT || 5000;
app.use('/api',Gouvernorat,Setup,Expediteur,Livreur,Colis,HistColis,RunSheet,Soldee,User)

if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'))
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}



// app.use('/api',Livreur)


app.listen(PORT , (err)=> {
    err ? console.log(err) : console.log(`Server running on port ${PORT}`)
})