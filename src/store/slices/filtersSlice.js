export const initialFiltersState = {
  category: 'all',
  status: 'all',
  sortBy: 'nextPaymentDate',
  sortOrder: 'asc',
};

export const createFiltersSlice = (set, get) => ({
  filters: { ...initialFiltersState },

  setFilters: (filters) => {
    set(state => {
      const newFilters = { ...state.filters, ...filters };
      return {
        filters: newFilters,
        data: {
          ...state.data,
          filteredSubscriptions: get().applyFilters(state.data.subscriptions, newFilters)
        }
      };
    });
  },

  applyFilters: (subscriptions, filters = null) => {
    const activeFilters = filters || get().filters;
    let filtered = [...subscriptions];

    if (activeFilters.category !== 'all') {
      filtered = filtered.filter(sub => sub.category === activeFilters.category);
    }

    if (activeFilters.status !== 'all') {
      const isActive = activeFilters.status === 'active';
      filtered = filtered.filter(sub => sub.isActive === isActive);
    }

    filtered.sort((a, b) => {
      const aActive = a.isActive ? 1 : 0;
      const bActive = b.isActive ? 1 : 0;

      if (aActive !== bActive) {
        return bActive - aActive;
      }

      let comparison = 0;
      const aValue = a[activeFilters.sortBy];
      const bValue = b[activeFilters.sortBy];

      if (activeFilters.sortBy === 'nextPaymentDate') {
        const aSortValue = a.isActive ? aValue : (a.updated_at || a.name || '');
        const bSortValue = b.isActive ? bValue : (b.updated_at || b.name || '');

        if (a.isActive && b.isActive) {
          const aDate = new Date(aSortValue);
          const bDate = new Date(bSortValue);
          comparison = aDate - bDate;
        } else {
          if (a.updated_at && b.updated_at) {
            comparison = new Date(b.updated_at) - new Date(a.updated_at);
          } else {
            comparison = (aSortValue || '').localeCompare(bSortValue || '');
          }
        }
      } else {
        if (aValue < bValue) comparison = -1;
        if (aValue > bValue) comparison = 1;
      }

      return activeFilters.sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  },
});

