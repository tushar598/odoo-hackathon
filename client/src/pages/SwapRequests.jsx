// frontend/src/pages/SwapRequests.js
import { useEffect, useState } from 'react';
import api from '../services/api';

const SwapRequests = () => {
  const [swaps, setSwaps] = useState([]);

  const loadSwaps = async () => {
    const res = await api.get('/swap');
    setSwaps(res.data);
  };

  const respond = async (id, action) => {
    await api.patch(`/swap/${id}/respond`, { action });
    loadSwaps();
  };

  const remove = async (id) => {
    await api.delete(`/swap/${id}`);
    loadSwaps();
  };

  useEffect(() => {
    loadSwaps();
  }, []);

  return (
    <div>
      <h2>Swap Requests</h2>
      {swaps.map(s => (
        <div key={s._id} className="card">
          <p>From: {s.fromUser?.name}</p>
          <p>To: {s.toUser?.name}</p>
          <p>{s.offeredSkill} ↔ {s.requestedSkill}</p>
          <p>Status: {s.status}</p>
          {s.status === 'pending' && (
            <>
              {s.toUser?._id === s.fromUser?._id ? null : (
                <>
                  <button onClick={() => respond(s._id, 'accept')}>Accept</button>
                  <button onClick={() => respond(s._id, 'reject')}>Reject</button>
                </>
              )}
              <button onClick={() => remove(s._id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default SwapRequests;
