/**
 * Utility functions for mapping between frontend camelCase and database snake_case field names
 */

/**
 * Convert camelCase to snake_case
 * @param {string} str - camelCase string
 * @returns {string} snake_case string
 */
export const camelToSnake = (str) => {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
};

/**
 * Convert snake_case to camelCase
 * @param {string} str - snake_case string
 * @returns {string} camelCase string
 */
export const snakeToCamel = (str) => {
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
};

/**
 * Convert object keys from camelCase to snake_case
 * @param {Object} obj - Object with camelCase keys
 * @returns {Object} Object with snake_case keys
 */
export const objectCamelToSnake = (obj) => {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(objectCamelToSnake);
  
  const converted = {};
  for (const [key, value] of Object.entries(obj)) {
    const snakeKey = camelToSnake(key);
    converted[snakeKey] = typeof value === 'object' && value !== null 
      ? objectCamelToSnake(value) 
      : value;
  }
  return converted;
};

/**
 * Convert object keys from snake_case to camelCase
 * @param {Object} obj - Object with snake_case keys
 * @returns {Object} Object with camelCase keys
 */
export const objectSnakeToCamel = (obj) => {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(objectSnakeToCamel);
  
  const converted = {};
  for (const [key, value] of Object.entries(obj)) {
    const camelKey = snakeToCamel(key);
    converted[camelKey] = typeof value === 'object' && value !== null 
      ? objectSnakeToCamel(value) 
      : value;
  }
  return converted;
};

/**
 * Map subscription data from frontend format to database format
 * @param {Object} subscription - Subscription data in frontend format
 * @returns {Object} Subscription data in database format
 */
export const subscriptionToDatabase = (subscription) => {
  const mapped = {
    name: subscription.name,
    description: subscription.description,
    amount: subscription.amount,
    currency: subscription.currency,
    billing_cycle: subscription.billingCycle,
    next_payment_date: subscription.nextPaymentDate,
    category: subscription.category,
    website: subscription.website,
    is_active: subscription.isActive,
  };
  
  // Remove undefined values
  return Object.fromEntries(
    Object.entries(mapped).filter(([_, value]) => value !== undefined)
  );
};

/**
 * Map subscription data from database format to frontend format
 * @param {Object} subscription - Subscription data in database format
 * @returns {Object} Subscription data in frontend format
 */
export const subscriptionFromDatabase = (subscription) => {
  if (!subscription) return null;
  
  return {
    id: subscription.id,
    name: subscription.name,
    description: subscription.description,
    amount: subscription.amount,
    currency: subscription.currency,
    billingCycle: subscription.billing_cycle,
    nextPaymentDate: subscription.next_payment_date,
    category: subscription.category,
    website: subscription.website,
    isActive: subscription.is_active,
    createdAt: subscription.created_at,
    updatedAt: subscription.updated_at,
    userId: subscription.user_id,
  };
};

/**
 * Map multiple subscriptions from database format to frontend format
 * @param {Array} subscriptions - Array of subscription data in database format
 * @returns {Array} Array of subscription data in frontend format
 */
export const subscriptionsFromDatabase = (subscriptions) => {
  if (!Array.isArray(subscriptions)) return [];
  return subscriptions.map(subscriptionFromDatabase);
};