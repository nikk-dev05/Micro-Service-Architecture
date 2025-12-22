const jwt = require('jsonwebtoken');
const secret = "23kehfi8ghghg";
const auth =async (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    
    
      if (!token) return res.status(401).json({ message: "Token required" });
    
      try {
        const decoded = jwt.verify(token, secret);
        req.userId = decoded.id; 
        next();
      } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
      }
}
module.exports = auth;