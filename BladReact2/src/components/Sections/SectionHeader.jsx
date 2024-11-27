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
        default: 'text-xl font-bold text-bladLightTextColor',
        large: 'text-2xl font-bold text-bladLightTextColor'
    };

    return (
        <div className='space-y-2 mb-6'>
            <div className='flex items-center justify-between'>
                <h2 className={titleClasses[variant]}>{title}</h2>
                {viewAllLink && (
                    <Link 
                        to={viewAllLink}
                        className='text-bladLightTextColor hover:text-bladLightHover
                                 transition-colors duration-200
                                 flex items-center gap-2'
                    >
                        Visa alla
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                )}
            </div>
            {description && (
                <p className='text-bladLightTextColor text-sm'>{description}</p>
            )}
        </div>
    );
};
