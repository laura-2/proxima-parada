const mongoose = require('mongoose');

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  try{
    mongoose.connect('mongodb://localhost:27017/proximaParada', connectionParams)
    console.log('Connected to mongoDB database')
  } catch(error){
    console.log('Not connected' + error)
  }
};
