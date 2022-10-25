const Colis =require("../models/Colis")

const getAllColis = async (req,res) => {
    try {
       
        let colis = await Colis.find().sort();

        // console.log(set)
        if(colis)
        {   
            // forEach instead of 
            //set.map(async s => {
                res.status(200).send({msg: "colis trouver", colis : colis})
            //}
            //)
    
        }
        else 
        {
            res.status(400).send({msg: "colis non trouver"})  
        }
    
    
       } catch (error) {
            console.log(error)
    
       }
} 



const getOneColis = async (req,res) => {
    let trakingN = req.params.trakingN
    try {
        let colis = await Colis.findOne({trakingN:trakingN})
        if(colis)
        {
            res.status(200).send({msg : "one Colis", colis : colis })
    
        }
        else{
            res.status(400).send({msg : "Please check your information"})
        }

    } catch (error) {
        console.log(error)
    }
    
}



const addColis = async(req,res) => {
    const cl = req.body 
    // console.log(exp.numero)

    try {
                           
                colis = new Colis(cl);
                 // create hash and salt
                await colis.save();
                res.status(200).send({msg:"colis enregistrer",colis})


    } catch (error) {
        console.log(error)
        res.status(500).send({msg : error})   
    }   
}

const updateColis = async (req,res) => {
    const trackingN = req.params.trackingN
    const editColis = req.body
    try {
        
        let colis = await Colis.findOneAndUpdate({trakingN:trackingN},{$set : editColis})
        // let colis = await Colis.findOneAndUpdate({trackingN:trackingN},{$set : editColis})
        res.status(200).send({msg: "Mise a jour Effectuer", colis : colis})
        
    } catch (error) {
        res.status(500).send({msg : "Erreur Serveur"})
    }
}

const delColis = async (req,res) => {
    trakingN=req.params.trakingN 
    try {
                    await Colis.deleteOne({trakingN:trakingN})
                    res.status(200).send({msg:"Colis deleted with success"})
    } catch (error) {
        console.log(error)
    }
 

}

const addDetails = async (req,res) => {
    let dt = req.body
    let trackingN = req.params.trackingN
    try {
        
        //{description : String , qty : Number , prix : Number , tot : Number}
        var colis = await  Colis.findOne({trakingN: trackingN});

        if(colis)
        {
                
           
                await colis.details.push(dt)
                await colis.save();
                res.status(200).send({msg : "Ligne Ajouter avec succes", colis}) 
       }
        else
        {
            res.status(400).send({msg :"Colis not found"})
        }
        
        
    } catch (error) {
        res.status(500).send({msg :error})
    }
    
}


const delDetails = async (req,res) => {
    const trackingN = req.params.trackingN
    const {description} = req.body
    
   try {
    
           let colis = await colis.findOne({trackingN:trackingN})
           if(colis)
           {   
                       colis.details= await colis.details.filter(el => el.description !=description)
                       colis.save()
                       
                           res.status(200).send({msg:"ligne details supprimer"})
            }
            else
            {
                       res.status(400).send({msg: "ligne non trouver"})
            }

       

   } catch (error) {
       console.log(error)
   }

}



const getColislivree = async (req,res) => {
    let boutique = req.params.boutique
    
    try {
        let colis = await Colis.find ({boutique:boutique,soldee:false,status:"Livré"})
        if(colis)
        {
            res.status(200).send({msg : "colis Livre", colis : colis })

        }
        else{
            res.status(400).send({msg : "Please check your information"})
        }

    } catch (error) {
        console.log(error)
    }
    
}









module.exports={getAllColis,getOneColis,addColis,updateColis,delColis,addDetails,delDetails,getColislivree}

