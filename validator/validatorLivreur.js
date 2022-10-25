const {body,validationResult} =require("express-validator")

const LivAddRules = () => [
    body("numero", "Nom Livreur Obligatoire").notEmpty(),
    body("nom","Nom livreur Obligatoire").notEmpty(),
    body("telephone","Telephone livreur Obligatoire").notEmpty(),
    body("matricule","Matricule voiture livreur obligatoire").notEmpty(),
    body("login","Login Livreur Obligatoire minimum 6").isLength({min : 6})
]
const validator = (req,res,next) => {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).send({error:errors.array()})
        return
    }
    next()

}

module.exports={validator,LivAddRules}
