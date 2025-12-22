const productmodel = require('../Models/models.js');
const getProducts = async (req,res)=>{
    try{
        const product =await productmodel.find({});
        res.send(product);
    }
    catch(error){
        res.status(500).json({message:"internal server error"})
        console.log(error);
    }
}
const getProductsbyId = async (req,res)=>{
    try{
      const product = await productmodel.findById(req.params.id);
      if(!product){
        return res.status(404).json({message:`product not exist with this id : ${req.params.id}`});
      }
      res.send(product);
    }
    catch(error){
        res.status(500).json({message:"internal server error"})
        console.log(error);
    }
}
const createProduct = async (req,res)=>{
    try{
        const{name,stock,category,isActive,price,description}= req.body;

       const product = await productmodel.create({
           name,
           stock,
           price,
           category,
           isActive,
           description
       });
       res.status(201).json(product);
       

    }
    catch(error){
        res.status(500).json({message:"internal server error"})
        console.log(error);
    }
}
const updateProduct = async (req,res)=>{
    try{
        const product = await productmodel.findById(req.params.id);
         if(!product){
            return res.status(404).json({
                message:"product not found"
            })
         }  
         const existproduct = await productmodel.findByIdAndUpdate(req.params.id,req.body,{new:true});
         res.status(201).send(existproduct);  
    }
    catch(error){
        res.status(500).json({message:"internal server error"})
        console.log(error);
    }
}
const deleteProduct = async (req,res)=>{
    try{
         const product = await productmodel.findById(req.params.id);
         if(!product){
            return res.status(404).json({
                message:"product not found"
            })
         }  
         const existProduct = await productmodel.findByIdAndDelete(req.params.id);
         res.status(200).json({
            message:"product deleted successfully"
         })
    }
    catch(error){
        res.status(500).json({message:"internal server error"})
        console.log(error);
    }
}
module.exports={
    getProducts,
    getProductsbyId,
    createProduct,
    updateProduct,
    deleteProduct
}