const mongoose=require('mongoose')
const {Schema,model} = mongoose

const RunSheetSchema = new Schema ({
    idRS : {type : String ,required : true , unique : true },
    numero : {type : Number , required : true },
    nom : {type : String , required: true},
    matricule : {type : String , required : true} ,
    date:  {type : Date , 	default: Date.now() },
    details : [{trakingN : String, nom : String ,adresse: String , telephone : String , total : Number}]
})

module.exports=RunSheet=model("RunSheet",RunSheetSchema)