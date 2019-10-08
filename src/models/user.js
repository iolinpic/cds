const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: (props) => `${props.value} Is not valid email address!`,
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
  tokens: [{
    token: {
      type: String,
      required: true,
    },
  }],
});
userSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.tokens;
  return obj;
};
userSchema.pre('save', async function save(next) {
  // hash password before saving
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 12);
  }
  next();
});
userSchema.methods.generateAuthToken = async function generateAuthToken() {
  const user = this;
  const token = jwt.sign({ id: user.id }, process.env.JWT_KEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
userSchema.statics.findByCredentials = async function findByCredentials(email, password) {
  // Search for a user by email and password.
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error('Invalid login credentials');
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error('Invalid login credentials');
  }
  return user;
};
const User = mongoose.model('User', userSchema);
module.exports = User;
