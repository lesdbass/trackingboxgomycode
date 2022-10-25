const Soldee =require("../models/Soldee")

const getAllSoldee = async (req,res) => {
    try {
       
        let soldee = await Soldee.find().sort();

        // console.log(set)
        if(soldee)
        {   
            // forEach instead of 
            //set.map(async s => {
                res.status(200).send({msg: "soldee trouver", soldee : soldee})
            //}
            //)
    
        }
        else 
        {
            res.status(400).send({msg: "soldee non trouver"})  
        }
    
    
       } catch (error) {
            console.log(error)
    
       }
} 


const getOneSoldee = async (req,res) => {
    let numero = req.params.numero
    try {
        let soldee = await Soldee.findOne({numero:numero})
        if(soldee)
        {
            res.status(200).send({msg : "one solde", soldee : soldee })
    
        }
        else{
            res.status(400).send({msg : "Please check your information"})
        }

    } catch (error) {
        console.log(error)
    }
    
}




const addSoldee = async(req,res) => {
    const sl = req.body 
    // console.log(exp.numero)

    try {
                           
                let soldee = new Soldee(sl);
                 // create hash and salt
                await soldee.save();
                res.status(200).send({msg:"soldee enregistrer",soldee})


    } catch (error) {
        console.log(error)
        res.status(500).send({msg : error})   
    }   
}



module.exports={getAllSoldee,addSoldee,getOneSoldee}
