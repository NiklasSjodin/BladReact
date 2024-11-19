import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageContainer } from '../../../components/layout/PageContainer';
import { format } from 'date-fns'; // You'll need to install this: npm install date-fns

export default function ForumView() {
    const [forum, setForum] = useState(null);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { bookClubId, forumId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchForumDetails = async () => {
            setIsLoading(true);
            try {
                // Adjust the endpoint according to your API
                const response = await fetch(
                    `https://localhost:7076/api/bookclubs/${bookClubId}/forums/${forumId}`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch forum details');
                }
                const data = await response.json();
                setForum(data);
                setPosts(data.posts || []); // Assuming posts are included in the response
            } catch (error) {
                console.error('Error fetching forum details:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchForumDetails();
    }, [bookClubId, forumId]);

    const handleNewPost = async (content) => {
        try {
            const response = await fetch(
                `https://localhost:7076/api/bookclubs/${bookClubId}/forums/${forumId}/posts`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ content }),
                }
            );
            if (!response.ok) {
                throw new Error('Failed to create post');
            }
            const newPost = await response.json();
            setPosts(prevPosts => [newPost, ...prevPosts]); // Add new post at the top
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    if (isLoading) return (
        <PageContainer>
            <div className="p-6">
                <div className="animate-pulse">Loading forum...</div>
            </div>
        </PageContainer>
    );

    if (error) return (
        <PageContainer>
            <div className="p-6 text-red-500">
                Error: {error}
            </div>
        </PageContainer>
    );

    return (
        <PageContainer>
            <div className="p-6 space-y-6">
                {/* Forum Header */}
                <div className="bg-gray-800 rounded-lg p-6">
                    <h1 className="text-3xl font-bold text-white mb-2">{forum?.title}</h1>
                    <p className="text-gray-400">{forum?.description}</p>
                </div>

                {/* New Post Form */}
                <div className="bg-gray-800 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Create New Post</h2>
                    <NewPostForm onSubmit={handleNewPost} />
                </div>

                {/* Posts List */}
                <div className="space-y-4">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </PageContainer>
    );
}

// New Post Form Component
function NewPostForm({ onSubmit }) {
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
                placeholder="Write your post..."
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

// Post Card Component
function PostCard({ post }) {
    return (
        <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gray-600">
                        {/* Add user avatar here if available */}
                    </div>
                    <div>
                        <h3 className="font-medium text-white">{post.authorName}</h3>
                        <p className="text-sm text-gray-400">
                            {format(new Date(post.createdAt), 'MMM d, yyyy h:mm a')}
                        </p>
                    </div>
                </div>
            </div>
            <div className="prose prose-invert max-w-none">
                <p className="text-gray-300">{post.content}</p>
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