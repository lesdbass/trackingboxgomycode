const mongoose=require('mongoose')
const {Schema,model} = mongoose

const colisSchema = new Schema ({
    trakingN : {type : String , required : true ,unique : true },
    nom : {type : String , required : true },
    date:  {type : Date , 	default: Date.now() },
    adresse : {type : String , required : true  },
    telephone : {type : String , required : true  },
    telephone2 : {type : String,  default :'' },
    gouvernorat : {type : String , required : true},
    ville : {type : String , required : true},
    boutique : {type : String , required : true},
    status : {type : String , required : true , default : "En Attente PickUp"},
    commentaire : {type : String , default : ''},
    total : {type : Number , default :0},
    details : [{description : String , qty : Number , prix : Number , tot : Number} ],
    echange : {type : Boolean , default : false},
    soldee  : {type : Boolean , default : false}
   

})

module.exports=Colis=model("Colis",colisSchema)