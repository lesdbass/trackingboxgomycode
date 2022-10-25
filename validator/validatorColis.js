const {body,validationResult} =require("express-validator")

const ColisAddRules = () => [
    body("trakingN","Tracking Number est Obligatoire").notEmpty(),
    body("nom","Nom est Obligatoire").notEmpty(),
    body("adresse","Adresse est Obligatoire").notEmpty(),
    body("telephone","Telephone est Obligatoire").notEmpty(),
    body("gouvernorat","gouvernorat est Obligatoire").notEmpty(),
    body("ville","Ville est Obligatoire").notEmpty(),
    body("boutique","Boutique est obligatoire").notEmpty()
]


const validator = (req,res,next) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).send({errors:errors.array()})
        return ; 
    }
        next()
}
module.exports = {validator,ColisAddRules}