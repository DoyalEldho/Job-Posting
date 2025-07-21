const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

 role: {
    type: String,
    enum: ['employee', 'company'], 
    default: 'employee'
  },
   companyName: { type: String }, 

});

module.exports = mongoose.model('User', userSchema);
