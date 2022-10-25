const router=require("express").Router();
const {getLivreur,getOneLivreur,addLivreur,updateLivr} =require("../controllers/livreurCtrl")
const {LivAddRules,validator} =require('../validator/validatorLivreur')

// const {LivAddRules,validator} =require('../validator/validatorLivreur')

router.get('/livreur',getLivreur)
router.get('/livreur/:numero',getOneLivreur)
router.post('/livreur',LivAddRules(),validator,addLivreur)
router.put('/livreur/:numero',updateLivr)


module.exports=router