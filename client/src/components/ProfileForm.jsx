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

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get('/user/me');
        const user = res.data;
        setForm({
          ...user,
          skillsOffered: user.skillsOffered?.join(', ') || '',
          skillsWanted: user.skillsWanted?.join(', ') || '',
        });
      } catch (err) {
        console.error('Failed to load profile:', err);
      }
    };

    loadProfile();
  }, []);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePhotoUpload = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, profilePhoto: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const updates = {
        ...form,
        skillsOffered: form.skillsOffered.split(',').map(s => s.trim()),
        skillsWanted: form.skillsWanted.split(',').map(s => s.trim()),
      };
      await api.put('/user/me', updates);
      alert('Profile updated!');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Error updating profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow max-w-2xl mx-auto"
    >
      <div>
        <label className="block font-medium text-gray-700">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700">Location</label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700">Skills Offered</label>
        <input
          name="skillsOffered"
          value={form.skillsOffered}
          onChange={handleChange}
          placeholder="e.g. Photoshop, Excel"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700">Skills Wanted</label>
        <input
          name="skillsWanted"
          value={form.skillsWanted}
          onChange={handleChange}
          placeholder="e.g. Public Speaking, Python"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700">Availability</label>
        <input
          name="availability"
          value={form.availability}
          onChange={handleChange}
          placeholder="e.g. weekends, evenings"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700">Profile Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="block"
        />
        {form.profilePhoto && (
          <img
            src={form.profilePhoto}
            alt="Preview"
            className="mt-2 w-24 h-24 object-cover rounded-full"
          />
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isPublic"
          checked={form.isPublic}
          onChange={handleChange}
        />
        <label className="text-sm text-gray-700">Make profile public</label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded font-semibold transition"
      >
        {loading ? 'Saving...' : 'Save Profile'}
      </button>
    </form>
  );
};

export default ProfileForm;
