const jwt = require('jsonwebtoken');
require('dotenv').config();

const token = (req,res,next) => {
    const token = req.headers.authorization?.split(' ')[1];
    try{
        req.token = jwt.verify(token,process.env.JWT_SECRET);
        next();
    }catch(e){
        res.status(401).json({error : "Vous devez être authentifié pour réaliser cette action"});
    }
    
}

module.exports = token;