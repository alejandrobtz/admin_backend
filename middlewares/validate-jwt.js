const jwt = require('jsonwebtoken');


const validateJWT = (req, res, next) => {
    //read the token
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg:'no token in the request found'
        });
    }

    try {
        //validate token, and assign it to req.uid in case validation is ok.
        const { uid } = jwt.verify( token, process.env.JWT_SEC );
        req.uid = uid;
        next();
        
    } catch (error) {
        return res.status(401).json({
            ok: false, 
            msg: 'no valid token'
        });
    }

}


module.exports = {
    validateJWT
}