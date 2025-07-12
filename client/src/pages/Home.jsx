// frontend/src/pages/Home.js
import { useEffect, useState } from 'react';
import api from '../services/api';
import SkillCard from '../components/SkillCard';
import SwapRequestModal from '../components/SwapRequestModal';

const Home = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const search = async () => {
    const res = await api.get(`/user/search?skill=${query}`);
    setUsers(res.data);
  };

  const checkLogin = async () => {
    try {
      await api.get('/user/me');
      setIsLoggedIn(true);
    } catch {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    search();
    checkLogin();
  }, []);

  const handleRequestSwap = (user) => {
    if (!isLoggedIn) {
      alert('Please log in to request a swap.');
      return;
    }
    setSelectedUser(user);
  };

  return (
    <div>
      <h1>Find Skill Swap Partners</h1>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search skill..." />
      <button onClick={search}>Search</button>
      <div className="card-grid">
        {users.map((user) => (
          <SkillCard key={user._id} user={user} onRequestSwap={handleRequestSwap} />
        ))}
      </div>
      {selectedUser && <SwapRequestModal user={selectedUser} onClose={() => setSelectedUser(null)} />}
    </div>
  );
};

export default Home;
