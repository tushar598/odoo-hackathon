import { useEffect, useState } from 'react';
import api from '../services/api';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [swaps, setSwaps] = useState([]);

  const load = async () => {
    try {
      const [usersRes, swapsRes] = await Promise.all([
        api.get('/admin/users'),
        api.get('/admin/swaps'),
      ]);
      setUsers(usersRes.data);
      setSwaps(swapsRes.data);
    } catch (err) {
      console.error('Admin load error:', err);
    }
  };

  const banUser = async (id) => {
    try {
      await api.patch(`/admin/users/${id}/ban`);
      await load();
    } catch (err) {
      alert('Error banning user.');
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>

      <div className="mb-10">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">All Users</h3>
        <div className="space-y-2">
          {users.map((u) => (
            <div
              key={u._id}
              className="flex items-center justify-between bg-white p-4 rounded shadow border"
            >
              <div>
                <p className="font-medium text-gray-800">{u.name}</p>
                <p className="text-sm text-gray-500">
                  {u.email} {u.isBanned && <span className="text-red-600 ml-2 font-semibold">(BANNED)</span>}
                </p>
              </div>
              {!u.isBanned && (
                <button
                  onClick={() => banUser(u._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm"
                >
                  Ban
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">All Swaps</h3>
        <p className="mb-4 text-gray-600">Total Swaps: {swaps.length}</p>
        <div className="grid gap-4">
          {swaps.map((swap) => (
            <div
              key={swap._id}
              className="p-4 bg-white rounded border shadow text-sm"
            >
              <p><strong>From:</strong> {swap.fromUser?.name || 'N/A'}</p>
              <p><strong>To:</strong> {swap.toUser?.name || 'N/A'}</p>
              <p><strong>Skills:</strong> {swap.offeredSkill} ↔ {swap.requestedSkill}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span
                  className={
                    swap.status === 'accepted'
                      ? 'text-green-600'
                      : swap.status === 'rejected'
                      ? 'text-red-600'
                      : 'text-yellow-600'
                  }
                >
                  {swap.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
