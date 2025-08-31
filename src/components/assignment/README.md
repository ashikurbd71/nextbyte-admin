# Assignment Components

This directory contains all the components related to assignment management in the admin panel.

## Components

### AssignmentForm

A modal form component for creating and editing assignments.

**Props:**

- `assignment` (object, optional): Assignment data for editing
- `onSubmit` (function): Callback when form is submitted
- `onClose` (function): Callback to close the modal
- `isLoading` (boolean, optional): Loading state

**Features:**

- Form validation
- Module selector integration
- Date/time picker for due dates
- GitHub and live demo link inputs
- Total marks input

### AssignmentTable

A table component to display assignments with actions.

**Props:**

- `assignments` (array): Array of assignment objects
- `onEdit` (function): Callback for edit action
- `onDelete` (function): Callback for delete action
- `onView` (function): Callback for view action
- `onToggleActive` (function): Callback for toggle active status
- `isLoading` (boolean, optional): Loading state

**Features:**

- Responsive table design
- Status badges
- Due date highlighting
- Link buttons for GitHub and live demo
- Action buttons for CRUD operations

### AssignmentActionsBar

A toolbar component with search, filters, and action buttons.

**Props:**

- `onSearch` (function): Callback for search input
- `onFilter` (function): Callback for filter changes
- `onCreate` (function): Callback for create button
- `onExport` (function): Callback for export button
- `searchValue` (string, optional): Current search value
- `selectedModule` (string, optional): Selected module filter
- `selectedStatus` (string, optional): Selected status filter
- `isLoading` (boolean, optional): Loading state

**Features:**

- Search functionality
- Module filter dropdown
- Status filter dropdown
- Export button
- Create assignment button

### AssignmentDetailsModal

A modal component to display detailed assignment information.

**Props:**

- `assignment` (object): Assignment data to display
- `onClose` (function): Callback to close the modal
- `onEdit` (function): Callback for edit action

**Features:**

- Comprehensive assignment details
- Status indicators
- Due date warnings
- Link buttons
- Edit functionality

### AssignmentStatsCards

A component to display assignment statistics in card format.

**Props:**

- `statistics` (object): Statistics data object
- `isLoading` (boolean, optional): Loading state

**Statistics include:**

- Total assignments
- Active assignments
- Total marks
- Overdue assignments
- Due today
- Due this week
- Average marks
- Completion rate

### AssignmentErrorDisplay

A component to display assignment-related errors.

**Props:**

- `error` (object/string): Error object or message
- `onRetry` (function, optional): Callback for retry action
- `onClose` (function, optional): Callback to close error display
- `title` (string, optional): Error title
- `showCloseButton` (boolean, optional): Show close button

**Features:**

- Error type detection
- Retry functionality
- Development mode details
- Responsive design

## Data Structure

Assignments follow this structure:

```javascript
{
  id: number,
  title: string,
  description: string,
  githubLink: string,
  liveLink: string,
  totalMarks: number,
  dueDate: string, // ISO date string
  isActive: boolean,
  moduleId: number,
  module: {
    id: number,
    title: string,
    description: string,
    order: number,
    duration: string,
    isActive: boolean,
    createdAt: string,
    updatedAt: string
  },
  createdAt: string,
  updatedAt: string
}
```

## API Integration

These components work with the assignment APIs defined in `src/features/assignment-apis/assignmentApis.js`:

- `useCreateAssignmentMutation`
- `useGetAssignmentsQuery`
- `useGetAssignmentByIdQuery`
- `useUpdateAssignmentMutation`
- `useDeleteAssignmentMutation`
- `useToggleAssignmentActiveStatusMutation`
- `useGetAssignmentsByModuleQuery`
- `useGetAssignmentStatisticsQuery`

## Usage Example

```jsx
import React, { useState } from "react";
import {
  AssignmentForm,
  AssignmentTable,
  AssignmentActionsBar,
  AssignmentDetailsModal,
  AssignmentStatsCards,
  AssignmentErrorDisplay,
} from "@/components/assignment";
import {
  useGetAssignmentsQuery,
  useCreateAssignmentMutation,
  useUpdateAssignmentMutation,
  useDeleteAssignmentMutation,
  useToggleAssignmentActiveStatusMutation,
  useGetAssignmentStatisticsQuery,
} from "@/features/assignment-apis/assignmentApis";

const AssignmentPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const {
    data: assignments,
    isLoading,
    error,
    refetch,
  } = useGetAssignmentsQuery();
  const { data: statistics } = useGetAssignmentStatisticsQuery();
  const [createAssignment, { isLoading: isCreating }] =
    useCreateAssignmentMutation();
  const [updateAssignment, { isLoading: isUpdating }] =
    useUpdateAssignmentMutation();
  const [deleteAssignment] = useDeleteAssignmentMutation();
  const [toggleActive] = useToggleAssignmentActiveStatusMutation();

  const handleCreate = () => {
    setSelectedAssignment(null);
    setShowForm(true);
  };

  const handleEdit = (assignment) => {
    setSelectedAssignment(assignment);
    setShowForm(true);
  };

  const handleSubmit = async (data) => {
    try {
      if (selectedAssignment) {
        await updateAssignment({ id: selectedAssignment.id, ...data }).unwrap();
      } else {
        await createAssignment(data).unwrap();
      }
      setShowForm(false);
      setSelectedAssignment(null);
    } catch (error) {
      console.error("Error saving assignment:", error);
    }
  };

  const handleDelete = async (assignment) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      try {
        await deleteAssignment(assignment.id).unwrap();
      } catch (error) {
        console.error("Error deleting assignment:", error);
      }
    }
  };

  const handleToggleActive = async (assignment) => {
    try {
      await toggleActive(assignment.id).unwrap();
    } catch (error) {
      console.error("Error toggling assignment status:", error);
    }
  };

  if (error) {
    return (
      <AssignmentErrorDisplay
        error={error}
        onRetry={refetch}
        title="Error Loading Assignments"
      />
    );
  }

  return (
    <div className="space-y-6">
      <AssignmentStatsCards statistics={statistics} isLoading={isLoading} />

      <AssignmentActionsBar
        onCreate={handleCreate}
        onSearch={(search) => console.log("Search:", search)}
        onFilter={(filters) => console.log("Filters:", filters)}
        onExport={() => console.log("Export")}
        isLoading={isLoading}
      />

      <AssignmentTable
        assignments={assignments || []}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={(assignment) => {
          setSelectedAssignment(assignment);
          setShowDetails(true);
        }}
        onToggleActive={handleToggleActive}
        isLoading={isLoading}
      />

      {showForm && (
        <AssignmentForm
          assignment={selectedAssignment}
          onSubmit={handleSubmit}
          onClose={() => setShowForm(false)}
          isLoading={isCreating || isUpdating}
        />
      )}

      {showDetails && selectedAssignment && (
        <AssignmentDetailsModal
          assignment={selectedAssignment}
          onClose={() => setShowDetails(false)}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default AssignmentPage;
```

## Styling

All components use Tailwind CSS classes and follow the design system defined in the UI components. The components are responsive and work well on both desktop and mobile devices.
