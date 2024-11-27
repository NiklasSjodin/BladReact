import { useNotificationService } from '@/hooks/useNotificationService';

export function NotificationItem({ notification }) {
  const { acceptFriendRequest } = useNotificationService();

  const getNotificationStyle = (type) => {
    switch (type) {
      case 'FRIEND_REQUEST':
        return 'bg-blue-50';
      case 'FRIEND_ACCEPTED':
        return 'bg-green-50';
      default:
        return notification.read ? 'bg-gray-50' : 'bg-white';
    }
  };

  const handleAccept = async (friendshipId) => {
    const success = await acceptFriendRequest(friendshipId);
    if (success) {
      console.log('Friend request accepted successfully');
    }
  };

  return (
    <div className={`p-4 border-b ${getNotificationStyle(notification.type)}`}>
      <p className="text-sm">{notification.message}</p>

      {notification.type === 'FRIEND_REQUEST' && notification.metadata && (
        <button
          onClick={() => handleAccept(notification.metadata)}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
        >
          Accept Request
        </button>
      )}

      {notification.type === 'FRIEND_ACCEPTED' && (
        <span className="text-green-600 text-sm">✓ Friend request accepted</span>
      )}

      <p className="text-xs text-gray-500 mt-1">
        {notification.timestamp.toLocaleString()}
      </p>
    </div>
  );
}