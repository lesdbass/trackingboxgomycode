const res=require('express/lib/response')
const Setup = require('../models/Setup')

const getSetup = async (req,res) => {
    try {
       
    let set = await Setup.findOne()
    // console.log(set)
    if(set)
    {   
        // forEach instead of 
        //set.map(async s => {
            res.status(200).send({msg: "Setup trouver", setup : set})
        //}
        //)

    }
    else 
    {
        res.status(400).send({msg: "Setup non trouver"})  
    }


   } catch (error) {
        console.log(error)

   }

}

const addSetup = async (req,res) => {
    const set = req.body
    
    const {statusColis,motifRetour,motifDepense} =req.body

    try {

        if(!statusColis && !motifRetour && !motifDepense)
        {
                let checksetup = await Setup.find()
                if(checksetup.length > 0)
                {
                    res.status(400).send({msg : "Setup deja exsite"})
                }
                else
                {
                    const newSetup=new Setup(set)
                    await newSetup.save()
                    res.status(200).send({msg: "Setup Enregistre",setup : newSetup})
                }
        }
        else
        {
                var setselect = await Setup.findOne()
                // .limit(1)
              //  setselect.map(async x => {
                    // console.log(setup.statusColis)
                    // console.log(setup.motifRetour)
                //    console.log(statusColis)
                    if(statusColis)
                    {   
                        var vcheck = await setselect.statusColis.find(el=> el.name===statusColis.name)
                           // console.log(vcheck)
                        if(!vcheck)
                        {
                            await setselect.statusColis.push(statusColis)
                            await setselect.save();
                            res.status(200).send({msg : "Status Colis ajouter avec succes"})
                        }
                        else
                        {
                            res.status(400).send({msg:"Status Existe"})
                        }
                    
                    
                    }
                    if(motifRetour)
                    {
                        //console.log(setup.motifRetour)
                        let vcheck = await setselect.motifRetour.find(el => el.name===motifRetour.name)
                        if(!vcheck)
                        {
                            await setselect.motifRetour.push(motifRetour)
                            await setselect.save();
                            res.status(200).send({msg : "Motif Retour ajouter avec succes"})
                        }
                        else
                        {
                            res.status(400).send({msg:"Motif Existe"})
                        }
    
                    }
                    if(motifDepense)
                    {
                        let vcheck = await setselect.motifDepense.find(el => el.name===motifDepense.name)
                        if(!vcheck)
                        {
                            await setselect.motifDepense.push(motifDepense)
                            await setselect.save();
                            res.status(200).send({msg : "Motif Depense ajouter avec succes"})
                        }
                        else
                        {
                            res.status(400).send({msg:"Motif Existe"})
                        }
                    }


               // })
                
                
                //traitement status motif retour motif depense
            }        
    } catch (error) {

        console.log(error)
        
    }
}

const updateSetup = async (req,res) => {

    const setup = req.body
    
    
    let filter = "{company.fullName : setup.company.fullName}"

        Setup.findOneAndUpdate(filter,setup, {new : true} , (error,data) =>{
            if(error){
                res.status(500).send({msg : "Probleme Mise a jour" ,setup : Setup})
            }
            else
            {
                res.status(200).send({msg : "Mise a jour Effectuer"})
            }
        } )
}

const deleteSetup= async (req,res) => 
{
        const {statusColis,motifRetour,motifDepense} = req.body
       // console.log(statusColis)
      
    try {
            if(statusColis || motifDepense || motifRetour)
            {

                let set =  await Setup.find().limit(1)
                set.map(async setup => 
                {

                                    if(statusColis)
                                    {
                                            setup.statusColis= await setup.statusColis.filter(el => el.name !=statusColis)
                                            await setup.save()               
                                            res.status(200).send({msg:"Satus Supprimer"})
                                    }
                                    else
                                    {
                                        if(motifRetour)
                                        {
                                            //console.log(setup.motifRetour.filter(el => el.nom !=motifRetour))

                                            setup.motifRetour= await setup.motifRetour.filter(el => el.name !=motifRetour)
                                            await setup.save()               
                                                    res.status(200).send({msg:"Motif Retour Supprimer"})
                                        } 
                                        else
                                        {
                                            if(motifDepense)
                                            {
                                                    setup.motifDepense= await setup.motifDepense.filter(el => el.name !==motifDepense)
                                                    await setup.save()               
                                                    res.status(200).send({msg:"Motif Retour Supprimer"})
                                            }            
                                        }
                                    }
                })
            }
            else
            {
                res.status(400).send({msg:"Erreur saisie"})
            }
            } catch (error) {
                    console.log(error)
            }
  }



module.exports={getSetup,addSetup,updateSetup,deleteSetup}

