const mongoose = require('mongoose');

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/proximaParada';
  try{
    mongoose.connect(mongoUri, connectionParams)
    console.log('Connected to mongoDB database')
  } catch(error){
    console.log('Not connected' + error)
  }
};
