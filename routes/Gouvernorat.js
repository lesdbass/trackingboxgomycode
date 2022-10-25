const router=require("express").Router();
const {getGov,addGov,delGov,addVille,getVille}  = require("../controllers/governoratCtrl.js")



router.get('/gov',getGov)
router.post('/gov',addGov)
router.delete('/gov',delGov)
router.put('/gov',addVille)
router.get('/ville',getVille)



module.exports=router;