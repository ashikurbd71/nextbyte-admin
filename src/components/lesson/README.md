# Lesson Components

This directory contains all the components related to lesson management functionality.

## Components Overview

### 1. **LessonForm.jsx**

- **Purpose**: Form component for creating and editing lessons
- **Features**:
  - Module selection dropdown
  - Content type selection (text, video, file)
  - File upload with CDN integration
  - Preview toggle
  - Form validation
- **Props**:
  - `lesson`: Lesson object for editing (optional)
  - `onSubmit`: Function to handle form submission
  - `onClose`: Function to close the form
  - `isLoading`: Loading state

### 2. **LessonDetailsModal.jsx**

- **Purpose**: Modal to display detailed lesson information
- **Features**:
  - Video content display in iframe
  - File download functionality
  - Text content display
  - Module information
  - Lesson statistics
- **Props**:
  - `lesson`: Lesson object to display
  - `isOpen`: Modal open state
  - `onClose`: Function to close modal

### 3. **LessonStatsCards.jsx**

- **Purpose**: Display lesson statistics in card format
- **Features**:
  - Total lessons count
  - Active lessons count
  - Preview lessons count
  - Content type breakdowns
  - Loading states
- **Props**:
  - `stats`: Statistics data object
  - `isLoading`: Loading state

### 4. **LessonActionsBar.jsx**

- **Purpose**: Action bar with search and filters
- **Features**:
  - Search functionality
  - Status filter
  - Module filter
  - Content type filter
  - Create lesson button
  - Export/Import buttons
- **Props**:
  - Search and filter state variables
  - Filter setter functions
  - Action handlers

### 5. **LessonErrorDisplay.jsx**

- **Purpose**: Display error states for lesson operations
- **Features**:
  - Error message display
  - Retry functionality
  - Consistent error styling
- **Props**:
  - `error`: Error object
  - `onRetry`: Retry function

### 6. **LessonTableColumns.jsx**

- **Purpose**: Define table columns and actions for lesson table
- **Features**:
  - Custom cell renderers
  - Action buttons (view, edit, delete, toggle status)
  - Content type badges
  - Status indicators
- **Props**:
  - Action handler functions
  - Loading states

## API Integration

### Lesson APIs (`src/features/lession-apis/lessionApis.js`)

- **Endpoints**:
  - `GET /lessons` - Get all lessons
  - `GET /lessons/:id` - Get lesson by ID
  - `POST /lessons` - Create lesson
  - `PATCH /lessons/:id` - Update lesson
  - `DELETE /lessons/:id` - Delete lesson
  - `GET /lessons/statistics/overview` - Get lesson statistics overview
  - `GET /lessons?moduleId=:id` - Get lessons by module

### Lesson Actions Hook (`src/hooks/useLessonActions.js`)

- **Functions**:
  - `handleCreateLesson` - Create new lesson
  - `handleUpdateLesson` - Update existing lesson
  - `handleDeleteLesson` - Delete lesson
  - `handleToggleLessonStatus` - Toggle active status
  - `handleToggleLessonPreview` - Toggle preview status

## Data Structure

### Lesson Statistics Response

```javascript
{
  "totalLessons": 15,
  "activeLessons": 12,
  "previewLessons": 3,
  "videoLessons": 8,
  "fileLessons": 5,
  "textLessons": 10,
  "averageDuration": 12,
  "totalViews": 1250
}
```

### Lesson Object

```javascript
{
  id: number,
  title: string,
  description: string,
  order: number,
  duration: string,
  text: string | null,
  fileUrl: string | null,
  videoUrl: string | null,
  isPreview: boolean,
  isActive: boolean,
  moduleId: number,
  module: {
    id: number,
    title: string,
    description: string,
    order: number,
    duration: string,
    isActive: boolean
  },
  createdAt: string,
  updatedAt: string
}
```

## Usage Examples

### Creating a Lesson

```jsx
import { LessonForm } from "@/components/lesson";

const handleCreateLesson = async (formData) => {
  // formData contains: title, description, order, duration, text, fileUrl, videoUrl, isPreview, moduleId
  await createLesson(formData);
};

<LessonForm onSubmit={handleCreateLesson} onClose={() => setShowForm(false)} />;
```

### Displaying Lesson Details

```jsx
import { LessonDetailsModal } from "@/components/lesson";

<LessonDetailsModal
  lesson={selectedLesson}
  isOpen={showDetails}
  onClose={() => setShowDetails(false)}
/>;
```

### Lesson Table with Actions

```jsx
import { createLessonTableColumns } from "@/components/lesson";

const columns = createLessonTableColumns({
  onViewDetails: (lesson) => setSelectedLesson(lesson),
  onEdit: (lesson) => setEditingLesson(lesson),
  onDelete: handleDeleteLesson,
  onToggleStatus: handleToggleStatus,
  onTogglePreview: handleTogglePreview,
  loadingStates,
});
```

## File Upload Integration

The lesson form integrates with the CDN upload system:

- **Supported file types**: PDF, DOC, DOCX, TXT
- **Maximum file size**: 10MB
- **Upload folder**: `lesson-files`
- **CDN URL**: Automatically generated and stored in `fileUrl` field

## Content Type Handling

The system supports three content types:

1. **Video**: YouTube embed URLs stored in `videoUrl`
2. **File**: CDN URLs stored in `fileUrl`
3. **Text**: Plain text content stored in `text`

Only one content type can be active per lesson, with priority: Video > File > Text.

## Navigation

Lessons are accessible via:

- **Main lessons page**: `/lessons`
- **Individual lesson**: `/lessons/:lessonId`
- **Sidebar navigation**: "Lessons" link in the main sidebar
