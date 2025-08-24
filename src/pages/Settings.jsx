import React from 'react';
import { Settings as SettingsIcon, Download, Trash2, User, LogOut, Globe } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import useUnifiedStore from '@/store/unified-store';
import { Card, Button } from '@/components/ui';
import { useUnifiedAuth } from '@/components/auth/UnifiedAuthProvider';
import LanguageSwitcher from '@/components/LanguageSwitcher.jsx';
import { useTranslation } from '@/hooks/useTranslation';

const Settings = () => {
  const { t } = useTranslation();
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
    
    return t('settings.account');
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
    if (window.confirm(t('settings.deleteConfirm'))) {
      localStorage.removeItem('subscription-tracker-storage');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t('settings.title')}</h1>
        <p className="text-gray-600 mt-1">
          {t('settings.preferences')}
        </p>
      </div>

      {/* User Profile */}
      <Card className="p-6">
        <Card.Header>
          <Card.Title className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>{t('settings.account')}</span>
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
                className="flex items-center space-x-2 danger-hover border-red-300"
              >
                <LogOut className="h-4 w-4" />
                <span>{loading ? t('auth.signingOut') : t('settings.signOut')}</span>
              </Button>
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Language Settings */}
      <Card className="p-6">
        <Card.Header>
          <Card.Title className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>{t('settings.language')}</span>
          </Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">{t('settings.language')}</h3>
                <p className="text-sm text-gray-600">
                  {t('settings.languageDescription')}
                </p>
              </div>
              <LanguageSwitcher />
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Data Management */}
      <Card className="p-6">
        <Card.Header>
          <Card.Title className="flex items-center space-x-2">
            <SettingsIcon className="h-5 w-5" />
            <span>{t('settings.dataManagement')}</span>
          </Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">{t('settings.exportData')}</h3>
                <p className="text-sm text-gray-600">
                  {t('settings.exportDescription')}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleExportData}
                className="flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>{t('settings.exportData')}</span>
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 error-bg rounded-lg border">
              <div>
                <h3 className="font-medium text-red-900">{t('settings.deleteAllData')}</h3>
                <p className="text-sm text-red-700">
                  {t('settings.deleteDescription')}
                </p>
              </div>
              <Button
                variant="danger"
                onClick={handleClearAllData}
                className="flex items-center space-x-2"
              >
                <Trash2 className="h-4 w-4" />
                <span>{t('settings.deleteAllData')}</span>
              </Button>
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Help & Support */}
      <Card className="p-6">
        <Card.Header>
          <Card.Title>{t('settings.helpSupport')}</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              <strong>{t('settings.gettingStarted')}:</strong> {t('settings.gettingStartedDesc')}
            </p>
            <p>
              <strong>{t('settings.categories')}:</strong> {t('settings.categoriesDesc')}
            </p>
            <p>
              <strong>{t('settings.analytics')}:</strong> {t('settings.analyticsDesc')}
            </p>
            <p>
              <strong>{t('settings.privacy')}:</strong> {t('settings.privacyDesc')}
            </p>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Settings;