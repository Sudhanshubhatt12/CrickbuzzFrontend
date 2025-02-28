import React from 'react';
import { Link } from 'react-router-dom';

const TeamCard = ({ team }) => {
  return (
    <div className="border rounded-lg p-4 bg-gray-100">
      <h2 className="font-bold text-lg">{team.name}</h2>
      <p>Ranking: {team.ranking}</p>
      <p>Coach: {team.coach}</p>
      <Link to={`/teams/${team.id}`} className="text-blue-500 underline">
        View Details
      </Link>
    </div>
  );
};

export default TeamCard;
