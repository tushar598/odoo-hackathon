import { useEffect, useState } from 'react';
import api from '../services/api';

const SwapRequests = () => {
  const [swaps, setSwaps] = useState([]);
  const [userId, setUserId] = useState(null);

  const loadSwaps = async () => {
    try {
      const userRes = await api.get('/user/me');
      setUserId(userRes.data._id);

      const res = await api.get('/swap');
      setSwaps(res.data);
    } catch (err) {
      console.error('Failed to load swaps:', err);
    }
  };

  const respond = async (id, action) => {
    try {
      await api.patch(`/swap/${id}/respond`, { action });
      loadSwaps();
    } catch (err) {
      alert('Failed to update swap.');
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`/swap/${id}`);
      loadSwaps();
    } catch (err) {
      alert('Failed to delete swap.');
    }
  };

  useEffect(() => {
    loadSwaps();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Swap Requests</h2>
      {swaps.length === 0 ? (
        <p className="text-gray-500">No swap requests yet.</p>
      ) : (
        <div className="space-y-4">
          {swaps.map((s) => {
            const isRecipient = s.toUser?._id === userId;
            const isOwner = s.fromUser?._id === userId;
            const canRespond = s.status === 'pending' && isRecipient;

            return (
              <div
                key={s._id}
                className="bg-white p-4 rounded shadow border space-y-2"
              >
                <p className="text-sm text-gray-700">
                  <strong>From:</strong> {s.fromUser?.name} &nbsp;
                  <strong>To:</strong> {s.toUser?.name}
                </p>
                <p className="text-sm">
                  <strong>Swap:</strong> {s.offeredSkill} ↔ {s.requestedSkill}
                </p>
                <p className="text-sm">
                  <strong>Status:</strong>{' '}
                  <span
                    className={
                      s.status === 'accepted'
                        ? 'text-green-600'
                        : s.status === 'rejected'
                        ? 'text-red-600'
                        : 'text-yellow-600'
                    }
                  >
                    {s.status}
                  </span>
                </p>

                <div className="flex gap-3 mt-2">
                  {canRespond && (
                    <>
                      <button
                        onClick={() => respond(s._id, 'accept')}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => respond(s._id, 'reject')}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {s.status === 'pending' && isOwner && (
                    <button
                      onClick={() => remove(s._id)}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SwapRequests;
