const router=require("express").Router();
const {setupAddRules,updateSetupRules,validator} =require('../validator/ValidatorSetup')

// const {getGov,addGov,delGov,addVille}  = require("../controllers/governoratCtrl.js")
const {getSetup,addSetup,updateSetup,deleteSetup} = require('../controllers/setupCtrl')


 router.get('/setup',getSetup)
 router.post('/setup',setupAddRules(),validator,addSetup)
 router.put('/setup',updateSetup)
 router.delete('/setup',deleteSetup)
 

//  router.post('/setup',setupAddRules,validator,addSetup)
// router.delete('/gov',delGov)
// router.put('/gov',addVille)



 module.exports=router;