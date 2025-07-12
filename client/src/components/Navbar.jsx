// frontend/src/components/Navbar.js
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <div className="text-xl font-semibold text-purple-700">
        <Link to="/">SkillSwap</Link>
      </div>
      <div className="flex gap-4 text-sm font-medium text-gray-700">
        <Link to="/" className="hover:text-purple-700 transition-colors">Home</Link>
        <Link to="/profile" className="hover:text-purple-700 transition-colors">Profile</Link>
        <Link to="/swaps" className="hover:text-purple-700 transition-colors">My Swaps</Link>
        <Link to="/admin" className="hover:text-purple-700 transition-colors">Admin</Link>
      </div>
    </nav>
  );
};

export default Navbar;
