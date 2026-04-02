import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import { TrendingUp, Clock, AlertTriangle, Briefcase, Zap, CheckCircle } from 'lucide-react';
import { saveDecision } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Simulator = () => {
  const [career, setCareer] = useState('Web Development');
  const [path, setPath] = useState('Freelancing');
  const [time, setTime] = useState(50);
  const [budget, setBudget] = useState(20);
  const [risk, setRisk] = useState(30);
  const [results, setResults] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const careers = ['Web Development', 'UI/UX Design', 'Amazon VA', 'Graphic Design', 'Content Writing'];
  const paths = ['Job', 'Freelancing', 'Business'];

  const calculateResults = () => {
    // Basic simulation logic
    const income = career === 'Web Development' ? '$500 - $3000' : career === 'UI/UX Design' ? '$400 - $2500' : '$200 - $1500';
    const learningTime = career === 'Web Development' ? '6-8 Months' : career === 'UI/UX Design' ? '4-6 Months' : '2-3 Months';
    const difficulty = (time > 70) ? 'Easy' : (time > 40) ? 'Medium' : 'Hard';
    const riskLevel = (risk > 80) ? 'Extreme' : (risk > 40) ? 'Moderate' : 'Conservative';

    setResults({
      income,
      learningTime,
      difficulty,
      riskLevel,
      skills: career === 'Web Development' ? ['HTML/CSS', 'JS', 'React', 'Node'] : ['Figma', 'UI Theory', 'User Research'],
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const decisionData = {
        career,
        path,
        inputs: { timeInvestment: time, budget: budget * 50, riskTolerance: risk },
        results: results
      };
      await saveDecision(decisionData);
      setSaved(true);
      setTimeout(() => navigate('/profile'), 1500);
    } catch (error) {
      console.error(error);
      alert("Please login to save your decisions!");
      navigate('/auth');
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    calculateResults();
  }, [career, path, time, budget, risk]);

  return (
    <div className="flex flex-col gap-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold text-accent">Decision Simulator</h2>
        <p className="text-slate-400">Tweak your parameters and see how your future path changes.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Controls */}
        <GlassCard className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="text-accent" size={20} /> Select Career</h3>
            <div className="flex flex-wrap gap-2">
              {careers.map((c) => (
                <button
                  key={c}
                  onClick={() => setCareer(c)}
                  className={`px-4 py-2 rounded-full text-sm border transition-all ${career === c ? 'bg-accent text-primary border-accent' : 'border-slate-700 hover:border-accent/50'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold flex items-center gap-2"><Zap className="text-secondary" size={20} /> Select Path</h3>
            <div className="flex gap-2">
              {paths.map((p) => (
                <button
                  key={p}
                  onClick={() => setPath(p)}
                  className={`px-4 py-2 rounded-full text-sm border transition-all ${path === p ? 'bg-secondary text-white border-secondary' : 'border-slate-700 hover:border-secondary/50'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6 mt-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span>Time Investment</span>
                <span className="text-accent">{time} hrs/week</span>
              </div>
              <input type="range" min="0" max="100" value={time} onChange={(e) => setTime(e.target.value)} className="w-full accent-accent" />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span>Budget (USD)</span>
                <span className="text-secondary">${budget * 50}</span>
              </div>
              <input type="range" min="0" max="100" value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full accent-secondary" />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span>Risk Tolerance</span>
                <span className="text-accent">{risk}%</span>
              </div>
              <input type="range" min="0" max="100" value={risk} onChange={(e) => setRisk(e.target.value)} className="w-full accent-accent" />
            </div>
          </div>
        </GlassCard>

        {/* Results Panel */}
        <div className="flex flex-col gap-6">
          <GlassCard className="border-accent/30 neon-glow">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-accent"><TrendingUp size={24} /> Simulation Results</h3>
            {results && (
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-400 uppercase tracking-widest">Expected Income</span>
                  <span className="text-2xl font-bold text-white">{results.income}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-400 uppercase tracking-widest">Difficulty</span>
                  <span className={`text-xl font-bold ${results.difficulty === 'Easy' ? 'text-green-400' : results.difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>
                    {results.difficulty}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-400 uppercase tracking-widest">Time to Learn</span>
                  <span className="text-lg font-semibold flex items-center gap-1"><Clock size={16} /> {results.learningTime}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-400 uppercase tracking-widest">Risk Level</span>
                  <span className="text-lg font-semibold flex items-center gap-1 text-red-500"><AlertTriangle size={16} /> {results.riskLevel}</span>
                </div>
              </div>
            )}
          </GlassCard>

          <GlassCard className="flex-1">
            <h3 className="text-lg font-semibold mb-4">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {results?.skills.map((skill) => (
                <span key={skill} className="px-3 py-1 bg-white/10 rounded-md text-sm border border-white/5">{skill}</span>
              ))}
            </div>
            <button 
              onClick={handleSave}
              disabled={saving || saved}
              className={`w-full mt-6 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${saved ? 'bg-green-500 text-white' : 'bg-secondary hover:bg-secondary/80 text-white'}`}
            >
              {saving ? 'Saving...' : saved ? <>Saved! <CheckCircle size={18} /></> : <>Save Decision <Zap size={18} /></>}
            </button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
