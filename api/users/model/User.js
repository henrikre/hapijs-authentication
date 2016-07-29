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

export default mongoose.model('User', UserSchema);
