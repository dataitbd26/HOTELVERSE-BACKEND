const mongoose = require('mongoose');

const dotenv = require('dotenv');

mongoose.connect(process.env.MongoPort)
.then(res=>{
    console.log('connect to mongodb')
})
