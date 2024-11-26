import { useState, useCallback, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { Production_API_URL } from './api';

export const useNotificationService = () => {
  const [hubConnection, setHubConnection] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const hubUrl = `${Production_API_URL}/notificationHub`;

  const createConnection = useCallback(() => {
    if (hubConnection) return;
    const connection = new HubConnectionBuilder()
      .withUrl(hubUrl, {
        withCredentials: true,
        accessTokenFactory: async () => {
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('No token available');
          }
          return token;
        }
      })
      .withAutomaticReconnect()
      .build();

    connection.on('ReceiveNotification', (message, metadata = null) => {
      let type = 'GENERAL';

      if (message.includes('friend request')) {
        type = 'FRIEND_REQUEST';
      } else if (message.includes('accepted your follow request')) {
        type = 'FRIEND_ACCEPTED';
      }

      const notification = {
        message,
        metadata,
        timestamp: new Date(),
        read: false,
        type
      };

      setNotifications(current => [notification, ...current]);
    });

    setHubConnection(connection);
  }, [hubConnection]);

  const startConnection = async () => {
    if (isConnecting || (hubConnection?.state === 'Connected')) {
      return;
    }
    setIsConnecting(true);
    try {
      await hubConnection.start();
      console.log('SignalR Connection started successfully');
    } catch (error) {
      console.error('Error starting SignalR:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const stopConnection = async () => {
    if (hubConnection?.state === 'Connected') {
      try {
        await hubConnection.stop();
        console.log('SignalR connection stopped');
      } catch (error) {
        console.error('Error stopping SignalR connection:', error);
      }
    }
  };

  const acceptFriendRequest = async (friendshipId) => {
    try {
      const response = await fetch(`${Production_API_URL}/friendship/accept/${friendshipId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to accept friend request');
      }

      setNotifications(current =>
        current.map(notification =>
          notification.metadata === friendshipId
            ? { ...notification, type: 'ACCEPTED', read: true }
            : notification
        )
      );

      return true;
    } catch (error) {
      console.error('Error accepting friend request:', error);
      return false;
    }
  };

  const markAllAsRead = () => {
    setNotifications(current => current.map(n => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const toggleNotifications = () => {
    setIsOpen(prev => {
      if (!prev) {
        markAllAsRead();
      }
      return !prev;
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      createConnection();
    }
    return () => {
      stopConnection();
    };
  }, [createConnection]);

  useEffect(() => {
    if (hubConnection && localStorage.getItem('token')) {
      startConnection();
    }
  }, [hubConnection]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    unreadCount,
    isOpen,
    toggleNotifications,
    markAllAsRead,
    clearNotifications,
    acceptFriendRequest
  };
};