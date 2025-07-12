// frontend/src/components/SwapRequestModal.js
import { useState } from 'react';
import api from '../services/api';

const SwapRequestModal = ({ user, onClose }) => {
  const [form, setForm] = useState({
    offeredSkill: '',
    requestedSkill: '',
    message: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await api.post('/swap', {
      toUser: user._id,
      ...form,
    });
    alert('Swap request sent!');
    onClose();
  };

  return (
    <div className="modal">
      <h2>Request Swap with {user.name}</h2>
      <form onSubmit={handleSubmit}>
        <input name="offeredSkill" placeholder="Your skill" onChange={handleChange} required />
        <input name="requestedSkill" placeholder="Skill you want" onChange={handleChange} required />
        <textarea name="message" placeholder="Optional message" onChange={handleChange} />
        <button type="submit">Send Request</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default SwapRequestModal;
