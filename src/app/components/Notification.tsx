'use client';

import { useUI } from '@/store/hooks';

export default function Notification() {
  const { notifications, removeNotification } = useUI();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`
            p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 ease-in-out
            ${notification.type === 'success' && 'bg-green-500 text-white'}
            ${notification.type === 'error' && 'bg-red-500 text-white'}
            ${notification.type === 'warning' && 'bg-yellow-500 text-white'}
            ${notification.type === 'info' && 'bg-blue-500 text-white'}
          `}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{notification.message}</p>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-4 text-white hover:text-gray-200 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
} 