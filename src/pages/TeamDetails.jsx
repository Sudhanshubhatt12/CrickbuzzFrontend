import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PlayerCard from '../components/PlayerCard';

const TeamDetails = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    axios.get(`/api/teams/${id}`).then((response) => {
      setTeam(response.data);
    });
  }, [id]);

  if (!team) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{team.name}</h1>
      <p>Coach: {team.coach}</p>
      <p>ICC Points: {team.iccpoints}</p>
      <h2 className="text-xl font-bold mt-4">Players</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {team.players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
};

export default TeamDetails;
