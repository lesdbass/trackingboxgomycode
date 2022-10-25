const router=require("express").Router();
const {getAllSoldee,addSoldee,getOneSoldee}  = require("../controllers/SoldeeCtrl")

router.get('/soldee',getAllSoldee)
router.post('/soldee',addSoldee)
router.get('/soldeeD/:numero',getOneSoldee)

module.exports=router;