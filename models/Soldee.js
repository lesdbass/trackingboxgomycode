const mongoose=require('mongoose')
const {Schema,model} = mongoose

const soldeeSchema = new Schema ({
    numero : {type : String , required : true ,unique : true },
    date:  {type : Date , 	default: Date.now() },
    boutique : {type : String , required : true},
    commentaire : {type : String , default : ''},
    total : {type : Number , default :0},
    fraisTransport : {type : Number , default :0},
    details : [{trakingN : String , tot : Number} ]
})

module.exports=Soldee=model("Soldee",soldeeSchema)