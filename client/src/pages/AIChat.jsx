import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import { Bot, Send, User, Loader2, Compass } from 'lucide-react';
import { fetchAIAdvice } from '../services/api';

const AIChat = () => {
  const [formData, setFormData] = useState({ interests: '', time: '', goal: '' });
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your FuturePath Advisor. Tell me about your interests and goals, and I will create a roadmap for you.' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.interests || !formData.time || !formData.goal) return;

    setLoading(true);
    const userMessage = { role: 'user', content: `I'm interested in ${formData.interests}. I have ${formData.time} and my goal is ${formData.goal}.` };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const { data } = await fetchAIAdvice(formData);
      const assistantMessage = { role: 'assistant', content: data.advice };
      setMessages((prev) => [...prev, assistantMessage]);
      setFormData({ interests: '', time: '', goal: '' });
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: 'assistant', content: "I'm sorry, I encountered an error. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[85vh] gap-6 py-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2 shrink-0">
        <h2 className="text-3xl font-bold text-secondary">AI Career Advisor</h2>
        <p className="text-slate-400">Get personalized roadmaps and smart suggestions instantly.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 overflow-hidden">
        {/* Input Controls */}
        <GlassCard className="lg:w-1/3 flex flex-col gap-4 shrink-0 overflow-y-auto">
          <h3 className="text-lg font-semibold flex items-center gap-2"><Compass className="text-secondary" /> Profile Info</h3>
          <div className="flex flex-col gap-4 mt-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400 uppercase tracking-widest pl-1">Interests</label>
              <input
                type="text"
                placeholder="e.g., Design, Apps, Data"
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-secondary/50 transition-all"
                value={formData.interests}
                onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400 uppercase tracking-widest pl-1">Available Time</label>
              <input
                type="text"
                placeholder="e.g., 3 months, 10 hrs/week"
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-secondary/50 transition-all"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400 uppercase tracking-widest pl-1">Ultimate Goal</label>
              <input
                type="text"
                placeholder="e.g., Job, Freelancing income"
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-secondary/50 transition-all"
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 bg-secondary text-white font-bold rounded-xl mt-auto hover:bg-secondary/80 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <>Get AI Advice <Send size={18} /></>}
          </button>
        </GlassCard>

        {/* Chat Window */}
        <GlassCard className="flex-1 flex flex-col gap-4 overflow-hidden p-0 bg-white/5">
          <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-secondary/10">
            <Bot size={24} className="text-secondary" />
            <span className="font-semibold">Advisor Response</span>
          </div>
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-accent/20 text-accent' : 'bg-secondary/20 text-secondary'}`}>
                  {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div className={`p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed ${msg.role === 'user' ? 'glass-card bg-accent/10 border-accent/20 rounded-tr-none' : 'glass-card bg-secondary/10 border-secondary/20 rounded-tl-none'}`}>
                  <p>{msg.content}</p>
                </div>
              </motion.div>
            ))}
            {loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/20 text-secondary flex items-center justify-center shrink-0">
                  <Bot size={20} />
                </div>
                <div className="p-4 glass-card bg-secondary/10 border-secondary/20 rounded-2xl rounded-tl-none">
                  <Loader2 className="animate-spin text-secondary" size={20} />
                </div>
              </motion.div>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default AIChat;
