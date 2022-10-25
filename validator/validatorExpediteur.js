const {body,validationResult} = require("express-validator")

const ExpAddRules = () => [
    body("name","Nom Expediteur est Obligatoire").notEmpty(),
    body("numero","Numero Expedieur est Obligatoire").notEmpty(),
    body("prixLivraison","Prix Livraison est Obligatoire").notEmpty(),
    body("prixRetour","Prix Retour Obligatoire").notEmpty(),
    body("login","Login est Obligatoire").notEmpty(),
    body("password","Password est Obligatoire").notEmpty(),
    body("email","Format Mail incorrect").isEmail(),
    body("password","Minimum 6 caractere pour le champ password").isLength({min : 6 })
]


const validator = (req,res,next) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).send({errors:errors.array()})
        return ; 
    }
        next()
}

module.exports = {validator,ExpAddRules}
