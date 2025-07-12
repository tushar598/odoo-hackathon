// frontend/src/components/ProfileForm.js
import { useState, useEffect } from 'react';
import api from '../services/api';

const ProfileForm = () => {
  const [form, setForm] = useState({
    name: '',
    location: '',
    skillsOffered: '',
    skillsWanted: '',
    availability: '',
    isPublic: true,
    profilePhoto: '',
  });

  useEffect(() => {
    api.get('/user/me').then(res => setForm(res.data));
  }, []);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePhotoUpload = e => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, profilePhoto: reader.result }));
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const updates = {
      ...form,
      skillsOffered: form.skillsOffered.split(','),
      skillsWanted: form.skillsWanted.split(','),
    };
    await api.put('/user/me', updates);
    alert('Profile updated!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Profile</h2>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="location" value={form.location} onChange={handleChange} placeholder="Location" />
      <input name="skillsOffered" value={form.skillsOffered} onChange={handleChange} placeholder="Skills Offered (comma separated)" />
      <input name="skillsWanted" value={form.skillsWanted} onChange={handleChange} placeholder="Skills Wanted (comma separated)" />
      <input name="availability" value={form.availability} onChange={handleChange} placeholder="Availability (e.g. weekends)" />
      <input type="file" accept="image/*" onChange={handlePhotoUpload} />
      <label>
        <input type="checkbox" name="isPublic" checked={form.isPublic} onChange={handleChange} />
        Make profile public
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default ProfileForm;
