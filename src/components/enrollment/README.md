# Enrollment Components

This directory contains modular components for the enrollment management system, providing a clean and maintainable code structure.

## Components

### EnrollmentStats

Displays enrollment statistics in card format including:

- Total Enrollments
- Active Enrollments
- Pending Enrollments
- Total Revenue

**Props:**

- `stats` - Statistics data object
- `formatCurrency` - Currency formatting function

### EnrollmentFilters

Provides search and filtering functionality:

- Search input for student name, email, course, or transaction ID
- Status filter dropdown
- Payment status filter dropdown

**Props:**

- `searchTerm` - Current search term
- `setSearchTerm` - Function to update search term
- `statusFilter` - Current status filter
- `setStatusFilter` - Function to update status filter
- `paymentStatusFilter` - Current payment status filter
- `setPaymentStatusFilter` - Function to update payment status filter

### EnrollmentCard

Individual enrollment item display with:

- Student information and avatar
- Course details
- Payment information
- Status badges
- Action buttons (view, delete)

**Props:**

- `enrollment` - Enrollment data object
- `formatDate` - Date formatting function
- `formatCurrency` - Currency formatting function
- `onView` - Function called when view button is clicked
- `onDelete` - Function called when delete button is clicked
- `isDeleting` - Boolean indicating if deletion is in progress

### EnrollmentList

Container component that renders the list of enrollments with:

- Header with count and export button
- Empty state when no enrollments found
- List of EnrollmentCard components

**Props:**

- `filteredEnrollments` - Array of filtered enrollment data
- `formatDate` - Date formatting function
- `formatCurrency` - Currency formatting function
- `onView` - Function called when view button is clicked
- `onDelete` - Function called when delete button is clicked
- `isDeleting` - Boolean indicating if deletion is in progress

## Custom Hook

### useEnrollments

Custom hook that encapsulates all enrollment-related logic:

- State management for filters and search
- API calls for data fetching and mutations
- Filtering logic
- Delete functionality

**Returns:**

- All state variables and setters
- Loading states
- Error handling
- Data (enrollments, stats, filtered enrollments)
- Action functions

## Utils

### formatters.js

Utility functions for formatting:

- `formatDate(dateString)` - Formats dates consistently
- `formatCurrency(amount)` - Formats currency amounts

## Usage Example

```jsx
import { useEnrollments } from "@/hooks/useEnrollments";
import {
  EnrollmentStats,
  EnrollmentFilters,
  EnrollmentList,
} from "@/components/enrollment";
import { formatDate, formatCurrency } from "@/utils/formatters";

const EnrollmentsPage = () => {
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    paymentStatusFilter,
    setPaymentStatusFilter,
    filteredEnrollments,
    stats,
    isLoading,
    statsLoading,
    isDeleting,
    error,
    refetch,
    handleDeleteEnrollment,
  } = useEnrollments();

  if (isLoading || statsLoading) return <Loader />;
  if (error) return <ErrorComponent onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <EnrollmentStats stats={stats} formatCurrency={formatCurrency} />

      <EnrollmentFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        paymentStatusFilter={paymentStatusFilter}
        setPaymentStatusFilter={setPaymentStatusFilter}
      />

      <EnrollmentList
        filteredEnrollments={filteredEnrollments}
        formatDate={formatDate}
        formatCurrency={formatCurrency}
        onView={(id) => navigate(`/enrollments/${id}`)}
        onDelete={handleDeleteEnrollment}
        isDeleting={isDeleting}
      />
    </div>
  );
};
```

## Benefits

1. **Modularity**: Each component has a single responsibility
2. **Reusability**: Components can be easily reused in other parts of the application
3. **Maintainability**: Easier to maintain and update individual components
4. **Testability**: Each component can be tested in isolation
5. **Separation of Concerns**: Logic is separated from presentation
6. **Clean Code**: Main page component is much cleaner and focused on composition
