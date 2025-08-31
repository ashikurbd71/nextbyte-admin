# Assignment Submission APIs

This module provides comprehensive API endpoints for managing assignment submissions in the admin panel.

## API Endpoints

### Core CRUD Operations

#### 1. Get All Assignment Submissions

```javascript
const { data, isLoading, error } = useGetAssignmentSubmissionsQuery(params);
```

- **URL**: `GET /assignment-submissions`
- **Params**: Optional query parameters for filtering, pagination, etc.
- **Returns**: Array of assignment submissions with student and assignment details

#### 2. Get Assignment Submission by ID

```javascript
const { data, isLoading, error } = useGetAssignmentSubmissionByIdQuery(id);
```

- **URL**: `GET /assignment-submissions/:id`
- **Returns**: Single assignment submission with full details

#### 3. Create Assignment Submission

```javascript
const [createSubmission, { isLoading }] =
  useCreateAssignmentSubmissionMutation();
await createSubmission(submissionData);
```

- **URL**: `POST /assignment-submissions`
- **Body**: Submission data (description, githubLink, liveLink, fileUrl, studentId, assignmentId)

#### 4. Update Assignment Submission

```javascript
const [updateSubmission, { isLoading }] =
  useUpdateAssignmentSubmissionMutation();
await updateSubmission({ id, ...submissionData });
```

- **URL**: `PATCH /assignment-submissions/:id`
- **Body**: Updated submission data

#### 5. Delete Assignment Submission

```javascript
const [deleteSubmission, { isLoading }] =
  useDeleteAssignmentSubmissionMutation();
await deleteSubmission(id);
```

- **URL**: `DELETE /assignment-submissions/:id`

### Review Operations

#### 6. Review Assignment Submission

```javascript
const [reviewSubmission, { isLoading }] =
  useReviewAssignmentSubmissionMutation();
await reviewSubmission({
  id,
  reviewData: {
    marks: 85,
    feedback: "Great work!",
    status: "approved",
  },
});
```

- **URL**: `PATCH /assignment-submissions/review/:id`
- **Body**: Review data with marks, feedback, and status
- **Status Options**: "pending", "approved", "rejected"

### Student Performance

#### 7. Get Student Performance

```javascript
const { data, isLoading, error } = useGetStudentPerformanceQuery(studentId);
```

- **URL**: `GET /assignment-submissions/student/:studentId/performance`
- **Returns**: Performance statistics and submission history
- **Data Structure**:
  ```javascript
  {
    totalSubmissions: 4,
    totalMarks: 255,
    averageMarks: 63.75,
    statusCounts: {
      pending: 1,
      reviewed: 0,
      approved: 3,
      rejected: 0
    },
    submissions: [...]
  }
  ```

### Filtered Queries

#### 8. Get Submissions by Student

```javascript
const { data, isLoading, error } = useGetSubmissionsByStudentQuery(studentId);
```

- **URL**: `GET /assignment-submissions/student/:studentId`

#### 9. Get Submissions by Assignment

```javascript
const { data, isLoading, error } =
  useGetSubmissionsByAssignmentQuery(assignmentId);
```

- **URL**: `GET /assignment-submissions/assignment/:assignmentId`

#### 10. Get Submissions by Status

```javascript
const { data, isLoading, error } = useGetSubmissionsByStatusQuery(status);
```

- **URL**: `GET /assignment-submissions/status/:status`

#### 11. Get Pending Submissions

```javascript
const { data, isLoading, error } = useGetPendingSubmissionsQuery();
```

- **URL**: `GET /assignment-submissions/pending`

#### 12. Get Reviewed Submissions

```javascript
const { data, isLoading, error } = useGetReviewedSubmissionsQuery();
```

- **URL**: `GET /assignment-submissions/reviewed`

#### 13. Get Submission Statistics

```javascript
const { data, isLoading, error } = useGetSubmissionStatisticsQuery();
```

- **URL**: `GET /assignment-submissions/statistics`

## Data Structure

### Assignment Submission Object

```javascript
{
  id: 11,
  description: "Submission description",
  githubLink: "https://github.com/...",
  liveLink: "https://demo.netlify.app",
  fileUrl: "https://example.com/file.zip",
  marks: 85,
  feedback: "Great work!",
  status: "approved", // "pending", "approved", "rejected"
  reviewedAt: "2025-08-23T21:19:15.498Z",
  studentId: 2,
  assignmentId: 1,
  student: {
    id: 2,
    name: "Student Name",
    email: "student@example.com",
    phone: "1234567890",
    // ... other student fields
  },
  assignment: {
    id: 1,
    title: "Assignment Title",
    description: "Assignment description",
    totalMarks: 100,
    dueDate: "2024-02-01T23:59:59.000Z",
    // ... other assignment fields
  },
  createdAt: "2025-08-23T15:25:41.510Z",
  updatedAt: "2025-08-23T15:27:07.088Z"
}
```

## Custom Hook Usage

### useAssignmentSubmissionActions

This hook provides convenient action methods with built-in error handling and toast notifications:

```javascript
import { useAssignmentSubmissionActions } from "@/hooks/useAssignmentSubmissionActions";

const MyComponent = () => {
  const { refetch } = useGetAssignmentSubmissionsQuery();
  const {
    createSubmission,
    updateSubmission,
    deleteSubmission,
    reviewSubmission,
    isLoading,
  } = useAssignmentSubmissionActions(refetch);

  const handleCreate = async () => {
    const success = await createSubmission({
      description: "My submission",
      githubLink: "https://github.com/...",
      liveLink: "https://demo.netlify.app",
      studentId: 2,
      assignmentId: 1,
    });

    if (success) {
      // Handle success
    }
  };

  const handleReview = async (submissionId) => {
    const success = await reviewSubmission({
      id: submissionId,
      reviewData: {
        marks: 85,
        feedback: "Excellent work!",
        status: "approved",
      },
    });

    if (success) {
      // Handle success
    }
  };

  return <div>{/* Your component JSX */}</div>;
};
```

## Error Handling

All API calls include automatic error handling:

- Network errors are caught and displayed as toast notifications
- Loading states are provided for UI feedback
- Success messages are shown for completed operations
- Confirmation dialogs for destructive actions (delete)

## Cache Management

The APIs use RTK Query's cache management:

- Automatic cache invalidation when data changes
- Optimistic updates for better UX
- Background refetching for fresh data
- Tag-based cache invalidation for related data

## Tags Used

- `assignment-submissions`: All submissions
- `assignment-submission`: Individual submission
- `student-performance`: Student performance data
- `student-submissions`: Student-specific submissions
- `status-submissions`: Status-filtered submissions
- `pending-submissions`: Pending submissions
- `reviewed-submissions`: Reviewed submissions
- `submission-statistics`: Statistics data
