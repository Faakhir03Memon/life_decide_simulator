import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Simulator from './pages/Simulator';
import AIChat from './pages/AIChat';
import Reviews from './pages/Reviews';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-primary text-white pb-24 md:pb-0 md:pt-24">
        <Navbar />
        <main className="container mx-auto px-4 max-w-6xl">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/simulator" element={<Simulator />} />
              <Route path="/ai-chat" element={<AIChat />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}

export default App;
