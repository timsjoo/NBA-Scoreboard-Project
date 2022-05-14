const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({

  username: {
    type: String,
    required: [
      true,
      "Please enter a username"
    ],
    minLength: [
      3,
      "Username must be at least three characters long"
    ],
    unique: true
  },

  email: {
    type: String,
    required: [
      true,
      "Please enter an email"
    ],
    validate: {
      validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
      message: "Please enter a valid email"
    },
    unique: true
  },

  password: {
    type: String,
    required: [
      true,
      "Please enter a password"
    ],
    minLength: [
      6,
      "Password must be at least 6 characters or longer"
    ]
  },

  favoriteTeam: {
    type: Number,
    required: [
      true,
      "Please choose a favorite team"
    ]
  },

}, {timestamps: true});

UserSchema.virtual('confirmPassword')
  .get(() => this._confirmPassword )
  .set( value => this._confirmPassword = value ); //comparing password

UserSchema.pre('validate', function(next){
  if (this.password !== this.confirmPassword ) {
    this.invalidate('confirmPassword', 'Passwords do not match');
  }
  next();
});

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10)
    .then(hashedPassword => {
      this.password = hashedPassword;
      next();
    });
});

UserSchema.plugin(uniqueValidator, {message: 'Already exists'}); // Custom message for uniqueness validations

module.exports = mongoose.model("User", UserSchema);