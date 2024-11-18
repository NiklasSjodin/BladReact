import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/**
 * Enhanced SectionHeader Component
 * Features:
 * - Optional view all link
 * - Customizable styles
 * - Optional icon
 * - Optional description
 * @param {Object} props
 * @param {string} props.title - Section title
 * @param {string} props.viewAllLink - Optional link for view all
 * @param {string} props.description - Optional description text
 * @param {string} props.variant - Style variant ('default', 'large')
 */
export const SectionHeader = ({ 
    title, 
    viewAllLink, 
    description,
    variant = 'default'
}) => {
    const titleClasses = {
        default: 'text-xl font-bold text-white',
        large: 'text-2xl font-bold text-white'
    };

    return (
        <div className='space-y-2 mb-6'>
            <div className='flex items-center justify-between'>
                <h2 className={titleClasses[variant]}>{title}</h2>
                {viewAllLink && (
                    <Link 
                        to={viewAllLink}
                        className='text-blue-400 hover:text-blue-300 
                                 transition-colors duration-200
                                 flex items-center gap-2'
                    >
                        View All
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                )}
            </div>
            {description && (
                <p className='text-gray-400 text-sm'>{description}</p>
            )}
        </div>
    );
};
