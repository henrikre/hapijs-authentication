import argon2 from 'argon2';
import mongoose, { Schema } from 'mongoose';

const UserSchema = Schema({
  email: {
    type: String,
    required: true,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    required: true
  }
});

UserSchema.pre('save', function(next) {
  let user = this;
  if (!user.isModified('password')) return next;

  argon2.generateSalt().then(salt => {
    user.password = argon2.hash(user.password, salt);
    next();
  });
});

export default mongoose.model('User', UserSchema);
