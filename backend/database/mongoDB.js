const mongoose = require('mongoose');


const dbUri = "mongodb://localhost:27017/finals"
// mongoose.connect(dbUri)
// const db = mongoose.connection;

// db.on("error",console.error.bind(console,"connection error"))
// db.once("open",()=>{
//     console.log("database connected successfuly")
// })



const databaseConnection = ()=>{

    mongoose.connect(dbUri,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(data=>{
        console.log(`mongoDB databse connected to server: ${data.connection.host} `)
    }).catch(err=>console.error(`database connection error occured ${err}`))
}

module.exports = databaseConnection