# UsersPage Component Structure

## Overview

The UsersPage has been refactored into a well-structured, modular component system with separate components for different sections and functionality.

## Main Components

### 1. **UsersPage.jsx** (Main Container)

- **Location**: `src/pages/dashboard/UsersPage.jsx`
- **Purpose**: Main page component that orchestrates all user management functionality
- **Responsibilities**:
  - State management for modals and filters
  - API data fetching
  - Component composition and layout
  - Error handling

### 2. **UserStatsCards.jsx**

- **Location**: `src/components/user/UserStatsCards.jsx`
- **Purpose**: Displays user statistics in card format
- **Features**:
  - Total Users, Active Users, Verified Users, Banned Users
  - Loading states for each stat
  - Responsive grid layout
  - Color-coded icons and backgrounds

### 3. **UserActionsBar.jsx**

- **Location**: `src/components/user/UserActionsBar.jsx`
- **Purpose**: Provides action buttons for user management
- **Features**:
  - Toggle between all users and banned users
  - Add new user button
  - Quick Export to Excel (all fields)
  - Advanced Export with field selection
  - Responsive design

### 4. **UserQuickActions.jsx**

- **Location**: `src/components/user/UserQuickActions.jsx`
- **Purpose**: Quick action cards for bulk operations and recent activity
- **Features**:
  - Invite users functionality
  - Bulk actions (edit, activate, deactivate, view enrollments, delete)
  - Recent activity feed

### 5. **UserTableActions.jsx**

- **Location**: `src/components/user/UserTableActions.jsx`
- **Purpose**: Action buttons for individual user rows in the table
- **Features**:
  - View details, enrollment performance
  - Toggle user status (activate/deactivate)
  - Ban/unban users
  - Verify users
  - Delete users
  - Loading states for each action

### 6. **UserStatusBadge.jsx**

- **Location**: `src/components/user/UserStatusBadge.jsx`
- **Purpose**: Displays user status with appropriate colors and icons
- **Features**:
  - Status indicators (Active, Pending, Inactive, Banned)
  - Color-coded badges
  - Verification checkmark

### 7. **UserTableColumns.jsx**

- **Location**: `src/components/user/UserTableColumns.jsx`
- **Purpose**: Defines the table column configuration
- **Features**:
  - User information display
  - Status badges
  - Contact information
  - Action buttons
  - Sortable columns

### 8. **UserErrorDisplay.jsx**

- **Location**: `src/components/user/UserErrorDisplay.jsx`
- **Purpose**: Displays error states with retry functionality
- **Features**:
  - Error message display
  - Retry button
  - Consistent error UI

### 9. **UserExportModal.jsx**

- **Location**: `src/components/user/UserExportModal.jsx`
- **Purpose**: Advanced export modal with field selection
- **Features**:
  - Field selection for export
  - Select all/none functionality
  - Custom export with chosen fields
  - Loading states during export

## Utility Files

### 10. **userUtils.js**

- **Location**: `src/utils/userUtils.js`
- **Purpose**: Common utility functions for user-related operations
- **Functions**:
  - `formatDate()` - Format date strings
  - `getStatusColor()` - Get status badge colors
  - `getStatusText()` - Get status text labels

### 11. **useUserActions.js** (Custom Hook)

- **Location**: `src/hooks/useUserActions.js`
- **Purpose**: Custom hook for managing user actions and API calls
- **Features**:
  - All user action handlers (delete, ban, unban, activate, verify, toggle status)
  - Loading states management
  - Error handling with toast notifications
  - API integration

### 12. **exportUtils.js**

- **Location**: `src/utils/exportUtils.js`
- **Purpose**: Excel export functionality for user data
- **Features**:
  - Export data to Excel format
  - Format user data for export
  - Download functionality
  - Error handling

## Benefits of This Structure

1. **Modularity**: Each component has a single responsibility
2. **Reusability**: Components can be reused in other parts of the application
3. **Maintainability**: Easier to maintain and update individual components
4. **Testability**: Each component can be tested independently
5. **Code Organization**: Clear separation of concerns
6. **Performance**: Better code splitting and lazy loading potential
7. **Developer Experience**: Easier to understand and work with

## File Structure

```
src/
├── pages/dashboard/
│   └── UsersPage.jsx
├── components/user/
│   ├── UserStatsCards.jsx
│   ├── UserActionsBar.jsx
│   ├── UserQuickActions.jsx
│   ├── UserTableActions.jsx
│   ├── UserStatusBadge.jsx
│   ├── UserTableColumns.jsx
│   ├── UserErrorDisplay.jsx
│   └── UserExportModal.jsx
├── utils/
│   ├── userUtils.js
│   └── exportUtils.js
└── hooks/
    └── useUserActions.js
```

## Usage Example

```jsx
// The main UsersPage is now much cleaner and focused
const UsersPage = () => {
  // State management
  // API hooks
  // Custom hooks for actions

  return (
    <div className="space-y-6">
      <Header />
      <UserStatsCards stats={stats} statsLoading={statsLoading} />
      <UserActionsBar {...actionBarProps} />
      <DataTable {...tableProps} />
      <UserQuickActions />
      {/* Modals */}
    </div>
  );
};
```
