// const res = require("express/lib/response");

const Gouvernorat = require("../models/Gouvernorat");


const getVille= async (req,res) => {
    
    nom=req.query.nom
    if(nom)
    {
        let gov= await Governorat.findOne({nom : nom}).sort();
        if(gov)
        {
               return res.status(200).send({msg:"Governorat found",gov})
        }
       else
       {
           return res.status(400).send({msg:"Governorat not found"})
       }
    }
}


const getGov = async (req,res) => {
    const nom=req.query.nom
    if(nom) 
    {   
        let gov= await Governorat.findOne({nom : nom}).sort();
         if(gov)
         {
                return res.status(200).send({msg:"Governorat found",gov})
         }
        else
        {
            return res.status(400).send({msg:"Governorat not found"})
        }

    }
    else
    {
        let gov = await Gouvernorat.find().sort({racine:1})
        res.status(200).send({msg :"All governrat" , gov})  
    }
    
}  





 const addGov = async (req,res) => {


    const {nom,ville,racine} = req.body
    try {
            if(!nom || !racine) {
                return res.status(400).send({msg : "Please Enter All required information"})
            }
              //  console.log(nom,ville)
            //test si governorat existe
            let gov= await Governorat.findOne({nom})
           // console.log(gov)

            if(gov) return res.status(400).send({msg : "Incorrect information"})
            
            gov=new Governorat({nom,ville,racine})
            await gov.save()
            return res.status(200).send({msg : "Governorat added with Success" , gov})


        } catch (error) {
            console.log(error)
        }
}


const delGov = async (req,res) => {
     const {nom,ville} = req.body
     
    try {
        
        if(nom)
        {
            let gov = await Gouvernorat.findOne({nom:nom})
            if(gov)
            {
               if(!ville)
               {
                    await Gouvernorat.deleteOne({nom:nom})
                    res.status(200).send({msg:"Contact deleted with success"})
                }
                else 
                {
                        
                    let vcheck = await gov.ville.find(el => el===ville)
                    if(vcheck)
                    {   
                        gov.ville= await gov.ville.filter(el => el !=ville)
                        gov.save()
                        
                            res.status(200).send({msg:vcheck})
                    }
                    else
                    {
                        res.status(400).send({msg: "Ville supprimer"})
                    }

                }
            }
            else
            {
                res.status(400).send({msg:"Govornorat non trouver"})
            }
        }
        

    } catch (error) {
        console.log(error)
    }

}



const addVille = async (req,res) => {
    try {
        let {nom,ville} = req.body
        var gov = await  Governorat.findOne({nom: nom});
        if(gov)
        {
                let vcheck = await gov.ville.find(el => el===ville)
            if(!vcheck)
            {
                await gov.ville.push(ville)
                await gov.save();
                res.status(200).send({msg : "Ville Ajouter avec succes", gov})
                
            }
            else
            {
                res.status(400).send({msg :"Ville déja existe"})
            }        }
        else
        {
            res.status(400).send({msg :"Governorat not found xxx"})
        }
        
        
    } catch (error) {
        console.log(error)
    }
    

    
}

module.exports = {getGov,addGov,delGov,addVille,getVille}