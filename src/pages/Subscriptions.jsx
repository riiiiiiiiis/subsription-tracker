import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Grid3X3,
  List,
  SortAsc,
  SortDesc 
} from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import useAppStore from '@/store';
import { Button, Input, Select, Card } from '@/components/ui';
import SubscriptionCard from '../components/SubscriptionCard.jsx';
import AddSubscriptionModal from '../components/AddSubscriptionModal.jsx';
import { getCategoryOptionsWithAll, getStatusOptions, getSortOptions } from '@/types';

const Subscriptions = () => {
  // Optimized unified store selectors with shallow comparison
  const {
    subscriptions,
    filteredSubscriptions,
    filters,
    setFilters,
    deleteSubscription,
    toggleSubscriptionStatus,
    applyFilters
  } = useAppStore(
    useShallow((state) => ({
      subscriptions: state.data.subscriptions,
      filteredSubscriptions: state.data.filteredSubscriptions,
      filters: state.filters,
      setFilters: state.setFilters,
      deleteSubscription: state.deleteSubscription,
      toggleSubscriptionStatus: state.toggleSubscriptionStatus,
      applyFilters: state.applyFilters,
    }))
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Ensure filteredSubscriptions is updated when subscriptions change
  useEffect(() => {
    if (subscriptions.length > 0 && filteredSubscriptions.length === 0) {
      // Apply current filters to subscriptions
      const filtered = applyFilters(subscriptions, filters);
      if (filtered.length > 0) {
        setFilters({}); // Trigger filter update to refresh filteredSubscriptions
      }
    }
  }, [subscriptions, filteredSubscriptions, applyFilters, filters, setFilters]);

  // Filter options from centralized configuration
  const categoryOptions = getCategoryOptionsWithAll();
  const statusOptions = getStatusOptions();
  const sortOptions = getSortOptions();

  // Filter subscriptions by search term
  const searchFilteredSubscriptions = filteredSubscriptions.filter(sub =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (sub.description && sub.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleFilterChange = (field) => (e) => {
    setFilters({ [field]: e.target.value });
  };

  const handleSortOrderToggle = () => {
    const newOrder = filters.sortOrder === 'asc' ? 'desc' : 'asc';
    setFilters({ sortOrder: newOrder });
  };

  const handleAddSubscription = () => {
    setEditingSubscription(null);
    setIsModalOpen(true);
  };

  const handleEditSubscription = (subscription) => {
    setEditingSubscription(subscription);
    setIsModalOpen(true);
  };

  const handleDeleteSubscription = (subscriptionId) => {
    deleteSubscription(subscriptionId);
  };

  const handleToggleActive = (subscriptionId) => {
    toggleSubscriptionStatus(subscriptionId);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingSubscription(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Подписки</h1>
          <p className="text-gray-600 mt-1">
            Управляйте своими регулярными подписками
          </p>
        </div>
        <Button 
          onClick={handleAddSubscription}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Добавить подписку</span>
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск подписок..."
                className="pl-10 input-field"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Select
              value={filters.category}
              onChange={handleFilterChange('category')}
              options={categoryOptions}
              className="w-full sm:w-40"
            />
            
            <Select
              value={filters.status}
              onChange={handleFilterChange('status')}
              options={statusOptions}
              className="w-full sm:w-32"
            />
            
            <div className="flex space-x-2">
              <Select
                value={filters.sortBy}
                onChange={handleFilterChange('sortBy')}
                options={sortOptions}
                className="w-32"
              />
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleSortOrderToggle}
                className="px-2"
                title={`Сортировка: ${filters.sortOrder === 'asc' ? 'по возрастанию' : 'по убыванию'}`}
              >
                {filters.sortOrder === 'asc' ? (
                  <SortAsc className="h-4 w-4" />
                ) : (
                  <SortDesc className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-none border-0"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-none border-0"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Results Stats */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          Показано {searchFilteredSubscriptions.length} из {filteredSubscriptions.length} подписок
        </span>
        {(searchTerm || filters.category !== 'all' || filters.status !== 'all') && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchTerm('');
              setFilters({
                category: 'all',
                status: 'all',
                sortBy: 'name',
                sortOrder: 'asc'
              });
            }}
          >
            Сбросить фильтры
          </Button>
        )}
      </div>

      {/* Subscriptions Grid/List */}
      {searchFilteredSubscriptions.length > 0 ? (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }>
          {searchFilteredSubscriptions.map((subscription) => (
            <SubscriptionCard
              key={subscription.id}
              subscription={subscription}
              onEdit={handleEditSubscription}
              onDelete={handleDeleteSubscription}
              onToggleActive={handleToggleActive}
            />
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <div className="text-gray-500">
            {searchTerm || filters.category !== 'all' || filters.status !== 'all' ? (
              <>
                <Filter className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">Подписки не найдены</h3>
                <p>Попробуйте изменить поиск или фильтры</p>
              </>
            ) : (
              <>
                <Plus className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">Подписок пока нет</h3>
                <p className="mb-4">Начните отслеживать свои регулярные расходы</p>
                <Button onClick={handleAddSubscription}>
                  Добавить первую подписку
                </Button>
              </>
            )}
          </div>
        </Card>
      )}

      {/* Add/Edit Subscription Modal */}
      <AddSubscriptionModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        editSubscription={editingSubscription}
      />
    </div>
  );
};

export default Subscriptions;