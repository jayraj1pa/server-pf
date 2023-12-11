const mongoose = require('mongoose')
const connectionString = process.env.DATABASE
mongoose.connect(connectionString).then(()=>{
    console.log("Mongo Db atlas successfully connected with pfserver ");
}).catch(()=>{
    console.log(`MongoDb connection failed ${Error}`);
})
