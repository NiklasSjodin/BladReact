import { useQuery } from '@tanstack/react-query';
import { ImageCache } from '../services/ImageCache';

export function useBookCover(coverId) {
    return useQuery({
        queryKey: ['bookCover', coverId],
        queryFn: () => ImageCache.getImage(coverId),
        staleTime: 24 * 60 * 60 * 1000, // 24 hours
        cacheTime: 7 * 24 * 60 * 60 * 1000, // 7 days
        enabled: !!coverId, // Only run if coverId exists
    });
} 