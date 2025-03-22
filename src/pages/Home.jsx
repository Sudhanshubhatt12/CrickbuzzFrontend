import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import MatchCard from '../components/MatchCard';

const Home = () => {
    const navigate = useNavigate();
    const [matches, setMatches] = useState([]);
    const [teams, setTeams] = useState([]);
    const [newMatch, setNewMatch] = useState({
        date: '',
        venue: '',
        teamAId: '',
        teamBId: ''
    });

    // Fetch recent matches and teams
    useEffect(() => {
        const fetchData = async () => {
            try {
                const matchesResponse = await axios.get('http://localhost:8080/api/matches');
                setMatches(matchesResponse.data);
                const teamsResponse = await axios.get('http://localhost:8080/api/teams');
                setTeams(teamsResponse.data);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMatch({ ...newMatch, [name]: value });
    };

    // Create a new match
    const handleCreateMatch = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `http://localhost:8080/api/matches/teamA/${newMatch.teamAId}/teamB/${newMatch.teamBId}`,
                { date: newMatch.date, venue: newMatch.venue }
            );
            const response = await axios.get('http://localhost:8080/api/matches');
            setMatches(response.data);
            setNewMatch({ date: '', venue: '', teamAId: '', teamBId: '' });
        } catch (err) {
            console.error('Error creating match:', err);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-8"
        >
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Welcome to CricBuzz</h1>

            {/* Quick Links */}
            <motion.div
                className="flex justify-center space-x-4 mb-12"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <motion.button
                    onClick={() => navigate('/teams')}
                    className="bg-blue-500 text-white p-3 rounded-lg shadow-md"
                    whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(0,0,255,0.3)' }}
                    whileTap={{ scale: 0.95 }}
                >
                    View Teams
                </motion.button>
                <motion.button
                    onClick={() => navigate('/matches')}
                    className="bg-green-500 text-white p-3 rounded-lg shadow-md"
                    whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(0,255,0,0.3)' }}
                    whileTap={{ scale: 0.95 }}
                >
                    View Matches
                </motion.button>
            </motion.div>

            {/* Create Match Form */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="bg-white shadow-lg rounded-lg p-6 mb-12 max-w-2xl mx-auto"
            >
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Schedule a New Match</h2>
                <form onSubmit={handleCreateMatch} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Team A</label>
                            <select
                                name="teamAId"
                                value={newMatch.teamAId}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="">Select Team A</option>
                                {teams.map((team) => (
                                    <option key={team.id} value={team.id}>{team.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Team B</label>
                            <select
                                name="teamBId"
                                value={newMatch.teamBId}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="">Select Team B</option>
                                {teams.map((team) => (
                                    <option key={team.id} value={team.id}>{team.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={newMatch.date}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Venue</label>
                            <input
                                type="text"
                                name="venue"
                                value={newMatch.venue}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                    </div>
                    <motion.button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Schedule Match
                    </motion.button>
                </form>
            </motion.div>

            {/* Recent Matches */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
            >
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Recent Matches</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {matches.map((match) => (
                        <motion.div
                            key={match.id}
                            onClick={() => navigate(`/matches/${match.id}`)}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="cursor-pointer"
                        >
                            <MatchCard match={match} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Home;