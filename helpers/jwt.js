const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
    
    return new Promise((resolve, reject) => {
        const payload = {
            uid
        }
    
        jwt.sign( payload, process.env.JWT_SEC, {
            expiresIn:'12h'
        }, ( err, token ) => {
            if(err){
                console.log(err);
                reject('unable to create JWT')
            }else {
                resolve( token );
            }
        });
    });

}

module.exports = {
    generateJWT
}