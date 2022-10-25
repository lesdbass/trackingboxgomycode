const mongoose=require('mongoose')
const {Schema,model} =mongoose


const expediteurSchema=new Schema ({
    numero : {type : Number , required: true , unique: true},
    name : {type : String , unique: true},
    telephone : {type : String , default :'' },
    prixLivraison : {type : Number},
    prixRetour : {type : Number},
    rib : {type : String , default :''},
    banque : {type : String, default :''} ,
    adresse : {type : String , default :''},
    codeTVA : {type:String ,default :''},
    email : {type : String , default :''},
    login : {type : String},
    password : {type : String},
    commentaire : {type : String , default :''},
    whois: {type:String},
    date: {type:Date , default: Date.now},
    gov :{type : String , default :''},
    ville: {type:String , default :''},
    bloquer: {type : Boolean , default : false},
    compteur : {type : Number , default : 1}

})

module.exports=Expediteur=model("Expediteur",expediteurSchema)
