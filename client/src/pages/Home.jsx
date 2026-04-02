import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import { Compass, Zap, Bot, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center gap-8 relative overflow-hidden">
      {/* Background Animated Lines */}
      <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent animate-glow-line opacity-30"></div>
      <div className="absolute bottom-1/4 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary to-transparent animate-glow-line opacity-30 reverse"></div>

      {/* Hero Content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="w-32 h-32 bg-accent/20 rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
        <Compass size={80} className="text-accent mb-4 mx-auto relative z-10" />
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-white via-accent to-secondary bg-clip-text text-transparent">
          FuturePath
        </h1>
        <p className="text-xl md:text-2xl text-slate-400 mt-4 max-w-2xl">
          Decide Your Future Smarter. Simulate life-changing career choices with AI guidance.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-12">
        <GlassCard className="flex flex-col items-center gap-4 hover:border-accent/50 transition-all cursor-pointer">
          <Zap className="text-accent" size={32} />
          <h3 className="text-xl font-semibold">Explore Paths</h3>
          <p className="text-slate-400 text-sm">Compare Job, Freelancing, and Business paths for your skills.</p>
        </GlassCard>

        <GlassCard className="flex flex-col items-center gap-4 hover:border-secondary/50 transition-all cursor-pointer">
          <Bot className="text-secondary" size={32} />
          <h3 className="text-xl font-semibold">AI Advisor</h3>
          <p className="text-slate-400 text-sm">Get personalized roadmaps and career suggestions instantly.</p>
        </GlassCard>

        <GlassCard className="flex flex-col items-center gap-4 hover:border-accent/50 transition-all cursor-pointer">
          <Compass size={32} className="text-accent" />
          <h3 className="text-xl font-semibold">Simulation</h3>
          <p className="text-slate-400 text-sm">See income ranges, difficulty, and risk before you leap.</p>
        </GlassCard>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12"
      >
        <Link to="/simulator">
          <button className="px-8 py-4 bg-accent text-primary font-bold rounded-full text-lg flex items-center gap-2 hover:bg-white transition-all neon-glow group">
            Get Started <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
