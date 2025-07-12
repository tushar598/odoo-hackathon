// frontend/src/pages/Profile.js
import ProfileForm from '../components/ProfileForm';

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Profile</h2>
      <ProfileForm />
    </div>
  );
};

export default Profile;
