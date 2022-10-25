const res=require('express/lib/response')
const bcrypt = require("bcrypt")
const Expediteur = require("../models/Expediteur");
const Users = require("../models/Users");
const Setup = require("../models/Setup")

const getExp = async (req,res) => {
   
    let exp= await Expediteur.find().sort();
    if(exp)
    {
        res.status(200).send({msg : "All Expediteur", expediteur : exp })
    }
    else{
        res.status(500).send({msg : "Pas Expediteur"})
    }

}
const getOneExp = async (req,res) => {
    let name = req.params.name
    try {
        let exp = await Expediteur.findOne({name:name})
        if(exp)
        {
            res.status(200).send({msg : "one Expediteur", expediteur : exp })
    
        }
        else{
            res.status(300).send({msg : "Please check your information"})
        }

    } catch (error) {
        console.log(error)
    }
    
    
}

const addExpediteur = async(req,res) => {
    const exp = req.body 
    // console.log(exp.numero)

    try {
                
        if(exp.numero && exp.name && exp.prixLivraison && exp.prixRetour && exp.login && exp.password && exp.email)
        {
            let e = await Expediteur.findOne({name : exp.name})
           
            if(e)
            {   
                res.status(400).send({msg : "Expediteur deja existe"})
            }
            else
            {
                e = new Expediteur(exp);
                 // create hash and salt
                const salt = 10 ;
                 const hashedPassword = await bcrypt.hash(exp.password, salt);
                 e.password = hashedPassword ;
                await e.save();
                const {login , password, email, bloquer} = e

                const usr = new Users({login,password,email,bloquer})
                usr.type="Expediteur"
                await usr.save()
                updateCompteur()

                res.status(200).send({msg:"User Register With Success",e})
            }
            
        }
        else
        {
            res.staus(400).send({msg : "Please check your data"})
        }


    } catch (error) {
        res.status(500).send({msg : error})   
    }   
}

const updateCompteur=async ()=> {
    const fnd = await Setup.findOne()

    if(fnd)
    {
        const stp = await Setup.findOneAndUpdate( {_id : fnd._id},{$set : {expediteurInd : fnd.expediteurInd + 1 }})
        
    }
    // expediteurInd

}


const updateExp = async (req,res) => {
    const numero = req.params.numero
    const editExpediteur = req.body
    try {
        if(editExpediteur.password)
        {
            const salt = 10 ;
            const hashedPassword = await bcrypt.hash(editExpediteur.password, salt);
            editExpediteur.password = hashedPassword ;
        }

        await Expediteur.findOneAndUpdate({numero:numero},{$set : editExpediteur})
        res.status(200).send({msg: "Mise a jour Effectuer"})
        if(editExpediteur.password || editExpediteur.bloquer || editExpediteur.email)
        {
           
            const account = {}

            if(editExpediteur.password)
            {
                account.password=editExpediteur.password
            }
            if(editExpediteur.bloquer)
            {
                account.bloquer=editExpediteur.bloquer
            }
            if(editExpediteur.email)
            {
               
                account.email=editExpediteur.email
            }
            

            let exp = await Expediteur.findOne({numero:numero})
            if(exp)
            {
                let a= await Users.findOneAndUpdate({login:exp.login},{$set : account})     
               
            }
        }
    } catch (error) {
        res.status(500).send({msg : "Erreur Serveur"})
    }
}


module.exports = {getExp,addExpediteur,updateExp,getOneExp}