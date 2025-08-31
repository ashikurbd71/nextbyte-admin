# Reviews Components

This directory contains the separated components for the Reviews Management page, providing better code structure and reusability.

## Components

### 1. ReviewsHeader

- **Purpose**: Header section with title and action buttons (Refresh, Export, Add Review)
- **Props**:
  - `onRefresh`: Function to refresh data
  - `onExport`: Function to export data
  - `onCreateClick`: Function to open create dialog
  - `isCreateDialogOpen`: Boolean for dialog state
  - `setIsCreateDialogOpen`: Function to set dialog state
  - `children`: Dialog content (CreateReviewDialog)

### 2. ReviewsStats

- **Purpose**: Statistics cards showing review metrics
- **Props**:
  - `reviews`: Array of review data

### 3. ReviewsFilters

- **Purpose**: Filter section with search and filter controls
- **Props**:
  - `searchTerm`: Current search term
  - `setSearchTerm`: Function to update search term
  - `ratingFilter`: Current rating filter
  - `setRatingFilter`: Function to update rating filter
  - `courseFilter`: Current course filter
  - `setCourseFilter`: Function to update course filter
  - `userFilter`: Current user filter
  - `setUserFilter`: Function to update user filter
  - `reviews`: Array of review data

### 4. ReviewsTable

- **Purpose**: Table displaying reviews with actions
- **Props**:
  - `filteredReviews`: Array of filtered reviews
  - `onEditReview`: Function to handle edit action
  - `onDeleteReview`: Function to handle delete action

### 5. CreateReviewDialog

- **Purpose**: Dialog for creating new reviews
- **Props**:
  - `formData`: Form data object
  - `setFormData`: Function to update form data
  - `courses`: Array of available courses
  - `coursesLoading`: Boolean for courses loading state
  - `enrolledStudents`: Array of enrolled students
  - `enrolledStudentsLoading`: Boolean for students loading state
  - `onCreateReview`: Function to create review
  - `onClose`: Function to close dialog
  - `isCreating`: Boolean for creation loading state

### 6. EditReviewDialog

- **Purpose**: Dialog for editing existing reviews
- **Props**:
  - `formData`: Form data object
  - `setFormData`: Function to update form data
  - `onEditReview`: Function to update review
  - `onClose`: Function to close dialog
  - `isUpdating`: Boolean for update loading state
  - `isOpen`: Boolean for dialog open state
  - `setIsOpen`: Function to set dialog open state

### 7. StarRating

- **Purpose**: Reusable star rating component
- **Props**:
  - `rating`: Number of stars to display
  - `size`: CSS classes for star size (default: "h-4 w-4")
  - `showNumber`: Boolean to show rating number (default: false)

## Usage

```jsx
import {
    ReviewsHeader,
    ReviewsStats,
    ReviewsFilters,
    ReviewsTable,
    CreateReviewDialog,
    EditReviewDialog,
    StarRating
} from "@/components/reviews";

// Use in your main component
<ReviewsHeader
    onRefresh={refetch}
    onExport={exportToCSV}
    onCreateClick={openCreateDialog}
    isCreateDialogOpen={isCreateDialogOpen}
    setIsCreateDialogOpen={setIsCreateDialogOpen}
>
    <CreateReviewDialog {...createDialogProps} />
</ReviewsHeader>

<ReviewsStats reviews={reviews} />

<ReviewsFilters {...filterProps} />

<ReviewsTable {...tableProps} />

<EditReviewDialog {...editDialogProps} />
```

## Benefits

1. **Better Code Organization**: Each component has a single responsibility
2. **Reusability**: Components can be reused in other parts of the application
3. **Maintainability**: Easier to maintain and update individual components
4. **Testing**: Each component can be tested independently
5. **Performance**: Better code splitting and potential for optimization
6. **Readability**: Main page component is much cleaner and easier to understand
