import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MatchDetails = () => {
  const { id } = useParams();
  const [match, setMatch] = useState(null);

  useEffect(() => {
    axios.get(`/api/cricketmatches/${id}`).then((response) => {
      setMatch(response.data);
    });
  }, [id]);

  if (!match) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{match.title}</h1>
      <p>Venue: {match.venue}</p>
      <p>No of Overs: {match.noofover}</p>
      <p>Teams: {match.teams.join(' vs ')}</p>
    </div>
  );
};

export default MatchDetails;
