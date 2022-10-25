const RunSheet =require("../models/RunSheet")

const getAllRunSheet = async (req,res) => {
    try {
       
        let runsheet = await RunSheet.find().sort();

        // console.log(set)
        if(runsheet)
        {   
            // forEach instead of 
            //set.map(async s => {
                res.status(200).send({msg: "RunSheet trouver", runsheet : runsheet})
            //}
            //)
    
        }
        else 
        {
            res.status(400).send({msg: "runsheet non trouver"})  
        }
    
    
       } catch (error) {
            console.log(error)
    
       }
} 



const getOneRunSheet = async (req,res) => {
    let idRS = req.params.idRS
    try {
        let runsheet = await RunSheet.findOne({idRS:idRS})
        if(runsheet)
        {
            res.status(200).send({msg : "one runsheet", runsheet : runsheet })
    
        }
        else{
            res.status(400).send({msg : "Please check your information"})
        }

    } catch (error) {
        console.log(error)
    }
    
}


const addRunSheet = async(req,res) => {
    const rn = req.body 
    // console.log(exp.numero)

    try {
                           
                runsheet = new RunSheet(rn);
                 // create hash and salt
                await runsheet.save();
                res.status(200).send({msg:"runnsheet enregistrer",runsheet})


    } catch (error) {
        res.status(500).send({msg : error})   
    }   
}


module.exports={getAllRunSheet,getOneRunSheet,addRunSheet}
