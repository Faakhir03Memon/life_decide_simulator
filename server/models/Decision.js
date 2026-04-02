import mongoose from 'mongoose';

const decisionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  career: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    enum: ['Job', 'Freelancing', 'Business'],
    required: true,
  },
  inputs: {
    timeInvestment: { type: Number, default: 0 },
    budget: { type: Number, default: 0 },
    riskTolerance: { type: Number, default: 0 },
  },
  results: {
    incomeRange: { type: String },
    timeToLearn: { type: String },
    difficulty: { type: String },
    requiredSkills: [String],
    riskLevel: { type: String },
  },
  notes: { type: String },
}, { timestamps: true });

export default mongoose.model('Decision', decisionSchema);
