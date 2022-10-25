const mongoose=require('mongoose')
const {Schema,model} =mongoose


const userSchema=new Schema ({
    email : {type : String},
    login : {type : String},
    password : {type : String},
    bloquer: {type : Boolean},
    type : {type:String}
})

module.exports=Users=model("Users",userSchema)