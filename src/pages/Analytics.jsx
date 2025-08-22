import React, { useEffect } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  PieChart,
  Calendar,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { 
  PieChart as RechartsPieChart, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import useUnifiedStore from '@/store/unified-store';
import { Card } from '@/components/ui';
import { 
  formatCurrency, 
  getCategoryLabel, 
  getCategoryColor 
} from '@/types';

const Analytics = () => {
  // Use unified store
  const subscriptions = useUnifiedStore(state => state.data.subscriptions);
  const getTotalMonthlySpending = useUnifiedStore(state => state.getTotalMonthlySpending);
  const getTotalYearlySpending = useUnifiedStore(state => state.getTotalYearlySpending);
  const getSpendingByCategory = useUnifiedStore(state => state.getSpendingByCategory);
  const getUpcomingPayments = useUnifiedStore(state => state.getUpcomingPayments);

  const totalMonthly = getTotalMonthlySpending();
  const totalYearly = getTotalYearlySpending();
  const categorySpending = getSpendingByCategory();
  const upcomingPayments = getUpcomingPayments(30); // Next 30 days
  const activeSubscriptions = subscriptions.filter(sub => sub.isActive);

  // Calculate average per subscription
  const averagePerSubscription = activeSubscriptions.length > 0 
    ? totalMonthly / activeSubscriptions.length 
    : 0;

  // Prepare data for charts
  const pieChartData = categorySpending.map(cat => ({
    name: getCategoryLabel(cat.category),
    value: cat.amount,
    color: getCategoryColor(cat.category).split(' ')[1]?.replace('bg-', '') || 'gray-500'
  }));

  // Create mock monthly data for trend chart
  const monthlyTrendData = [
    { month: 'Jan', amount: totalMonthly * 0.8 },
    { month: 'Feb', amount: totalMonthly * 0.9 },
    { month: 'Mar', amount: totalMonthly * 0.85 },
    { month: 'Apr', amount: totalMonthly * 1.1 },
    { month: 'May', amount: totalMonthly * 1.05 },
    { month: 'Jun', amount: totalMonthly },
  ];

  // Spending insights
  const getSpendingInsights = () => {
    const insights = [];
    
    if (totalMonthly > 100) {
      insights.push({
        type: 'warning',
        title: 'High Monthly Spending',
        description: `You're spending ${formatCurrency(totalMonthly)} monthly. Consider reviewing your subscriptions.`,
        icon: TrendingUp,
        color: 'text-orange-600 bg-orange-50'
      });
    }

    const highestCategory = categorySpending.reduce((max, cat) => 
      cat.amount > max.amount ? cat : max, categorySpending[0] || {});
    
    if (highestCategory && highestCategory.percentage > 40) {
      insights.push({
        type: 'info',
        title: 'Category Dominance',
        description: `${getCategoryLabel(highestCategory.category)} accounts for ${highestCategory.percentage.toFixed(1)}% of your spending.`,
        icon: PieChart,
        color: 'text-blue-600 bg-blue-50'
      });
    }

    if (upcomingPayments.length > 3) {
      insights.push({
        type: 'info',
        title: 'Multiple Upcoming Payments',
        description: `You have ${upcomingPayments.length} payments due in the next 30 days.`,
        icon: Calendar,
        color: 'text-purple-600 bg-purple-50'
      });
    }

    return insights;
  };

  const insights = getSpendingInsights();

  const COLORS = [
    '#ef4444', // red
    '#10b981', // green  
    '#7c3aed', // purple
    '#f97316', // orange
    '#06b6d4', // cyan
    '#6b7280', // gray
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-primary-600">
            {`${formatCurrency(payload[0].value)}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">
          Insights into your subscription spending
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-green-50">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Monthly Total</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(totalMonthly)}
              </p>
              <p className="text-sm text-gray-500">
                {formatCurrency(totalYearly)} yearly
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-blue-50">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Average per Service</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(averagePerSubscription)}
              </p>
              <p className="text-sm text-gray-500">
                {activeSubscriptions.length} active services
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-purple-50">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Next 30 Days</p>
              <p className="text-2xl font-semibold text-gray-900">
                {upcomingPayments.length}
              </p>
              <p className="text-sm text-gray-500">
                payments due
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending by Category */}
        <Card className="p-6">
          <Card.Header>
            <Card.Title>Spending by Category</Card.Title>
          </Card.Header>
          <Card.Content>
            {categorySpending.length > 0 ? (
              <div className="space-y-4">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <PieChart
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS[index % COLORS.length]} 
                          />
                        ))}
                      </PieChart>
                      <Tooltip 
                        formatter={(value) => formatCurrency(value)}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Category Legend */}
                <div className="space-y-2">
                  {categorySpending.map((cat, index) => (
                    <div key={cat.category} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-sm text-gray-700">
                          {getCategoryLabel(cat.category)}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {formatCurrency(cat.amount)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {cat.percentage.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <PieChart className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No spending data available</p>
              </div>
            )}
          </Card.Content>
        </Card>

        {/* Monthly Trend */}
        <Card className="p-6">
          <Card.Header>
            <Card.Title>Monthly Spending Trend</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Insights */}
      {insights.length > 0 && (
        <Card className="p-6">
          <Card.Header>
            <Card.Title>Spending Insights</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              {insights.map((insight, index) => {
                const Icon = insight.icon;
                return (
                  <div key={index} className={`p-4 rounded-lg ${insight.color}`}>
                    <div className="flex items-start space-x-3">
                      <Icon className="h-5 w-5 mt-0.5" />
                      <div>
                        <h4 className="font-medium">{insight.title}</h4>
                        <p className="text-sm mt-1">{insight.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card.Content>
        </Card>
      )}

      {/* Upcoming Payments Details */}
      {upcomingPayments.length > 0 && (
        <Card className="p-6">
          <Card.Header>
            <Card.Title>Upcoming Payments (Next 30 Days)</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="space-y-3">
              {upcomingPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getCategoryColor(payment.category).replace('text-', 'bg-').split(' ')[1]}`}></div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {payment.subscriptionName}
                      </p>
                      <p className="text-sm text-gray-500">
                        Due: {new Date(payment.dueDate).toLocaleDateString()}
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
          </Card.Content>
        </Card>
      )}
    </div>
  );
};

export default Analytics;