import { Link } from 'react-router-dom';
import { Compass, BarChart2, Star, User, MessageSquare } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-lg glass-card z-50 flex items-center justify-around py-4 px-6 md:top-6 md:bottom-auto">
      <Link to="/" className="text-secondary hover:text-accent transition-colors"><Compass size={24} /></Link>
      <Link to="/simulator" className="text-secondary hover:text-accent transition-colors"><BarChart2 size={24} /></Link>
      <Link to="/ai-chat" className="text-secondary hover:text-accent transition-colors"><MessageSquare size={24} /></Link>
      <Link to="/reviews" className="text-secondary hover:text-accent transition-colors"><Star size={24} /></Link>
      <Link to="/profile" className="text-secondary hover:text-accent transition-colors"><User size={24} /></Link>
    </nav>
  );
};

export default Navbar;
