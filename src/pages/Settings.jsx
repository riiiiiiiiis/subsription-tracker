import React from 'react';
import { Settings as SettingsIcon, Download, Trash2, Info } from 'lucide-react';
import useSubscriptionStore from '@/store';
import { Card, Button } from '@/components/ui';

const Settings = () => {
  const { subscriptions } = useSubscriptionStore();

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
    if (window.confirm('Are you sure you want to delete all subscription data? This action cannot be undone.')) {
      localStorage.removeItem('subscription-tracker-storage');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your application preferences and data
        </p>
      </div>

      {/* Data Management */}
      <Card className="p-6">
        <Card.Header>
          <Card.Title className="flex items-center space-x-2">
            <SettingsIcon className="h-5 w-5" />
            <span>Data Management</span>
          </Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Export Data</h3>
                <p className="text-sm text-gray-600">
                  Download all your subscription data as a JSON file
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleExportData}
                className="flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
              <div>
                <h3 className="font-medium text-red-900">Clear All Data</h3>
                <p className="text-sm text-red-700">
                  Permanently delete all subscriptions and settings
                </p>
              </div>
              <Button
                variant="danger"
                onClick={handleClearAllData}
                className="flex items-center space-x-2"
              >
                <Trash2 className="h-4 w-4" />
                <span>Clear Data</span>
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
            <span>Application Information</span>
          </Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Version:</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Subscriptions:</span>
              <span className="font-medium">{subscriptions.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Active Subscriptions:</span>
              <span className="font-medium">
                {subscriptions.filter(sub => sub.isActive).length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Data Storage:</span>
              <span className="font-medium">Local Browser Storage</span>
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Help & Support */}
      <Card className="p-6">
        <Card.Header>
          <Card.Title>Help & Support</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              <strong>Getting Started:</strong> Add your first subscription by clicking the "Add Subscription" button.
            </p>
            <p>
              <strong>Categories:</strong> Organize subscriptions into categories like Entertainment, Software, Utilities, etc.
            </p>
            <p>
              <strong>Analytics:</strong> View spending insights and track your subscription costs over time.
            </p>
            <p>
              <strong>Data Privacy:</strong> All data is stored locally in your browser. No information is sent to external servers.
            </p>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Settings;