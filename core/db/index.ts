//database connection, it's a self executing function, so whereever this file is required, it will executes..
import mongoose from 'mongoose'

module.exports = (() => {
    mongoose
        .connect(`${process.env.DB_URL}`,{ useNewUrlParser: true,useUnifiedTopology: true })
        .then( () => console.log("DataBase Connected Successfully!!!"))
        .catch( err => {
            console.log("Error Connecting To DataBase, Error: ",err.name); 
            console.log('****************** Server Terminates ******************')
            process.exit(0)
        });
    
    mongoose.set('useFindAndModify', false);
})()