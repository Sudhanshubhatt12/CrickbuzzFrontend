import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const MatchDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [match, setMatch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        date: '', // Assuming MatchRequest has a date field
        venue: '' // Assuming MatchRequest has a venue field
    });

    // Fetch match details
    useEffect(() => {
        const fetchMatchDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/matches/${id}`);
                setMatch(response.data);
                setFormData({
                    date: response.data.date || '',
                    venue: response.data.venue || ''
                });
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch match details');
                setLoading(false);
            }
        };

        fetchMatchDetails();
    }, [id]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Update match
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/matches/${id}`, formData);
            setEditMode(false);
            const response = await axios.get(`http://localhost:8080/api/matches/${id}`);
            setMatch(response.data);
        } catch (err) {
            setError('Failed to update match');
        }
    };

    // Delete match
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this match?')) {
            try {
                await axios.delete(`http://localhost:8080/api/matches/${id}`);
                navigate('/matches'); // Redirect after deletion
            } catch (err) {
                setError('Failed to delete match');
            }
        }
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
    if (!match) return <div className="p-8 text-center">Match not found</div>;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 max-w-4xl mx-auto"
        >
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Match Details</h1>

            {/* Match Form or Display */}
            <motion.div
                className="bg-white shadow-lg rounded-lg p-6 mb-6"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                {editMode ? (
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
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
                                    value={formData.venue}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
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
                        <div className="space-y-2">
                            <p><strong>Date:</strong> {match.date || 'N/A'}</p>
                            <p><strong>Venue:</strong> {match.venue || 'N/A'}</p>
                        </div>
                        <div className="mt-4 flex space-x-4">
                            <motion.button
                                onClick={() => setEditMode(true)}
                                className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Edit Match
                            </motion.button>
                            <motion.button
                                onClick={handleDelete}
                                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Delete Match
                            </motion.button>
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Teams Involved */}
            {match.teams && match.teams.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="bg-white shadow-lg rounded-lg p-6"
                >
                    <h2 className="text-2xl font-semibold mb-4">Teams Involved</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {match.teams.map((team) => (
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
                onClick={() => navigate('/matches')}
                className="mt-6 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Back to Matches
            </motion.button>
        </motion.div>
    );
};

export default MatchDetails;