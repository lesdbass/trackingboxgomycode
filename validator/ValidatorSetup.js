const {body,validationResult} =require("express-validator");

const setupAddRules = ()=>[
       
    body("company.fullName","Company est obligatoire").notEmpty(),
    body("company.adresse","adresse est obligatoire").notEmpty(),
    body("company.tel","tel est obligatoire").notEmpty(),
    body("company.codeTva","codeTva est obligatoire").notEmpty(),
    body("company.email","email est obligatoire").notEmpty(),
    body("year","Year est obligatoire").notEmpty()
    // body("email","email sould be mail").isEmail(),
    // body("password","password most contain min 5 carc").isLength({
    //     min:5,
    //     max:20
]


const setupUpdateRules = ()=>[
    body("company.fullName","Company est obligatoire").notEmpty(),
    body("year","Year est obligatoire").notEmpty(),
    body("expediteurInd","Expediteur Indice est obligatoire").isNumeric().notEmpty(),
    body("livreurInd","Livreur Indice est obligatoire").isNumeric().notEmpty()
]

const validator = (req,res,next) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).send({errors:errors.array()})
        return ; 
    }
        next()
}

module.exports = {validator,setupAddRules,setupUpdateRules}