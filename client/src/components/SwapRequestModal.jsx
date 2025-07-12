import { useState } from 'react';
import api from '../services/api';

const SwapRequestModal = ({ user, onClose }) => {
  const [form, setForm] = useState({
    offeredSkill: '',
    requestedSkill: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/swap', {
        toUser: user._id,
        ...form,
      });
      alert('Swap request sent!');
      onClose();
    } catch (err) {
      alert('Failed to send request.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
          Request Swap with {user.name}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Skill</label>
            <input
              type="text"
              name="offeredSkill"
              value={form.offeredSkill}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="e.g. Photoshop"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Skill You Want</label>
            <input
              type="text"
              name="requestedSkill"
              value={form.requestedSkill}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="e.g. Excel"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Optional Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              rows={3}
              placeholder="Any extra details?"
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm bg-purple-700 text-white rounded hover:bg-purple-800"
            >
              {loading ? 'Sending...' : 'Send Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SwapRequestModal;
