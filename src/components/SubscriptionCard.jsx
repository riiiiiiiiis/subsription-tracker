import React from 'react';
import { 
  Calendar, 
  Globe, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  ToggleLeft, 
  ToggleRight,
  ExternalLink 
} from 'lucide-react';
import { format } from 'date-fns';
import { Card, Button } from '@/components/ui';
import { 
  formatCurrency, 
  getCategoryColor, 
  getCategoryLabel, 
  getBillingCycleLabel,
  calculateMonthlyAmount 
} from '@/types';

const SubscriptionCard = ({ 
  subscription, 
  onEdit, 
  onDelete, 
  onToggleActive 
}) => {
  const monthlyAmount = calculateMonthlyAmount(subscription.amount, subscription.billingCycle);
  const categoryColor = getCategoryColor(subscription.category);

  const handleToggleActive = () => {
    onToggleActive(subscription.id);
  };

  const handleEdit = () => {
    onEdit(subscription);
  };

  const handleDelete = () => {
    if (window.confirm(`Вы уверены, что хотите удалить "${subscription.name}"?`)) {
      onDelete(subscription.id);
    }
  };

  const handleWebsiteClick = () => {
    if (subscription.website) {
      window.open(subscription.website, '_blank');
    }
  };

  return (
    <Card className={`transition-all duration-200 ${subscription.isActive ? 'hover:shadow-md' : 'opacity-60'}`}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${categoryColor.replace('text-', 'bg-').split(' ')[1]}`}></div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                {subscription.name}
              </h3>
              {subscription.description && (
                <p className="text-gray-500 text-sm mt-1">
                  {subscription.description}
                </p>
              )}
            </div>
          </div>
          
          {/* Action Menu */}
          <div className="flex items-center space-x-1">
            {subscription.website && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleWebsiteClick}
                className="p-1"
                title="Перейти на сайт"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleActive}
              className="p-1"
              title={subscription.isActive ? 'Деактивировать' : 'Активировать'}
            >
              {subscription.isActive ? (
                <ToggleRight className="h-4 w-4 text-green-500" />
              ) : (
                <ToggleLeft className="h-4 w-4 text-gray-400" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              className="p-1"
              title="Редактировать подписку"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50"
              title="Удалить подписку"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Amount and Billing Info */}
        <div className="mb-4">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-gray-900">
              {formatCurrency(subscription.amount, subscription.currency)}
            </span>
            <span className="text-gray-500 text-sm">
              за {getBillingCycleLabel(subscription.billingCycle)}
            </span>
          </div>
          {subscription.billingCycle !== 'monthly' && (
            <p className="text-sm text-gray-500 mt-1">
              ~{formatCurrency(monthlyAmount, subscription.currency)} в месяц
            </p>
          )}
        </div>

        {/* Category and Next Payment */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColor}`}>
              {getCategoryLabel(subscription.category)}
            </span>
            <span className={`text-xs px-2 py-1 rounded ${subscription.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
              {subscription.isActive ? 'Активна' : 'Неактивна'}
            </span>
          </div>
          
          {subscription.isActive && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>
                Следующий платеж: {format(new Date(subscription.nextPaymentDate), 'MMM dd, yyyy')}
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default SubscriptionCard;