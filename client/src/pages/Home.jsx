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
    try {
      const endpoint = query.trim()
        ? `/user/search?skill=${encodeURIComponent(query)}`
        : '/user/search';
      const res = await api.get(endpoint);
      // Only show public profiles
      const publicProfiles = res.data.filter((user) => user.isPublic);
      setUsers(publicProfiles);
    } catch (err) {
      console.error('Search error:', err);
    }
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Find Skill Swap Partners</h1>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search skill..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
        />
        <button
          onClick={search}
          className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md text-sm font-semibold transition"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">
            {query ? `No users found for "${query}".` : 'No public users available.'}
          </p>
        ) : (
          users.map((user) => (
            <SkillCard key={user._id} user={user} onRequestSwap={handleRequestSwap} />
          ))
        )}
      </div>

      {selectedUser && (
        <SwapRequestModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
};

export default Home;
