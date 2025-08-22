import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  CreditCard,
  Plus,
  Clock,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import useSubscriptionStore from '@/store';
import { Card, Button } from '@/components/ui';
import { formatCurrency, getCategoryColor, getCategoryLabel } from '@/types';

const Dashboard = () => {
  const {
    subscriptions,
    getTotalMonthlySpending,
    getTotalYearlySpending,
    getUpcomingPayments,
    getThisMonthPayments,
    initializeSampleData
  } = useSubscriptionStore();

  useEffect(() => {
    initializeSampleData();
  }, [initializeSampleData]);

  const totalMonthly = getTotalMonthlySpending();
  const totalYearly = getTotalYearlySpending();
  const upcomingPayments = getUpcomingPayments(7); // Next 7 days
  const thisMonthPayments = getThisMonthPayments();
  const activeSubscriptions = subscriptions.filter(sub => sub.isActive);

  const stats = [
    {
      name: 'Monthly Spending',
      value: formatCurrency(totalMonthly),
      icon: DollarSign,
      color: 'text-green-600 bg-green-50',
    },
    {
      name: 'Yearly Spending',
      value: formatCurrency(totalYearly),
      icon: TrendingUp,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      name: 'Active Subscriptions',
      value: activeSubscriptions.length.toString(),
      icon: CreditCard,
      color: 'text-purple-600 bg-purple-50',
    },
    {
      name: 'Payments This Month',
      value: thisMonthPayments.length.toString(),
      icon: Calendar,
      color: 'text-orange-600 bg-orange-50',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Track your subscriptions and spending
          </p>
        </div>
        <Link to="/subscriptions">
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Subscription</span>
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Payments */}
        <Card className="p-6">
          <Card.Header>
            <div className="flex items-center justify-between">
              <Card.Title className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-orange-500" />
                <span>Upcoming Payments</span>
              </Card.Title>
              <Link 
                to="/subscriptions" 
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                View all
              </Link>
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
                <p>No upcoming payments in the next week</p>
              </div>
            )}
          </Card.Content>
        </Card>

        {/* Recent Subscriptions */}
        <Card className="p-6">
          <Card.Header>
            <div className="flex items-center justify-between">
              <Card.Title className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-blue-500" />
                <span>Recent Subscriptions</span>
              </Card.Title>
              <Link 
                to="/subscriptions" 
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Manage all
              </Link>
            </div>
          </Card.Header>
          <Card.Content>
            {activeSubscriptions.length > 0 ? (
              <div className="space-y-3">
                {activeSubscriptions
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .slice(0, 5)
                  .map((subscription) => (
                    <div key={subscription.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getCategoryColor(subscription.category).replace('text-', 'bg-').replace('bg-', 'bg-').split(' ')[1]}`}></div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {subscription.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {getCategoryLabel(subscription.category)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          {formatCurrency(subscription.amount, subscription.currency)}
                        </p>
                        <p className="text-sm text-gray-500">
                          per {subscription.billingCycle}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CreditCard className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="mb-3">No subscriptions yet</p>
                <Link to="/subscriptions">
                  <Button size="sm">Add your first subscription</Button>
                </Link>
              </div>
            )}
          </Card.Content>
        </Card>
      </div>

      {/* Quick Actions */}
      {totalMonthly > 100 && (
        <Card className="p-6 bg-amber-50 border-amber-200">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
            <div>
              <h3 className="font-medium text-amber-800">
                High Monthly Spending Detected
              </h3>
              <p className="text-amber-700 mt-1">
                You're spending {formatCurrency(totalMonthly)} monthly on subscriptions. 
                Consider reviewing your subscriptions to optimize costs.
              </p>
              <div className="mt-3">
                <Link to="/analytics">
                  <Button variant="outline" size="sm" className="bg-white border-amber-300 text-amber-700 hover:bg-amber-100">
                    View Analytics
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;