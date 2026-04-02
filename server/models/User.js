import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    skills: [String],
    interests: [String],
    goals: [String],
    xp: { type: Number, default: 0 },
    badges: [String],
  },
  savedDecisions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Decision',
  }],
}, { timestamps: true });

export default mongoose.model('User', userSchema);
