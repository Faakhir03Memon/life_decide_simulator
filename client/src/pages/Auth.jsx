import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import { User, Mail, Lock, LogIn, UserPlus, ArrowRight } from 'lucide-react';
import { signIn, signUp } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = isLogin ? await signIn(formData) : await signUp(formData);
      localStorage.setItem('profile', JSON.stringify(data));
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] py-8">
      <GlassCard className="w-full max-w-md p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-secondary to-accent"></div>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">{isLogin ? 'Welcome Back' : 'Join FuturePath'}</h2>
          <p className="text-slate-400 text-sm">Empower your career decisions with AI.</p>
        </div>

        {error && <div className="p-3 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg text-xs mb-6 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-slate-500 uppercase tracking-widest pl-1 font-bold">Full Name</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-3 outline-none focus:border-accent/50 transition-all text-sm"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-500 uppercase tracking-widest pl-1 font-bold">Email Address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-3 outline-none focus:border-accent/50 transition-all text-sm"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-500 uppercase tracking-widest pl-1 font-bold">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                placeholder="********"
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-3 outline-none focus:border-accent/50 transition-all text-sm"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-accent text-primary font-bold rounded-xl mt-4 hover:bg-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/20"
          >
            {loading ? 'Processing...' : (isLogin ? <>Login <LogIn size={18} /></> : <>Create Account <UserPlus size={18} /></>)}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-slate-400 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-accent ml-2 font-semibold hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </GlassCard>
    </div>
  );
};

export default Auth;
