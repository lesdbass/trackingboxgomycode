const mongoose=require('mongoose')
const {Schema,model} = mongoose

const histColisSchema = new Schema ({
    trakingN : {type : String , required : true},
    date:  {type : Date , 	default: Date.now() },
    observation  : {type : String},
    motif : {type : String },
    status : {type : String , required : true , default : "En Attente PickUp"}
   
})

module.exports=HistColis=model("HistColis",histColisSchema)