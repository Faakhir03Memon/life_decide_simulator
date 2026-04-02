import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import { Star, MessageSquare, Send, User, Filter } from 'lucide-react';
import { fetchReviews, createReview } from '../services/api';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ career: 'Web Development', rating: 5, comment: '' });
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('All');

  const careers = ['All', 'Web Development', 'UI/UX Design', 'Amazon VA', 'Graphic Design'];

  const getReviewList = async () => {
    try {
      const { data } = await fetchReviews();
      setReviews(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getReviewList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.comment) return;
    
    setLoading(true);
    try {
      await createReview(newReview);
      setNewReview({ ...newReview, comment: '' });
      getReviewList();
    } catch (error) {
      console.error(error);
      alert("Please login to post a review!");
    } finally {
      setLoading(false);
    }
  };

  const filteredReviews = filter === 'All' ? reviews : reviews.filter(r => r.career === filter);

  return (
    <div className="flex flex-col gap-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-accent">Career Reviews</h2>
          <p className="text-slate-400">See what others are saying about different career paths.</p>
        </div>
        
        <div className="flex items-center gap-2 glass-card p-2">
          <Filter size={18} className="text-slate-400 ml-2" />
          <select 
            className="bg-transparent border-none outline-none text-sm p-1 cursor-pointer"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {careers.map(c => <option key={c} value={c} className="bg-primary">{c}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Post a Review */}
        <div className="lg:col-span-1">
          <GlassCard className="sticky top-24 border-accent/20">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-accent"><MessageSquare size={20} /> Share Your Experience</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-400 uppercase tracking-widest pl-1">Career Path</label>
                <select 
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-accent/50 transition-all text-sm"
                  value={newReview.career}
                  onChange={(e) => setNewReview({...newReview, career: e.target.value})}
                >
                  {careers.slice(1).map(c => <option key={c} value={c} className="bg-primary">{c}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-400 uppercase tracking-widest pl-1">Rating</label>
                <div className="flex gap-2 p-2">
                  {[1,2,3,4,5].map(num => (
                    <Star 
                      key={num} 
                      size={24} 
                      className={`cursor-pointer transition-all ${newReview.rating >= num ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`}
                      onClick={() => setNewReview({...newReview, rating: num})}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-400 uppercase tracking-widest pl-1">Your Review</label>
                <textarea 
                  placeholder="Share your thoughts..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 h-32 outline-none focus:border-accent/50 transition-all text-sm resize-none"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-accent text-primary font-bold rounded-xl mt-2 hover:bg-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Posting...' : <>Post Review <Send size={18} /></>}
              </button>
            </form>
          </GlassCard>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {filteredReviews.length === 0 ? (
            <GlassCard className="text-center py-20 flex flex-col items-center gap-4">
              <MessageSquare size={48} className="text-slate-600 opacity-20" />
              <p className="text-slate-400 italic">No reviews found for this path. Be the first to share!</p>
            </GlassCard>
          ) : (
            filteredReviews.map((rev, i) => (
              <motion.div
                key={rev._id || i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="group hover:border-accent/30 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                        <User size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{rev.user?.name || 'Anonymous User'}</h4>
                        <span className="text-xs text-accent bg-accent/10 px-2 py-0.5 rounded-full">{rev.career}</span>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < rev.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-700'} />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">"{rev.comment}"</p>
                  <div className="mt-4 pt-4 border-t border-white/5 text-[10px] text-slate-500 uppercase tracking-widest">
                    Posted on {new Date(rev.createdAt).toLocaleDateString()}
                  </div>
                </GlassCard>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
