import React from 'react';
import { motion } from 'framer-motion';

const TeamCard = ({ team }) => {
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
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{team.name}</h3>
            <p className="text-gray-600"><strong>Ranking:</strong> {team.ranking}</p>
            <p className="text-gray-600"><strong>ICC Points:</strong> {team.iccPoints}</p>
            <p className="text-gray-600"><strong>Coach:</strong> {team.coach}</p>
        </motion.div>
    );
};

export default TeamCard;