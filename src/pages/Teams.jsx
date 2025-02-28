import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import { teams } from "../dummyData";
import TeamCard from '../components/TeamCard';

const Teams = () => {
  const [team, setTeams] = useState([]);

  useEffect(() => {
    // axios.get('/api/teams').then((response) => {
    //   setTeams(response.data);
    // });
    setTeams(teams);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Teams</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {team.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
};

export default Teams;
