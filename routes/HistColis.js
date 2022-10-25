const router=require("express").Router();
//  const {getExp,addExpediteur,updateExp,getOneExp}  = require("../controllers/expediteurCtrl")
//const {getAllColis,getOneColis,addColis,updateColis,delColis} = require('../controllers/ColisCtrl')

const {addHistColis,getHistColis} = require('../controllers/HistColis')


router.get('/HistColis/:trakingN',getHistColis)
router.post('/HistColis',addHistColis)



module.exports=router;