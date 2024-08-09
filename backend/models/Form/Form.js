const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    country: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true,
      minLength: 3
    },
    date: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return /^\d{2}\/\d{2}\/\d{4}$/.test(v);
        },
        message: props => `${props.value} is not a valid date format!`
      }
    },
    rating: {
      type: Number,
      required: true,
      minLength: 1
    },
    description: {
      type: String,
      required: true,
      minLength: 10
    }
  });
  
const Form = mongoose.model('Form', formSchema);
module.exports = Form;