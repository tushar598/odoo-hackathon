// frontend/src/components/Navbar.js
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">SkillSwap</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/swaps">My Swaps</Link>
      <Link to="/admin">Admin</Link>
    </nav>
  );
};

export default Navbar;
