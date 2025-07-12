// frontend/src/components/SkillCard.js
const SkillCard = ({ user, onRequestSwap }) => {
  return (
    <div className="card">
      <img src={user.profilePhoto} alt="Profile" />
      <h3>{user.name}</h3>
      <p>📍 {user.location}</p>
      <p>🎯 Offers: {user.skillsOffered.join(', ')}</p>
      <p>💡 Wants: {user.skillsWanted.join(', ')}</p>
      <p>🕒 Available: {user.availability}</p>
      <button onClick={() => onRequestSwap(user)}>Request Swap</button>
    </div>
  );
};

export default SkillCard;
