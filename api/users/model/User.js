import argon2 from 'argon2';
import mongoose, { Schema } from 'mongoose';
import Promise from 'bluebird';

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
    argon2.hash(user.password, salt).then(hash => {
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  argon2.verify(this.password, candidatePassword).then(match => {
    cb(null, match);
  })
  .catch(err => {
    cb(err);
  });
}

export default mongoose.model('User', UserSchema);
