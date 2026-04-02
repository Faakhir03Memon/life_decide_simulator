import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getAdvice = async (req, res) => {
  const { interests, time, goal } = req.body;

  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
    // Fallback Mock Response if no key
    const mockAdvice = `Based on your interests in ${interests} and your goal to ${goal} within ${time}, I recommend starting with Freelancing in a niche like Graphic Design or Web Development. Here is a mini-roadmap: 1. Learn basic tools (1 month). 2. Build a portfolio (1 month). 3. Start on Fiverr/Upwork.`;
    return res.status(200).json({ advice: mockAdvice });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional career advisor for the FuturePath platform. Provide short, actionable career advice based on user inputs."
        },
        {
          role: "user",
          content: `Interests: ${interests}. Available time: ${time}. Goal: ${goal}. Suggest the best career path and a quick roadmap.`
        }
      ],
    });

    res.status(200).json({ advice: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ message: "AI Advisor is currently unavailable", error: error.message });
  }
};
