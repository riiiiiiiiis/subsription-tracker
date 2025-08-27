import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  CreditCard,
  Plus,
  Clock,
  Settings
} from 'lucide-react';
import { format } from 'date-fns';
import { useShallow } from 'zustand/react/shallow';
import useUnifiedStore from '@/store/unified-store';
import { Card, Button } from '@/components/ui';
import SubscriptionCard from '@/components/SubscriptionCard.jsx';
import AddSubscriptionModal from '@/components/AddSubscriptionModal.jsx';
import { formatCurrency, getCategoryColor, getCategoryLabel, getBillingCycleLabel } from '@/types';

const Dashboard = () => {
  const navigate = useNavigate();
  // State for subscription management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState(null);

  // Optimized unified store selectors with shallow comparison
  const {
    subscriptions,
    filteredSubscriptions,
    filters,
    getTotalMonthlySpending,
    getTotalYearlySpending,
    getUpcomingPayments,
    getThisMonthPayments,
    setFilters,
    deleteSubscription,
    toggleSubscriptionStatus,
    applyFilters
  } = useUnifiedStore(
    useShallow((state) => ({
      subscriptions: state.data.subscriptions,
      filteredSubscriptions: state.data.filteredSubscriptions,
      filters: state.filters,
      getTotalMonthlySpending: state.getTotalMonthlySpending,
      getTotalYearlySpending: state.getTotalYearlySpending,
      getUpcomingPayments: state.getUpcomingPayments,
      getThisMonthPayments: state.getThisMonthPayments,
      setFilters: state.setFilters,
      deleteSubscription: state.deleteSubscription,
      toggleSubscriptionStatus: state.toggleSubscriptionStatus,
      applyFilters: state.applyFilters,
    }))
  );

  const totalMonthly = getTotalMonthlySpending();
  const totalYearly = getTotalYearlySpending();
  const upcomingPayments = getUpcomingPayments(7); // Next 7 days
  const upcomingPayments30 = getUpcomingPayments(30); // Next 30 days
  const thisMonthPayments = getThisMonthPayments();
  const activeSubscriptions = subscriptions.filter(sub => sub.isActive);

  // Ensure filteredSubscriptions is updated when subscriptions change
  useEffect(() => {
    if (subscriptions.length > 0 && filteredSubscriptions.length === 0) {
      const filtered = applyFilters(subscriptions, filters);
      if (filtered.length > 0) {
        // Force re-apply current filters instead of resetting them
        setFilters(filters);
      }
    }
  }, [subscriptions, filteredSubscriptions, applyFilters, filters, setFilters]);


  const handleAddSubscription = () => {
    setEditingSubscription(null);
    setIsModalOpen(true);
  };

  const handleEditSubscription = (subscription) => {
    setEditingSubscription(subscription);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingSubscription(null);
  };

  const stats = [
    {
      name: 'Активные подписки',
      value: activeSubscriptions.length.toString(),
      icon: CreditCard,
      color: 'text-purple-600 bg-purple-50',
    },
    {
      name: 'Следующие 30 дней',
      value: upcomingPayments30.length.toString(),
      additionalInfo: 'предстоящих платежей',
      icon: Calendar,
      color: 'text-orange-600 bg-orange-50',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Подписки</h1>
          <p className="text-gray-600 mt-1">
            Отслеживайте свои подписки и расходы
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/app/settings')}
            className="flex items-center"
            title="Настройки"
          >
            <Settings className="h-5 w-5" />
          </Button>
          <Button onClick={() => setIsModalOpen(true)} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Добавить подписку</span>
          </Button>
        </div>
      </div>

      {/* Upcoming Payments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <Card.Header>
            <div className="flex items-center justify-between">
              <Card.Title className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-orange-500" />
                <span>Ближайшие платежи</span>
              </Card.Title>
              <button 
                onClick={() => document.getElementById('subscriptions-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Смотреть все
              </button>
            </div>
          </Card.Header>
          <Card.Content>
            {upcomingPayments.length > 0 ? (
              <div className="space-y-3">
                {upcomingPayments.slice(0, 5).map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getCategoryColor(payment.category).replace('text-', 'bg-').replace('bg-', 'bg-').split(' ')[1]}`}></div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {payment.subscriptionName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {format(payment.dueDate, 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {formatCurrency(payment.amount, payment.currency)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {getCategoryLabel(payment.category)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>Нет платежей на ближайшую неделю</p>
              </div>
            )}
          </Card.Content>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-3">
        {/* Combined Monthly/Yearly Spending */}
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-green-50">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ежемесячно</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(totalMonthly)}
              </p>
              <p className="text-sm text-gray-500">
                {formatCurrency(totalYearly)} в год
              </p>
            </div>
          </div>
        </Card>

        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="p-6">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                  {stat.additionalInfo && (
                    <p className="text-sm text-gray-500">
                      {stat.additionalInfo}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Subscriptions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubscriptions.length > 0 ? (
          filteredSubscriptions.map((subscription) => (
            <SubscriptionCard
              key={subscription.id}
              subscription={subscription}
              onEdit={() => handleEditSubscription(subscription)}
              onDelete={() => deleteSubscription(subscription.id)}
              onToggleActive={() => toggleSubscriptionStatus(subscription.id)}
              viewMode="grid"
            />
          ))
        ) : (
          <div className="col-span-full">
            <Card className="p-12">
              <div className="text-center text-gray-500">
                <CreditCard className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">Подписок не найдено</h3>
                <p className="mb-4">Добавьте свою первую подписку</p>
                <Button onClick={handleAddSubscription}>
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить подписку
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Add/Edit Subscription Modal */}
      {isModalOpen && (
        <AddSubscriptionModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          editingSubscription={editingSubscription}
        />
      )}
    </div>
  );
};

export default Dashboard;