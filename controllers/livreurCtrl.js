// const res = require("express/lib/response");
const bcrypt = require("bcrypt");
const Livreur = require("../models/Livreur");
const Users = require("../models/Users");
const Setup = require("../models/Setup");

const getLivreur = async (req,res) => {
    try {

            let liv=await Livreur.find().sort() ;
            if(liv)
            {
                res.status(200).send({msg: "All Livreur" , livreur:liv})
            }
            else{
                res.status(400).send({msg : "Pas de livreur"})
            }
        
    } catch (error) {
        console.log(error)
    }
    
    
}

const getOneLivreur= async (req,res) => {
    let numero=req.params.numero
    try {
        if(numero)
        {
                let liv = await Livreur.findOne({numero:numero})
                if(liv)
                {
                    res.status(200).send({msg:"Livreur Trouver",livreur:liv})
                }
                else{
                    res.status(400).send({msg : "Livreur non trouver"})
                }
        }
        else
        {
            res.status(400).send({msg : "merci de verifier les donnnees"})
        }

    } catch (error) {
        console.log(error)
    }
} 


const addLivreur = async (req,res) => {
    liv=req.body
    console.log(liv)
    try {
        if(liv.numero && liv.nom && liv.telephone && liv.matricule && liv.login)
        {
                    let l = await Livreur.findOne({login:liv.login})
                    if(l){
                        res.status(400).send({msg: "Livreur Deja existe"})
                    }
                    else{
                        l = new Livreur(liv)
                        const salt = 10
                        const hashedPassword=await bcrypt.hash(liv.password,salt)
                        l.password=hashedPassword
                        await l.save()
                        const {login , password, email, bloquer} = l

                        const usr = new Users({login,password,email,bloquer})
                        usr.type="Livreur"
                        await usr.save()
                        updateCompteur()
                        res.status(200).send({msg : "Livreur Ajouter",l})

                    }
        }
        else{
            res.status(200).send({msg : "please check your data"})
        }
        
    } catch (error) {
        console.log(error)
    }
}


const updateCompteur=async ()=> {
    const fnd = await Setup.findOne()

    if(fnd)
    {
        const stp = await Setup.findOneAndUpdate( {_id : fnd._id},{$set : {livreurInd : fnd.livreurInd + 1 }})
        
    }
    // Livreur expediteurInd

}



const updateLivr = async (req,res) => {
    const numero = req.params.numero
    const editLivreur = req.body
    
    try {
        if(editLivreur.password)
        {
            const salt = 10 ;
            const hashedPassword = await bcrypt.hash(editLivreur.password, salt);
            editLivreur.password = hashedPassword ;
        }

        
        await Livreur.findOneAndUpdate({numero:numero},{$set : editLivreur})
        res.status(200).send({msg: "Mise a jour Effectuer"})
        if(editLivreur.password || editLivreur.bloquer || editLivreur.email)
        {
           
            const account = {}

            if(editLivreur.password)
            {
                account.password=editLivreur.password
            }
            if(editLivreur.bloquer)
            {
                account.bloquer=editLivreur.bloquer
            }
            if(editLivreur.email)
            {
               
                account.email=editLivreur.email
            }
            

            let liv = await Livreur.findOne({numero:numero})
            if(liv)
            {
                let a= await Users.findOneAndUpdate({login:liv.login},{$set : account})     
               
            }
        }
    } catch (error) {
        res.status(500).send({msg : "Erreur Serveur",error})
    }
}







module.exports={getLivreur,getOneLivreur,addLivreur,updateLivr}