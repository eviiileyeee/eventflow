const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Make sure we're using bcryptjs consistently


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: [true, "user with this username already exists"],
    trim: true
  },
 /* name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },*/
  phoneNumber:{
    type:String,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'organizer', 'admin'],
    default: 'user'
  },
  profileImage: {
    url: String,
    public_id: String
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  githubUrl: String,
  linkedinUrl: String,
  instagramUrl: String,
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
