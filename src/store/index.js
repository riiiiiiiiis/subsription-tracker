import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { createAuthSlice } from './slices/authSlice.js';
import { createDataSlice } from './slices/dataSlice.js';
import { createFiltersSlice } from './slices/filtersSlice.js';
import { createAnalyticsSlice } from './slices/analyticsSlice.js';

const useAppStore = create(
  devtools(
    persist(
      (...args) => ({
        ...createAuthSlice(...args),
        ...createDataSlice(...args),
        ...createFiltersSlice(...args),
        ...createAnalyticsSlice(...args),
      }),
      {
        name: 'unified-subscription-store',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          data: {
            subscriptions: state.data.subscriptions,
            lastSync: state.data.lastSync
          },
          filters: state.filters,
          auth: {
            lastProfileLoad: state.auth.lastProfileLoad
          }
        }),
        onRehydrateStorage: () => (state) => {
          console.log('🔄 AppStore: Store rehydrated');
          if (state?.data?.subscriptions) {
            state.data.filteredSubscriptions = state.applyFilters
              ? state.applyFilters(state.data.subscriptions)
              : state.data.subscriptions;
          }
        }
      }
    ),
    { name: 'unified-subscription-store' }
  )
);

export default useAppStore;
