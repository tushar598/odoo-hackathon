// frontend/src/pages/AdminDashboard.js
import { useEffect, useState } from 'react';
import api from '../services/api';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [swaps, setSwaps] = useState([]);

  const load = async () => {
    const u = await api.get('/admin/users');
    const s = await api.get('/admin/swaps');
    setUsers(u.data);
    setSwaps(s.data);
  };

  const banUser = async (id) => {
    await api.patch(`/admin/users/${id}/ban`);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>All Users</h3>
      {users.map(u => (
        <div key={u._id}>
          <span>{u.name} {u.isBanned && '(BANNED)'}</span>
          {!u.isBanned && <button onClick={() => banUser(u._id)}>Ban</button>}
        </div>
      ))}

      <h3>All Swaps</h3>
      <p>Total Swaps: {swaps.length}</p>
    </div>
  );
};

export default AdminDashboard;
