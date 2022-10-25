const mongoose = require('mongoose');
const {Schema,model} =mongoose;

const setupSchema = new Schema({
company : {fullName :  String ,
    adresse : String,
    tel : String,
    codeTva : String,
    email : String,
    logo : String} ,

    year : {type : Number},
    expediteurInd : {type : Number , default : 1} ,
    livreurInd :{type : Number ,default: 1},
    statusColis : [{code : String , name : String}] ,
    motifRetour : [{code : String , name : String}],
    motifDepense : [{code : String , name : String}],
})
module.exports=Setup=model("Setup" , setupSchema)
// statusColis : [{code : String , name : String}],

//{code : String , name : String}