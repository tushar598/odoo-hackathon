const SkillCard = ({ user, onRequestSwap }) => {
  const avatarUrl =
    user.profilePhoto ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`;

  return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center text-center hover:shadow-md transition">
      <img
        src={avatarUrl}
        alt={`${user.name}'s avatar`}
        className="w-24 h-24 rounded-full object-cover mb-3 border"
      />
      <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>

      {user.location && (
        <p className="text-sm text-gray-500 mb-1">📍 {user.location}</p>
      )}

      <p className="text-sm mb-1">
        🎯 <strong>Offers:</strong>{' '}
        {user.skillsOffered?.length ? user.skillsOffered.join(', ') : 'N/A'}
      </p>

      <p className="text-sm mb-1">
        💡 <strong>Wants:</strong>{' '}
        {user.skillsWanted?.length ? user.skillsWanted.join(', ') : 'N/A'}
      </p>

      <p className="text-sm text-gray-600 mb-2">
        🕒 <strong>Available:</strong> {user.availability || 'N/A'}
      </p>

      <p className="text-xs text-yellow-600 mb-3">
        ⭐ Rating: {user.rating || 'Not rated'}
      </p>

      <button
        onClick={() => onRequestSwap(user)}
        className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-1 rounded text-sm font-semibold transition"
      >
        Request Swap
      </button>
    </div>
  );
};

export default SkillCard;
