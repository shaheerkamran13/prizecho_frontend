'use client'

interface NotificationSetting {
    id: string;
    title: string;
    description: string;
    email: boolean;
    push: boolean;
  }

export const NotificationsSection: React.FC = () => {
    const notificationSettings: NotificationSetting[] = [
      {
        id: 'orders',
        title: 'Order Updates',
        description: 'Receive notifications about your order status',
        email: true,
        push: true
      },
      {
        id: 'promotions',
        title: 'Promotions & Deals',
        description: 'Get notified about special offers and discounts',
        email: true,
        push: false
      },
      {
        id: 'security',
        title: 'Security Alerts',
        description: 'Important updates about your account security',
        email: true,
        push: true
      },
      {
        id: 'newsletter',
        title: 'Newsletter',
        description: 'Weekly updates about new products and features',
        email: false,
        push: false
      }
    ];
  
    const handleToggle = (settingId: string, type: 'email' | 'push') => {
      console.log(`Toggle ${type} for setting:`, settingId);
    };
  
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Notification Preferences</h3>
        <div className="space-y-6">
          {notificationSettings.map((setting) => (
            <div key={setting.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="mb-4 sm:mb-0">
                <h4 className="font-medium">{setting.title}</h4>
                <p className="text-sm text-gray-500">{setting.description}</p>
              </div>
              <div className="flex space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    defaultChecked={setting.email}
                    onChange={() => handleToggle(setting.id, 'email')}
                    className="w-4 h-4 text-myColor border-gray-300 rounded focus:ring-myColor"
                  />
                  <span className="text-sm">Email</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    defaultChecked={setting.push}
                    onChange={() => handleToggle(setting.id, 'push')}
                    className="w-4 h-4 text-myColor border-gray-300 rounded focus:ring-myColor"
                  />
                  <span className="text-sm">Push</span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  