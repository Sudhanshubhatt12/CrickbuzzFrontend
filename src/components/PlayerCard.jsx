import React from 'react';
import { Link } from 'react-router-dom';

const PlayerCard = ({ player }) => {
  return (
    <div className="border rounded-lg p-4 bg-gray-100">
      <h2 className="font-bold text-lg">{player.name}</h2>
      <p>Specialty: {player.speciality}</p>
      <Link to={`/players/${player.id}`} className="text-blue-500 underline">
        View Profile
      </Link>
    </div>
  );
};

export default PlayerCard;
