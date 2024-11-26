import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageContainer } from '../../../components/layout/PageContainer';
import { format } from 'date-fns';
import { useAuthFetch } from '../../../services/useAuthFetch';

export default function ForumView() {
    const { bookClubId, forumId } = useParams();
    const navigate = useNavigate();
    const [forum, setForum] = useState(null);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isPosting, setIsPosting] = useState(false);
    const [error, setError] = useState(null);
    const { authFetch } = useAuthFetch();
    const API_URL = 'https://blad-api.azurewebsites.net/api/';

    // Fetch forum details
    useEffect(() => {
        const fetchForumData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Fetch forums for the club
                const forumsResponse = await authFetch(
                    `${API_URL}bookclubs/${bookClubId}/forums`
                );
                
                console.log('Forums response:', forumsResponse); // Debug log
                
                // Check if forumsResponse is an array
                if (!Array.isArray(forumsResponse)) {
                    throw new Error('Invalid forums response');
                }

                // Find the specific forum from the list
                const currentForum = forumsResponse.find(forum => forum.id === forumId);
                
                console.log('Current forum:', currentForum); // Debug log
                
                if (!currentForum) {
                    throw new Error('Forum not found');
                }

                setForum(currentForum);

                // Fetch comments
                try {
                    const commentsData = await authFetch(
                        `${API_URL}forums/${forumId}/comments`
                    );
                    setComments(Array.isArray(commentsData) ? commentsData : []);
                } catch (commentErr) {
                    console.warn('Error fetching comments:', commentErr);
                    setComments([]);
                }

            } catch (err) {
                console.error('Error:', err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (bookClubId && forumId) {
            fetchForumData();
        }
    }, [bookClubId, forumId, authFetch]);

    // Handle new comment submission
    const handleNewComment = async (content) => {
        setIsPosting(true);
        try {
            const newComment = await authFetch(
                `${API_URL}forums/${forumId}/comments`,
                {
                    method: 'POST',
                    body: JSON.stringify({ content }),
                }
            );
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
                {forum ? (
                    <>
                        {/* Forum Header */}
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                {forum.title}
                            </h1>
                            <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                                <span>Type: {forum.forumType}</span>
                                <span>•</span>
                                <span className={`px-2 py-1 rounded-full text-sm ${
                                    forum.status === 'Open' 
                                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                                        : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                                }`}>
                                    {forum.status}
                                </span>
                            </div>
                        </div>

                        {/* Comments List */}
                        <div className="space-y-4 mb-8">
                            {comments.length > 0 ? (
                                comments.map((comment) => (
                                    <CommentCard key={comment.id} comment={comment} />
                                ))
                            ) : (
                                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
                                    <p className="text-gray-600 dark:text-gray-400">
                                        No comments yet. {forum.status === 'Open' ? 'Be the first to comment!' : 'This forum is closed.'}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* New Comment Form - Only show if forum is Open */}
                        {forum.status === 'Open' && (
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Create New Comment
                                </h2>
                                <NewCommentForm onSubmit={handleNewComment} />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
                        <p className="text-gray-900 dark:text-white">
                            {error || 'Forum not found'}
                        </p>
                    </div>
                )}
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
                className="w-full p-4 rounded-lg bg-white dark:bg-gray-700 
                         text-gray-900 dark:text-white resize-none border
                         border-gray-200 dark:border-gray-600"
                rows="4"
                placeholder="Write your comment..."
            />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg 
                         hover:bg-blue-700 transition-colors"
            >
                Post
            </button>
        </form>
    );
}

// Comment Card Component
function CommentCard({ comment }) {
    return (
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600">
                        {/* Add user avatar here if available */}
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                            {comment.authorName}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {format(new Date(comment.createdAt), 'MMM d, yyyy h:mm a')}
                        </p>
                    </div>
                </div>
            </div>
            <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
            </div>
            <div className="mt-4 flex items-center space-x-4">
                <button className="text-gray-600 dark:text-gray-400 
                                 hover:text-gray-900 dark:hover:text-white 
                                 transition-colors">
                    Reply
                </button>
                <button className="text-gray-600 dark:text-gray-400 
                                 hover:text-gray-900 dark:hover:text-white 
                                 transition-colors">
                    Like
                </button>
            </div>
        </div>
    );
} 