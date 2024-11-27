import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import defaultClubImage from '@/images/placeholders/default-book-club.jpg';

const BookClubCard = ({
    id,
    name,
    description,
    memberCount,
    currentlyReading,
    imageUrl,
    interactive = true,
    onClick,
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else if (interactive) {
            navigate(`/clubs/${id}`);
        }
    };

    const truncateText = (text, maxLength) => {
        if (!text) return '';
        return text.length > maxLength 
            ? text.substring(0, maxLength) + '...' 
            : text;
    };

    return (
        <div 
            className={`
                relative overflow-hidden bg-white shadow-md rounded-lg
                ${interactive ? 'hover:shadow-lg transition-shadow duration-300 cursor-pointer' : ''}
                max-w-sm w-full
            `}
            onClick={interactive ? handleClick : undefined}
            role={interactive ? 'button' : 'article'}
            tabIndex={interactive ? 0 : undefined}
        >
            <div className='aspect-[4/3] relative overflow-hidden'>
                <img
                    src={imageUrl || defaultClubImage}
                    alt={`${name} bokklubb`}
                    className='object-cover w-full h-full'
                    onError={(e) => {
                        e.target.src = defaultClubImage;
                    }}
                />
                <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4'>
                    <h3 className='text-white text-xl font-bold'>{truncateText(name, 40)}</h3>
                </div>
            </div>

            <div className='p-4 space-y-2'>
                <p className='text-sm text-gray-600'>
                    {truncateText(description, 100)}
                </p>

                <div className='flex items-center justify-between text-sm text-gray-500'>
                    <span>{memberCount} medlemmar</span>
                    {currentlyReading && (
                        <span>Läser nu: {truncateText(currentlyReading.title, 20)}</span>
                    )}
                </div>

                {interactive && (
                    <Button 
                        variant="outline" 
                        className='w-full mt-4'
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClick();
                        }}
                    >
                        Visa bokklubb
                    </Button>
                )}
            </div>
        </div>
    );
};

export default BookClubCard; 