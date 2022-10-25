const router=require("express").Router();

const {getAllRunSheet,getOneRunSheet,addRunSheet} = require('../controllers/RubSheetCtrl')


router.get('/runsheet',getAllRunSheet)
router.get('/runsheetOne/:idRS',getOneRunSheet)
router.post('/runsheet',addRunSheet)

module.exports=router;