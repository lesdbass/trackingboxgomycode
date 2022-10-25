const HistColis =require("../models/HistColis")
const Colis =require("../models/Colis")


const getHistColis = async (req,res) => {
    let trakingN = req.params.trakingN
    try {
        let histC = await HistColis.find({trakingN:trakingN})
        if(histC)
        {
            res.status(200).send({msg : "Hist Colis", histColis : histC })
    
        }
        else{
            res.status(400).send({msg : "Please check your information"})
        }

    } catch (error) {
        console.log(error)
    }
    
}



const addHistColis = async(req,res) => {
    const hs = req.body 
    // console.log(exp.numero)

    try {
                const colis= await Colis.findOne({trakingN:hs.trakingN})
                if(colis!==null && hs.status!=='') 
                {                     
                    // console.log(hs)     
                        histC = new HistColis(hs);
                        // create hash and salt
                        await histC.save();
                        await Colis.findOneAndUpdate({trakingN:hs.trakingN},{$set : {status:hs.status}})
                        
                        res.status(200).send({msg:"colis enregistrer",histC})
                }
                else
                {

                    res.status(500).send({msg : "Please check your data"})
                }

    } catch (error) {
        
        res.status(500).send({msg : error})   
    }   
}

module.exports={addHistColis,getHistColis}



