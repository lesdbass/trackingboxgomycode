const router=require("express").Router();
const {validator,ExpAddRules} = require('../validator/validatorExpediteur')
 const {getExp,addExpediteur,updateExp,getOneExp}  = require("../controllers/expediteurCtrl")



router.get('/expediteur',getExp)
router.get('/exp/:name',getOneExp)
//router.post('/expediteur',addExpediteur)
 router.post('/expediteur',ExpAddRules(),validator,addExpediteur)
// router.delete('/gov',delGov)
router.put('/expediteur/:numero',updateExp)



module.exports=router;