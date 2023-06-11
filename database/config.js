const mongoose = require('mongoose');


const dbconnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log("db Online");
    } catch (error) {
        throw new Error('Error when initializing db connection');
    }    

}

module.exports = {
    dbconnection
}