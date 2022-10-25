const mongoose=require('mongoose')
const {Schema,model} = mongoose

const livreurSchema = new Schema ({

    numero : {type : Number , required : true , unique : true},
    nom : {type : String , required: true},
    telephone : {type : String , required : true},
    telephone2 : {type : String , default : ''},
    cin : {type : String , default :''},
    matricule : {type : String , required : true} ,
    login : {type : String},
    password : {type : String},
    bloquer: {type : Boolean , default : false},
})

module.exports=Livreur=model("Livreur",livreurSchema)
