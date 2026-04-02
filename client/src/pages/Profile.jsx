import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import { User, Award, History, TrendingUp, ShieldCheck, LogOut } from 'lucide-react';
import { fetchProfile } from '../services/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await fetchProfile();
        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getProfile();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
    </div>
  );

  if (!user) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <GlassCard className="text-center p-12">
        <ShieldCheck size={64} className="text-slate-600 mx-auto mb-4 opacity-20" />
        <h2 className="text-2xl font-bold mb-2">Account Required</h2>
        <p className="text-slate-400 mb-6">Please login to view your profile and saved decisions.</p>
        <button className="bg-accent text-primary px-8 py-3 rounded-full font-bold hover:bg-white transition-all">Login / Sign Up</button>
      </GlassCard>
    </div>
  );

  return (
    <div className="flex flex-col gap-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-accent">User Dashboard</h2>
        <button className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors">
          <LogOut size={18} /> Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Card */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <GlassCard className="flex flex-col items-center text-center gap-4 border-accent/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-secondary to-accent"></div>
            <div className="w-24 h-24 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {user.name?.charAt(0)}
            </div>
            <div>
              <h3 className="text-2xl font-bold uppercase tracking-tight">{user.name}</h3>
              <p className="text-sm text-slate-400">{user.email}</p>
            </div>
            <div className="w-full flex justify-around p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">Global XP</span>
                <span className="text-xl font-bold text-accent">{user.profile?.xp || 0}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">Badges</span>
                <span className="text-xl font-bold text-secondary">{user.profile?.badges?.length || 0}</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Award size={20} className="text-accent" /> Achievement Badges</h3>
            <div className="flex flex-wrap gap-3">
              {user.profile?.badges?.length > 0 ? (
                user.profile.badges.map(badge => (
                  <div key={badge} className="flex flex-col items-center gap-1 group">
                    <div className="w-12 h-12 bg-accent/20 border border-accent/30 rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all cursor-help">
                      <Award size={24} />
                    </div>
                    <span className="text-[10px] uppercase font-semibold text-slate-500">{badge}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 italic">No badges earned yet. Start exploring to earn some!</p>
              )}
            </div>
          </GlassCard>
        </div>

        {/* History & Roadmaps */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <GlassCard className="flex-1">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><History size={24} className="text-secondary" /> Decision History</h3>
            <div className="flex flex-col gap-4">
              {user.savedDecisions?.length > 0 ? (
                user.savedDecisions.map((dec, i) => (
                  <div key={dec._id || i} className="p-4 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between hover:border-secondary/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary">
                        <TrendingUp size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{dec.career}</h4>
                        <p className="text-xs text-slate-500">{dec.path} • {new Date(dec.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <button className="text-xs text-secondary hover:underline">View Roadmap</button>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 flex flex-col items-center gap-4">
                  <p className="text-slate-500 italic">No history yet.</p>
                  <button className="text-accent text-sm font-semibold border-b border-accent border-dashed">Start first simulation</button>
                </div>
              )}
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="text-lg font-semibold mb-4 text-accent">Personalized Roadmap Status</h3>
            <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(user.profile?.xp % 100)}%` }}
                className="bg-accent h-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"
              ></motion.div>
            </div>
            <div className="flex justify-between mt-2 text-[10px] uppercase font-bold text-slate-500 tracking-tighter">
              <span>Current Level: Apprentice</span>
              <span className="text-accent">{100 - (user.profile?.xp % 100)} XP to next badge</span>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Profile;
