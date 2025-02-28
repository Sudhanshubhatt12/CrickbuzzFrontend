import React from 'react';

const MatchCard = ({ match }) => {
  return (
    <div className="border rounded-lg p-4 bg-gray-100">
      <h2 className="font-bold text-lg">{match.title}</h2>
      <p>Venue: {match.venue}</p>
      <p>Teams: {match.teams.join(' vs ')}</p>
    </div>
  );
};

export default MatchCard;
