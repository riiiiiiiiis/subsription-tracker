import React from 'react';
import { Settings as SettingsIcon, Download, Trash2, Info } from 'lucide-react';
import useUnifiedStore from '@/store/unified-store';
import { Card, Button } from '@/components/ui';

const Settings = () => {
  const subscriptions = useUnifiedStore(state => state.data.subscriptions);

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
    if (window.confirm('Вы уверены, что хотите удалить все данные подписок? Это действие нельзя отменить.')) {
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
          Управляйте настройками и данными приложения
        </p>
      </div>

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
                  Скачать все данные подписок в файл JSON
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

      {/* Application Info */}
      <Card className="p-6">
        <Card.Header>
          <Card.Title className="flex items-center space-x-2">
            <Info className="h-5 w-5" />
            <span>Информация о приложении</span>
          </Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Версия:</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Всего подписок:</span>
              <span className="font-medium">{subscriptions.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Активных подписок:</span>
              <span className="font-medium">
                {subscriptions.filter(sub => sub.isActive).length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Хранение данных:</span>
              <span className="font-medium">Локальное хранилище браузера</span>
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
              <strong>Аналитика:</strong> Просматривайте статистику расходов и отслеживайте стоимость подписок со временем.
            </p>
            <p>
              <strong>Конфиденциальность:</strong> Все данные хранятся локально в вашем браузере. Информация не отправляется на внешние серверы.
            </p>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Settings;