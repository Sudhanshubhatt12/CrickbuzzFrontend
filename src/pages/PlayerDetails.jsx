import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const PlayerDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [playerProfile, setPlayerProfile] = useState(null);
    const [player, setPlayer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        runsScored: '',
        wicketsTaken: '',
        battingAvg: '',
        bowlingAvg: ''
    });

    // Fetch player profile
    useEffect(() => {
        const fetchPlayerProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/profiles/${id}`);
                setPlayerProfile(response.data);
                // Fetch player details to get team info
                const playerResponse = await axios.get(`http://localhost:8080/api/players/${id}`);
                setPlayer(playerResponse.data);
                setFormData({
                    runsScored: response.data.runsScored || '',
                    wicketsTaken: response.data.wicketsTaken || '',
                    battingAvg: response.data.battingAvg || '',
                    bowlingAvg: response.data.bowlingAvg || ''
                });
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch player profile');
                setLoading(false);
            }
        };

        fetchPlayerProfile();
    }, [id]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Create or Update profile
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (playerProfile) {
                // Update existing profile
                await axios.put(`http://localhost:8080/api/profiles/${id}`, formData);
            } else {
                // Create new profile
                await axios.post(`http://localhost:8080/api/profiles/${id}`, formData);
            }
            setEditMode(false);
            // Refresh profile data
            const response = await axios.get(`http://localhost:8080/api/profiles/${id}`);
            setPlayerProfile(response.data);
        } catch (err) {
            setError('Failed to save profile');
        }
    };

    // Delete profile
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this profile?')) {
            try {
                await axios.delete(`http://localhost:8080/api/profiles/${id}`);
                navigate('/teams'); // Redirect after deletion
            } catch (err) {
                setError('Failed to delete profile');
            }
        }
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 max-w-4xl mx-auto"
        >
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                {player ? player.name : 'Player'}'s Profile
            </h1>

            {/* Profile Form or Display */}
            <motion.div
                className="bg-white shadow-lg rounded-lg p-6 mb-6"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                {editMode ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Runs Scored</label>
                                <input
                                    type="number"
                                    name="runsScored"
                                    value={formData.runsScored}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Wickets Taken</label>
                                <input
                                    type="number"
                                    name="wicketsTaken"
                                    value={formData.wicketsTaken}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Batting Average</label>
                                <input
                                    type="number"
                                    name="battingAvg"
                                    value={formData.battingAvg}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                    step="0.01"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Bowling Average</label>
                                <input
                                    type="number"
                                    name="bowlingAvg"
                                    value={formData.bowlingAvg}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                    step="0.01"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <motion.button
                                type="submit"
                                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Save
                            </motion.button>
                            <motion.button
                                type="button"
                                onClick={() => setEditMode(false)}
                                className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Cancel
                            </motion.button>
                        </div>
                    </form>
                ) : (
                    <div>
                        {playerProfile ? (
                            <div className="space-y-2">
                                <p><strong>Runs Scored:</strong> {playerProfile.runsScored}</p>
                                <p><strong>Wickets Taken:</strong> {playerProfile.wicketsTaken}</p>
                                <p><strong>Batting Average:</strong> {playerProfile.battingAvg}</p>
                                <p><strong>Bowling Average:</strong> {playerProfile.bowlingAvg}</p>
                            </div>
                        ) : (
                            <p>No profile found. Click "Add Profile" to create one.</p>
                        )}
                        <div className="mt-4 flex space-x-4">
                            <motion.button
                                onClick={() => setEditMode(true)}
                                className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {playerProfile ? 'Edit Profile' : 'Add Profile'}
                            </motion.button>
                            {playerProfile && (
                                <motion.button
                                    onClick={handleDelete}
                                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Delete Profile
                                </motion.button>
                            )}
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Team Info */}
            {player && player.teams && player.teams.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="bg-white shadow-lg rounded-lg p-6"
                >
                    <h2 className="text-2xl font-semibold mb-4">Teams</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {player.teams.map((team) => (
                            <motion.div
                                key={team.id}
                                onClick={() => navigate(`/teams/${team.id}`)}
                                className="p-4 bg-gray-50 rounded-lg cursor-pointer"
                                whileHover={{ scale: 1.03, backgroundColor: '#e5e7eb' }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <p><strong>{team.name}</strong></p>
                                <p>Ranking: {team.ranking}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Back Button */}
            <motion.button
                onClick={() => navigate('/teams')}
                className="mt-6 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Back to Teams
            </motion.button>
        </motion.div>
    );
};

export default PlayerDetails;