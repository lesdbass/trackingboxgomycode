const mongoose = require("mongoose");
const {Schema , model}=mongoose;

const gouvernoratSchema = new Schema ({
    nom : {type : String , required: true , unique: true} ,
    ville : {type :  Array} ,
    racine : {type : Number ,required : true} 
})

module.exports=Governorat = model("Governorat",gouvernoratSchema)