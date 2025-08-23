# DRY Refactoring Analysis

## Overview

This document identifies practical opportunities to eliminate code duplication in the subscription tracker application. The focus is on simple, high-impact refactoring that improves maintainability without adding unnecessary complexity.

## Repository Type

**Frontend Application** - React-based single-page application with Vite, Tailwind CSS, and Zustand state management.

## Key Issues Found

### 1. Unused Code (Quick Wins)
- `getCurrentUser()`, `getCurrentSession()`, `signOut()` in `lib/supabase.js` - not used anywhere
- Large demo data files in `assets/landing/` - only used for landing page
- Duplicate `formatCurrency()` functions in multiple files

### 2. Form Field Repetition
- Input, Select components repeat label/error/required styling
- Same validation patterns in AuthForm and AddSubscriptionModal
- Filter options defined separately in multiple components

### 3. Loading States
- Different spinner styles across components
- Repeated loading conditional rendering patterns

### 4. CSS Class Patterns
- Focus styles repeated: `focus:outline-none focus:ring-2 focus:ring-primary-500`
- Error states: `border-red-300 bg-red-50`
- Disabled styles: `opacity-50 cursor-not-allowed`

## Simple Refactoring Plan

### Step 1: Remove Unused Code (1 day)
- Delete unused functions in `lib/supabase.js`
- Consolidate or remove demo data files
- Remove duplicate `formatCurrency()` functions

### Step 2: Extract Common Styles (1 day)
- Create Tailwind utility classes for repeated patterns
- Add focus, error, and disabled state classes to `index.css`

### Step 3: Centralize Filter Options (1 day)
- Move filter configurations to `types/index.js`
- Export categoryOptions, statusOptions, sortOptions
- Update components to import from single source

### Step 4: Standardize Loading Component (0.5 day)
- Update existing `Loading` component with size variants
- Replace all custom spinner implementations

### Expected Results
- Smaller bundle size from removing unused code
- Easier maintenance with centralized configurations
- Consistent UI patterns across components
- No complex new abstractions or over-engineering

