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
import useSubscriptionStore from '@/store';
import { Button, Input, Select, Card } from '@/components/ui';
import SubscriptionCard from '../components/SubscriptionCard.jsx';
import AddSubscriptionModal from '../components/AddSubscriptionModal.jsx';
import { getCategoryLabel } from '@/types';

const Subscriptions = () => {
  const {
    subscriptions,
    filteredSubscriptions,
    activeFilters,
    setFilters,
    deleteSubscription,
    toggleSubscriptionStatus,
    initializeSampleData,
    refreshFilteredSubscriptions
  } = useSubscriptionStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    initializeSampleData();
  }, [initializeSampleData]);

  // Ensure filteredSubscriptions is updated when subscriptions change
  useEffect(() => {
    if (subscriptions.length > 0 && filteredSubscriptions.length === 0) {
      refreshFilteredSubscriptions();
    }
  }, [subscriptions, filteredSubscriptions, refreshFilteredSubscriptions]);

  // Filter options
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'entertainment', label: getCategoryLabel('entertainment') },
    { value: 'utilities', label: getCategoryLabel('utilities') },
    { value: 'software', label: getCategoryLabel('software') },
    { value: 'food', label: getCategoryLabel('food') },
    { value: 'health', label: getCategoryLabel('health') },
    { value: 'other', label: getCategoryLabel('other') },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'amount', label: 'Amount' },
    { value: 'nextPayment', label: 'Next Payment' },
    { value: 'createdAt', label: 'Date Added' },
  ];

  // Filter subscriptions by search term
  const searchFilteredSubscriptions = filteredSubscriptions.filter(sub =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (sub.description && sub.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleFilterChange = (field) => (e) => {
    setFilters({ [field]: e.target.value });
  };

  const handleSortOrderToggle = () => {
    const newOrder = activeFilters.sortOrder === 'asc' ? 'desc' : 'asc';
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
          <h1 className="text-3xl font-bold text-gray-900">Subscriptions</h1>
          <p className="text-gray-600 mt-1">
            Manage your recurring subscriptions
          </p>
        </div>
        <Button 
          onClick={handleAddSubscription}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Subscription</span>
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
                placeholder="Search subscriptions..."
                className="pl-10 input-field"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Select
              value={activeFilters.category}
              onChange={handleFilterChange('category')}
              options={categoryOptions}
              className="w-full sm:w-40"
            />
            
            <Select
              value={activeFilters.status}
              onChange={handleFilterChange('status')}
              options={statusOptions}
              className="w-full sm:w-32"
            />
            
            <div className="flex space-x-2">
              <Select
                value={activeFilters.sortBy}
                onChange={handleFilterChange('sortBy')}
                options={sortOptions}
                className="w-32"
              />
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleSortOrderToggle}
                className="px-2"
                title={`Sort ${activeFilters.sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
              >
                {activeFilters.sortOrder === 'asc' ? (
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
          Showing {searchFilteredSubscriptions.length} of {filteredSubscriptions.length} subscriptions
        </span>
        {(searchTerm || activeFilters.category !== 'all' || activeFilters.status !== 'all') && (
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
            Clear filters
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
            {searchTerm || activeFilters.category !== 'all' || activeFilters.status !== 'all' ? (
              <>
                <Filter className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">No subscriptions found</h3>
                <p>Try adjusting your search or filters</p>
              </>
            ) : (
              <>
                <Plus className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">No subscriptions yet</h3>
                <p className="mb-4">Start tracking your recurring expenses</p>
                <Button onClick={handleAddSubscription}>
                  Add your first subscription
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