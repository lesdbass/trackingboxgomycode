const {body,validationResult} =require("express-validator");

const loginRules = ()=>[
    body("login","login  sould be mail").notEmpty(),
    body("password","password most contain min 3 carc").isLength({
        min:5,
        max:20
    })
]

const validator = (req,res,next) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).send({errors:errors.array()})
        return ; 
    }
        next()
}

module.exports = {validator,loginRules}