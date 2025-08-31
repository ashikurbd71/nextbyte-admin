# Support Tickets Components

This directory contains all the components related to the Support Tickets functionality, organized for better code structure and maintainability.

## Component Structure

### Core Components

1. **SupportTicketsHeader** (`SupportTicketsHeader.jsx`)

   - Displays the page title and description
   - Simple header component with consistent styling

2. **SupportTicketsStatsCards** (`SupportTicketsStatsCards.jsx`)

   - Displays statistics cards (Total, Open, Assigned, Closed tickets)
   - Handles loading states with skeleton animation
   - Responsive grid layout

3. **SupportTicketsTable** (`SupportTicketsTable.jsx`)

   - Main table component for displaying tickets
   - Handles loading, empty, and error states
   - Includes action buttons for each ticket

4. **AssignTicketModal** (`AssignTicketModal.jsx`)

   - Modal for assigning tickets to mentors
   - Form with mentor selection and meeting link input
   - Includes close ticket functionality

5. **TicketDetailsModal** (`TicketDetailsModal.jsx`)

   - Modal for viewing detailed ticket information
   - Displays all ticket fields in a structured layout
   - Shows meeting link with external link icon

6. **ErrorDisplay** (`ErrorDisplay.jsx`)
   - Reusable error component
   - Displays error message with retry functionality

### Utilities

7. **utils.jsx**
   - `getStatusBadge()`: Creates status badges with icons
   - `getTableColumns()`: Defines table column configuration
   - Centralized utility functions

### Index File

8. **index.js**
   - Exports all components and utilities
   - Provides clean import interface

## Usage

```jsx
import {
  SupportTicketsHeader,
  SupportTicketsStatsCards,
  SupportTicketsTable,
  AssignTicketModal,
  TicketDetailsModal,
  ErrorDisplay,
  getStatusBadge,
} from "@/components/support-tickets";
```

## Benefits of This Structure

1. **Separation of Concerns**: Each component has a single responsibility
2. **Reusability**: Components can be easily reused in other parts of the application
3. **Maintainability**: Easier to maintain and update individual components
4. **Testability**: Each component can be tested independently
5. **Code Organization**: Clear structure makes it easier to find and modify code
6. **Performance**: Smaller components can be optimized individually

## Component Props

### SupportTicketsStatsCards

- `stats`: Object containing ticket statistics
- `isLoading`: Boolean for loading state

### SupportTicketsTable

- `tickets`: Array of ticket objects
- `isLoading`: Boolean for loading state
- `onViewDetails`: Function to handle view details action
- `onAssignTicket`: Function to handle assign ticket action
- `onCloseTicket`: Function to handle close ticket action
- `onDeleteTicket`: Function to handle delete ticket action
- `loadingStates`: Object containing loading states for actions
- `getStatusBadge`: Function to create status badges

### AssignTicketModal

- `isOpen`: Boolean for modal visibility
- `onClose`: Function to close modal
- `assignFormData`: Object containing form data
- `setAssignFormData`: Function to update form data
- `mentors`: Array of mentor objects
- `mentorsLoading`: Boolean for mentors loading state
- `onAssign`: Function to handle assign action
- `onCloseTicket`: Function to handle close ticket action
- `selectedTicket`: Currently selected ticket object
- `loadingStates`: Object containing loading states

### TicketDetailsModal

- `isOpen`: Boolean for modal visibility
- `onClose`: Function to close modal
- `selectedTicket`: Currently selected ticket object
- `getStatusBadge`: Function to create status badges

### ErrorDisplay

- `error`: Error object
- `onRetry`: Function to retry the failed operation
