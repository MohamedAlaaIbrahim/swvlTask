const mongoose = require("mongoose");
const { StringDecoder } = require("string_decoder");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: 0,
  },
  email: {
    type: String,
    default: "mohamedalaaabdelhamid@gmail.com"
  },
  lang: {
    type: Boolean,
    default: true
  },
  promoGroup: {
      type: Number,
      default: 1  
  },
  requireAlert: {
      type: Boolean,
      default: false
  },
  userToken: {
    type: String,
    default: 'BIqcXGijA1PrToDRShPEs3A8XVVEY6SjvLpFtQZ420hPpj1wS_i-sifTzMmFEP6conkmKjQ6F-mxOaYmRuVsEc4'
  }
});

const User = mongoose.model("User", UserSchema);

const promoSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    promoGroups: [{
            type: Number 
    }]
})
const Promo = mongoose.model("Promo", promoSchema);

module.exports = {
    User,
    Promo
}