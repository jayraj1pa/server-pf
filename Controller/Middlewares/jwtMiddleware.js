const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log("inside middleware");
    const token = req.headers['authorization'].split(" ")[1]
    try {
        const jwtResponse = jwt.verify(token,"supersecretket12345")
        console.log(jwtResponse);
        req.payload = jwtResponse.userId
        next()
    } catch (error) {
        res.status(401).json("Authorization failed !!! please login ")
    }
}

module.exports =  jwtMiddleware
