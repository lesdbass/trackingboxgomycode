const router=require("express").Router();
const {validator,ColisAddRules} = require('../validator/validatorColis')
//  const {getExp,addExpediteur,updateExp,getOneExp}  = require("../controllers/expediteurCtrl")
const {getAllColis,getOneColis,addColis,updateColis,delColis,getColislivree} = require('../controllers/ColisCtrl')


router.get('/colis',getAllColis)
router.get('/colisOne/:trakingN',getOneColis)
router.get('/colislivre/:boutique',getColislivree)

router.post('/colis',ColisAddRules(),validator,addColis)
//  router.post('/expediteur',ExpAddRules(),validator,addExpediteur)
router.delete('/colis/:trakingN',delColis)
router.put('/colis/:trackingN',updateColis)




module.exports=router;