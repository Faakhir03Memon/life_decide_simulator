import User from '../models/User.js';
import Decision from '../models/Decision.js';

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('savedDecisions');
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const saveDecision = async (req, res) => {
  const decisionData = req.body;
  const newDecision = new Decision({ ...decisionData, user: req.userId });

  try {
    await newDecision.save();
    const user = await User.findById(req.userId);
    user.savedDecisions.push(newDecision._id);
    user.profile.xp += 50; // Add XP for making a decision
    
    // Simple badge logic
    if (user.savedDecisions.length === 1 && !user.profile.badges.includes('First Step')) {
      user.profile.badges.push('First Step');
    }

    await user.save();
    res.status(201).json(newDecision);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
