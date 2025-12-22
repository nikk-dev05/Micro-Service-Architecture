const usermodel = require('../Models/models.js');
const  bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = "23kehfi8ghghg";

const createUser =async (req,res)=>{
try{
         const{name,email,password,isActive} = req.body;
         if(!name || !email ||!password||!isActive){
            return res.status(404).json({message:"Please enter all the fields is compuslory!!!!"})
         }
         const hashed = await bcrypt.hash(password,10);
         const user = await usermodel.create({
            name,
            email,
            password:hashed,
             isActive
         })
         res.status(201).send(user);
}
catch(error){
    res.status(500).json({
        message:"Internal server error"
    })
    console.log(error);
}
}

const LoginUser = async (req,res)=>{
try{
    const {email,password} = req.body;
    const user = await usermodel.findOne({email});
    if(!user){
        return res.status(400).json({message:"user not found"});

    }
    const isMatched = await bcrypt.compare(password,user.password);
    if(!isMatched){
        return res.status(400).json({message:"please enter the correct email or Password"});
    }
    let token  =  jwt.sign({ id: user._id }, secret, { expiresIn: "1h" })
    res.status(200).json({
        message:"user login succeessfully",
        "token":token
    });

    

}
catch(error){
     res.status(500).json({
        message:"Internal server error"
    })
    console.log(error);
}
}
module.exports = {
    createUser,
    LoginUser
}