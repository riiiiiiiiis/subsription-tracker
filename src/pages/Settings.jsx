import React from 'react';
import { Settings as SettingsIcon, Download, Trash2, User, LogOut } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import useUnifiedStore from '@/store/unified-store';
import { Card, Button } from '@/components/ui';
import { useUnifiedAuth } from '@/components/auth/UnifiedAuthProvider';

const Settings = () => {
  const { signOut, loading } = useUnifiedAuth();
  
  const { auth, subscriptions } = useUnifiedStore(
    useShallow((state) => ({
      auth: state.auth,
      subscriptions: state.data.subscriptions
    }))
  );
  
  // Compute display name
  const getDisplayName = () => {
    const { profile, user } = auth;
    
    if (profile?.full_name?.trim()) {
      return profile.full_name.trim();
    }
    
    if (profile?.display_name?.trim()) {
      return profile.display_name.trim();
    }
    
    if (user?.user_metadata?.full_name?.trim()) {
      return user.user_metadata.full_name.trim();
    }
    
    if (user?.email) {
      return user.email.split('@')[0];
    }
    
    return 'Пользователь';
  };
  
  const displayName = getDisplayName();
  
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleExportData = () => {
    const dataToExport = {
      subscriptions,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscription-tracker-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearAllData = () => {
    if (window.confirm('Вы уверены, что хотите удалить все данные о подписках? Это действие нельзя отменить.')) {
      localStorage.removeItem('subscription-tracker-storage');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Настройки</h1>
        <p className="text-gray-600 mt-1">
          Управляйте настройками приложения и данными
        </p>
      </div>

      {/* User Profile */}
      <Card className="p-6">
        <Card.Header>
          <Card.Title className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Профиль</span>
          </Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-medium text-gray-900">{displayName}</p>
                <p className="text-sm text-gray-600">{auth.user?.email}</p>
              </div>
              <div className="flex items-center space-x-2 text-gray-500">
                <User className="h-8 w-8" />
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={handleSignOut}
                disabled={loading}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-300"
              >
                <LogOut className="h-4 w-4" />
                <span>{loading ? 'Выход...' : 'Выйти из системы'}</span>
              </Button>
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Data Management */}
      <Card className="p-6">
        <Card.Header>
          <Card.Title className="flex items-center space-x-2">
            <SettingsIcon className="h-5 w-5" />
            <span>Управление данными</span>
          </Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Экспорт данных</h3>
                <p className="text-sm text-gray-600">
                  Скачайте все данные о подписках в файле JSON
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleExportData}
                className="flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Экспорт</span>
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
              <div>
                <h3 className="font-medium text-red-900">Удалить все данные</h3>
                <p className="text-sm text-red-700">
                  Безвозвратно удалить все подписки и настройки
                </p>
              </div>
              <Button
                variant="danger"
                onClick={handleClearAllData}
                className="flex items-center space-x-2"
              >
                <Trash2 className="h-4 w-4" />
                <span>Удалить данные</span>
              </Button>
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Help & Support */}
      <Card className="p-6">
        <Card.Header>
          <Card.Title>Помощь и поддержка</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              <strong>Начало работы:</strong> Добавьте первую подписку, нажав кнопку «Добавить подписку».
            </p>
            <p>
              <strong>Категории:</strong> Организуйте подписки по категориям, таким как Развлечения, Программное обеспечение, Коммунальные услуги и т.д.
            </p>
            <p>
              <strong>Аналитика:</strong> Просматривайте аналитику расходов и отслеживайте стоимость подписок во времени.
            </p>
            <p>
              <strong>Конфиденциальность данных:</strong> Все данные хранятся локально в вашем браузере. Никакая информация не отправляется на внешние серверы.
            </p>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Settings;