import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { players } from "../dummyData";

const PlayerDetails = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    // Simulating API response with dummy data
    setPlayer(players[id]);
  }, [id]);

  if (!player) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{player.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Player Basic Information */}
        <div className="space-y-2">
          <p><strong>Age:</strong> {player.age}</p>
          <p><strong>Gender:</strong> {player.gender}</p>
          <p><strong>Email:</strong> {player.email}</p>
          <p><strong>Specialty:</strong> {player.speciality}</p>
        </div>

        {/* Player Statistics */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold">Statistics</h2>
          <p><strong>Runs Scored:</strong> {player.playerProfile.runscored}</p>
          <p><strong>Wickets Taken:</strong> {player.playerProfile.wicketstaken}</p>
          <p><strong>Batting Average:</strong> {player.playerProfile.battingavg}</p>
          <p><strong>Bowling Average:</strong> {player.playerProfile.bowlingavg}</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetails;
