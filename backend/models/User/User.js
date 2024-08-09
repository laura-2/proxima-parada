const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity')
const userSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId},
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  favList: [{type: mongoose.Schema.Types.ObjectId, ref: 'Form'}]
});

userSchema.methods.generateAuthToken = function (){
  const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
  return token
}
const User = mongoose.model('User', userSchema);

const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    favList: Joi.array().items(Joi.string().hex().length(24)).label("Favorite List")
  });
  return schema.validate(data)
}

module.exports = {User, validate}