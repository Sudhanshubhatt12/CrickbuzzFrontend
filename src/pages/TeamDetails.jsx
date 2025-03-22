import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PlayerCard from '../components/PlayerCard'; // Assuming you have this component
import MatchCard from '../components/MatchCard'; // Assuming you have this component

const TeamDetails = () => {
    const { id } = useParams(); // Get the team ID from the URL
    const navigate = useNavigate();
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch team details on component mount
    useEffect(() => {
        const fetchTeamDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/teams/${id}`);
                setTeam(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch team details');
                setLoading(false);
            }
        };

        fetchTeamDetails();
    }, [id]);

    // Navigate to player details
    const handlePlayerClick = (playerId) => {
        navigate(`/players/${playerId}`);
    };

    // Navigate to match details
    const handleMatchClick = (matchId) => {
        navigate(`/matches/${matchId}`);
    };

    if (loading) return <div className="p-8">Loading...</div>;
    if (error) return <div className="p-8 text-red-500">{error}</div>;
    if (!team) return <div className="p-8">Team not found</div>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{team.name}</h1>
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <p><strong>Ranking:</strong> {team.ranking}</p>
                <p><strong>ICC Points:</strong> {team.iccPoints}</p>
                <p><strong>Coach:</strong> {team.coach}</p>
            </div>

            {/* Players Section */}
            <h2 className="text-2xl font-semibold mb-4">Players</h2>
            {team.players && team.players.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {team.players.map((player) => (
                        <div key={player.id} onClick={() => handlePlayerClick(player.id)} className="cursor-pointer">
                            <PlayerCard player={player} />
                        </div>
                    ))}
                </div>
            ) : (
                <p>No players found for this team.</p>
            )}

            {/* Matches Section */}
            <h2 className="text-2xl font-semibold mb-4">Matches</h2>
            {team.matches && team.matches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {team.matches.map((match) => (
                        <div key={match.id} onClick={() => handleMatchClick(match.id)} className="cursor-pointer">
                            <MatchCard match={match} />
                        </div>
                    ))}
                </div>
            ) : (
                <p>No matches found for this team.</p>
            )}

            {/* Back Button */}
            <button
                onClick={() => navigate('/teams')}
                className="mt-6 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
                Back to Teams
            </button>
        </div>
    );
};

export default TeamDetails;