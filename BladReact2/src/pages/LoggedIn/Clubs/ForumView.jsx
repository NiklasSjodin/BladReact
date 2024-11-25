import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageContainer } from '../../../components/layout/PageContainer';
import { format } from 'date-fns';

export default function ForumView() {
    const { bookClubId, forumId } = useParams();
    const navigate = useNavigate();
    const [forum, setForum] = useState(null);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isPosting, setIsPosting] = useState(false);
    const [error, setError] = useState(null);

    // Get auth token from localStorage with validation
    const getAuthHeader = () => {
        const token = localStorage.getItem('token');
        console.log('Current token:', token); // Debug log
        
        if (!token) {
            throw new Error('No authentication token found');
        }

        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
    };

    // Fetch forum details
    useEffect(() => {
        const fetchForumData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Fetch forum details
                const forumResponse = await fetch(
                    `https://localhost:7076/api/bookclubs/${bookClubId}/forums/${forumId}`,
                    {
                        headers: getAuthHeader()
                    }
                );
                if (!forumResponse.ok) throw new Error('Failed to fetch forum details');
                const forumData = await forumResponse.json();
                setForum(forumData);

                // Fetch comments
                const commentsResponse = await fetch(
                    `https://localhost:7076/api/forums/${forumId}/comments`,
                    {
                        headers: getAuthHeader()
                    }
                );
                if (!commentsResponse.ok) throw new Error('Failed to fetch comments');
                const commentsData = await commentsResponse.json();
                setComments(commentsData);
            } catch (err) {
                console.error('Error:', err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchForumData();
    }, [bookClubId, forumId]);

    // Handle new comment submission
    const handleNewComment = async (content) => {
        setIsPosting(true);
        try {
            const response = await fetch(
                `https://localhost:7076/api/forums/${forumId}/comments`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ content }),
                }
            );

            if (!response.ok) throw new Error('Failed to post comment');
            
            const newComment = await response.json();
            setComments(prevComments => [newComment, ...prevComments]);
        } catch (err) {
            console.error('Error posting comment:', err);
            alert('Failed to post comment. Please try again.');
        } finally {
            setIsPosting(false);
        }
    };

    if (isLoading) {
        return (
            <PageContainer>
                <div className="animate-pulse p-6">
                    <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                </div>
            </PageContainer>
        );
    }

    if (error) {
        return (
            <PageContainer>
                <div className="p-6 text-red-500">Error: {error}</div>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Forum Header */}
                <div className="bg-gray-800 rounded-lg p-6 mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">{forum?.title}</h1>
                    <div className="flex items-center space-x-4 text-gray-400">
                        <span>Type: {forum?.forumType}</span>
                    </div>
                </div>

                {/* New Comment Form */}
                <div className="bg-gray-800 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Create New Comment</h2>
                    <NewCommentForm onSubmit={handleNewComment} />
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                    {comments.map((comment) => (
                        <CommentCard key={comment.id} comment={comment} />
                    ))}
                </div>
            </div>
        </PageContainer>
    );
}

// New Comment Form Component
function NewCommentForm({ onSubmit }) {
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content.trim()) {
            onSubmit(content);
            setContent('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-4 rounded-lg bg-gray-700 text-white resize-none"
                rows="4"
                placeholder="Write your comment..."
            />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
                Post
            </button>
        </form>
    );
}

// Comment Card Component
function CommentCard({ comment }) {
    return (
        <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gray-600">
                        {/* Add user avatar here if available */}
                    </div>
                    <div>
                        <h3 className="font-medium text-white">{comment.authorName}</h3>
                        <p className="text-sm text-gray-400">
                            {format(new Date(comment.createdAt), 'MMM d, yyyy h:mm a')}
                        </p>
                    </div>
                </div>
            </div>
            <div className="prose prose-invert max-w-none">
                <p className="text-gray-300">{comment.content}</p>
            </div>
            <div className="mt-4 flex items-center space-x-4">
                <button className="text-gray-400 hover:text-white transition-colors">
                    Reply
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                    Like
                </button>
            </div>
        </div>
    );
} 