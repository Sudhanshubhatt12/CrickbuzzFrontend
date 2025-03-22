import React from 'react';
import { motion } from 'framer-motion';

const MatchCard = ({ match }) => {
    // Assuming match.teams is an array of two teams
    const teamA = match.teams && match.teams.length > 0 ? match.teams[0] : { name: 'TBD' };
    const teamB = match.teams && match.teams.length > 1 ? match.teams[1] : { name: 'TBD' };

    return (
        <motion.div
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 cursor-pointer"
            whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                transition: { type: 'spring', stiffness: 300 }
            }}
            whileTap={{ scale: 0.95 }}
        >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {teamA.name} vs {teamB.name}
            </h3>
            <p className="text-gray-600"><strong>Date:</strong> {match.date || 'TBD'}</p>
            <p className="text-gray-600"><strong>Venue:</strong> {match.venue || 'TBD'}</p>
        </motion.div>
    );
};

export default MatchCard;