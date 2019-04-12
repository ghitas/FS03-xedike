const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  phone: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  registerDate: { type: Date, default: new Date() },
  numberOfTrips: { type: Number },
  numberOfKms: { type: Number },
  avatar: { type: String, required: true },
  isActive: { type: Boolean, default: true }
});
const User = mongoose.model('User', UserSchema);
module.exports = {
  User,
  UserSchema
};
