import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Home, Users, Lightbulb, BookOpen, User, Bell } from 'lucide-react';
import { useNotificationService } from '@/hooks/useNotificationService';
import { NotificationItem } from '@/components/Notifications/NotificationComponents';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const MobileNavbar = () => {
  const { 
    unreadCount, 
    toggleNotifications, 
    isOpen, 
    notifications, 
    clearNotifications
  } = useNotificationService();

  const navItems = [
    { to: '/', title: 'Home', icon: <Home className='h-5 w-5' /> },
    { to: 'clubs', title: 'Clubs', icon: <Users className='h-5 w-5' /> },
    {
      to: 'explore',
      title: 'Explore',
      icon: <Lightbulb className='h-5 w-5' />,
    },
    { to: 'library', title: 'Library', icon: <BookOpen className='h-5 w-5' /> },
    {
      type: 'notification',
      title: 'Notifications',
      icon: (
        <div className="relative">
          <Bell className='h-5 w-5' />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
      ),
    },
    {
      to: 'account',
      title: 'Account',
      icon: (
        <Avatar className='h-6 w-6'>
          <AvatarImage src='/path/to/your/avatar.jpg' alt='Profile' />
          <AvatarFallback>
            <User className='h-4 w-4' />
          </AvatarFallback>
        </Avatar>
      ),
    },
  ];

  return (
    <>
      <footer className='fixed bottom-0 w-full border-t bg-white dark:bg-slate-950'>
        <TooltipProvider>
          <nav className='container mx-auto px-4'>
            <ul className='flex justify-between items-center h-16'>
              {navItems.map((item, index) => (
                <li key={item.to || index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {item.type === 'notification' ? (
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={toggleNotifications}
                          className='relative hover:bg-slate-100 dark:hover:bg-slate-800'
                        >
                          {item.icon}
                        </Button>
                      ) : (
                        <Link to={item.to}>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='relative hover:bg-slate-100 dark:hover:bg-slate-800'
                          >
                            {item.icon}
                          </Button>
                        </Link>
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.title}</p>
                    </TooltipContent>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </nav>
        </TooltipProvider>
      </footer>

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 bg-white rounded-lg shadow-lg border overflow-hidden z-50">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-semibold">Notifications</h3>
            <button 
              onClick={clearNotifications} 
              className="text-sm text-red-500 hover:text-red-600"
            >
              Clear all
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="p-4 text-gray-500">No notifications</p>
            ) : (
              notifications.map((notification, index) => (
                <NotificationItem
                  key={index}
                  notification={notification}
                />
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavbar;