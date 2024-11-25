import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ClubCard({ 
    id, 
    name, 
    status, 
    memberCount,
    size = 'md'  // Add size prop with default value
}) {
    const navigate = useNavigate();

    // Same size variants as BookCard
    const sizeClasses = {
        sm: 'w-32',
        md: 'w-48',
        lg: 'w-64',
    };

    return (
        <div 
            onClick={() => navigate(`/clubs/${id}`)}
            className={`${sizeClasses[size]} h-64 bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200 mx-2`}
        >
            <div className="p-4 flex flex-col h-full">
                <h3 className="text-lg font-semibold text-white mb-2">{name}</h3>
                <div className="mt-auto">
                    <span className={`inline-block px-2 py-1 rounded text-sm ${
                        status === 'Open' ? 'bg-green-600' : 'bg-red-600'
                    }`}>
                        {status}
                    </span>
                    <p className="text-gray-400 mt-2">{memberCount} member{memberCount !== 1 ? 's' : ''}</p>
                </div>
            </div>
        </div>
    );
} 