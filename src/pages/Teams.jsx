import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation
import TeamCard from '../components/TeamCard';

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [newTeam, setNewTeam] = useState({
        name: '',
        ranking: '',
        iccPoints: '',
        coach: ''
    });
    const [editTeam, setEditTeam] = useState(null);
    const navigate = useNavigate();

    // Fetch all teams on component mount
    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/teams');
            setTeams(response.data);
        } catch (error) {
            console.error('Error fetching teams:', error);
        }
    };

    // Handle form input changes for creating a new team
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTeam({ ...newTeam, [name]: value });
    };

    // Create a new team
    const handleCreateTeam = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/teams', newTeam);
            fetchTeams(); // Refresh the team list
            setNewTeam({ name: '', ranking: '', iccPoints: '', coach: '' }); // Reset form
        } catch (error) {
            console.error('Error creating team:', error);
        }
    };

    // Start editing a team
    const handleEditTeam = (team) => {
        setEditTeam(team);
        setNewTeam({
            name: team.name,
            ranking: team.ranking,
            iccPoints: team.iccPoints,
            coach: team.coach
        });
    };

    // Update a team
    const handleUpdateTeam = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/teams/${editTeam.id}`, newTeam);
            fetchTeams(); // Refresh the team list
            setEditTeam(null); // Exit edit mode
            setNewTeam({ name: '', ranking: '', iccPoints: '', coach: '' }); // Reset form
        } catch (error) {
            console.error('Error updating team:', error);
        }
    };

    // Delete a team
    const handleDeleteTeam = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/teams/${id}`);
            fetchTeams(); // Refresh the team list
        } catch (error) {
            console.error('Error deleting team:', error);
        }
    };

    // Navigate to team details
    const handleTeamClick = (id) => {
        navigate(`/team/${id}`);
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Teams</h1>

            {/* Form for creating/updating a team */}
            <form onSubmit={editTeam ? handleUpdateTeam : handleCreateTeam} className="mb-8">
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        value={newTeam.name}
                        onChange={handleInputChange}
                        placeholder="Team Name"
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        type="number"
                        name="ranking"
                        value={newTeam.ranking}
                        onChange={handleInputChange}
                        placeholder="Ranking"
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        type="number"
                        name="iccPoints"
                        value={newTeam.iccPoints}
                        onChange={handleInputChange}
                        placeholder="ICC Points"
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        type="text"
                        name="coach"
                        value={newTeam.coach}
                        onChange={handleInputChange}
                        placeholder="Coach"
                        className="border p-2 rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    {editTeam ? 'Update Team' : 'Add Team'}
                </button>
                {editTeam && (
                    <button
                        type="button"
                        onClick={() => {
                            setEditTeam(null);
                            setNewTeam({ name: '', ranking: '', iccPoints: '', coach: '' });
                        }}
                        className="mt-4 ml-2 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                )}
            </form>

            {/* Display teams */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {teams.map((team) => (
                    <div key={team.id}>
                        <TeamCard team={team} />
                        <div className="mt-2">
                            <button
                                onClick={() => handleTeamClick(team.id)}
                                className="bg-green-500 text-white p-1 rounded mr-2"
                            >
                                View Details
                            </button>
                            <button
                                onClick={() => handleEditTeam(team)}
                                className="bg-yellow-500 text-white p-1 rounded mr-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteTeam(team.id)}
                                className="bg-red-500 text-white p-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Teams;