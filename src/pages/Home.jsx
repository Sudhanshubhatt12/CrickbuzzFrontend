import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import { matches } from "../dummyData";
import MatchCard from '../components/MatchCard';

const Home = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // axios.get('/api/cricketmatches').then((response) => {
    //   setMatches(response.data);
    // });
    setMatches(matches);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Ongoing Matches</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
};

export default Home;
