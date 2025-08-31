# Enrollment APIs Documentation

## Overview

The enrollment system provides comprehensive functionality for managing course enrollments, including manual payment creation, enrollment tracking, and detailed analytics.

## API Endpoints

### Base URL
```
http://localhost:5000/enrollments
```

### Endpoints

#### 1. Get All Enrollments
- **GET** `/enrollments`
- **Description**: Retrieve all enrollments with optional filtering
- **Query Parameters**: 
  - `status` - Filter by enrollment status
  - `paymentStatus` - Filter by payment status
  - `studentId` - Filter by student ID
  - `courseId` - Filter by course ID

#### 2. Get Enrollment by ID
- **GET** `/enrollments/:id`
- **Description**: Retrieve a specific enrollment by ID

#### 3. Create Manual Payment
- **POST** `/enrollments`
- **Description**: Create a new enrollment with manual payment
- **Request Body**:
```json
{
  "studentId": 3,
  "courseId": 2,
  "amountPaid": 5000,
  "transactionId": "TXN_20240115_001",
  "paymentMethod": "manual"
}
```

#### 4. Update Enrollment
- **PATCH** `/enrollments/:id`
- **Description**: Update enrollment details

#### 5. Delete Enrollment
- **DELETE** `/enrollments/:id`
- **Description**: Delete an enrollment

#### 6. Get Enrollment Statistics
- **GET** `/enrollments/statistics`
- **Description**: Get enrollment statistics and analytics
- **Response**:
```json
{
  "totalEnrollments": 4,
  "activeEnrollments": 2,
  "completedEnrollments": 0,
  "pendingEnrollments": 2,
  "totalRevenue": "17000.00",
  "averageProgress": 25,
  "completionRate": 0
}
```

#### 7. Get Enrollments by Student
- **GET** `/enrollments/student/:studentId`
- **Description**: Get all enrollments for a specific student

#### 8. Get Enrollments by Course
- **GET** `/enrollments/course/:courseId`
- **Description**: Get all enrollments for a specific course

#### 9. Update Enrollment Status
- **PATCH** `/enrollments/:id/status`
- **Description**: Update enrollment status
- **Request Body**:
```json
{
  "status": "active"
}
```

#### 10. Update Payment Status
- **PATCH** `/enrollments/:id/payment`
- **Description**: Update payment status and details
- **Request Body**:
```json
{
  "paymentStatus": "success",
  "paidAt": "2025-01-15T10:30:00.000Z"
}
```

#### 11. Get Enrollment Progress
- **GET** `/enrollments/:id/progress`
- **Description**: Get enrollment progress information

#### 12. Update Enrollment Progress
- **PATCH** `/enrollments/:id/progress`
- **Description**: Update enrollment progress
- **Request Body**:
```json
{
  "progress": 75
}
```

## Data Structure

### Enrollment Object
```json
{
  "id": 5,
  "amountPaid": "4000.00",
  "transactionId": "TXN_1756145395480_9095",
  "status": "pending",
  "paymentStatus": "failed",
  "paymentMethod": "sslcommerz",
  "sslcommerzSessionKey": null,
  "sslcommerzTranId": null,
  "sslcommerzValId": null,
  "sslcommerzBankTranId": null,
  "sslcommerzCardType": null,
  "sslcommerzCardIssuer": null,
  "sslcommerzCardBrand": null,
  "sslcommerzError": null,
  "sslcommerzResponse": null,
  "paidAt": null,
  "failedAt": "2025-08-25T18:09:56.026Z",
  "failureReason": "SSL Commerz payment initiation failed",
  "enrolledAt": null,
  "completedAt": null,
  "progress": 0,
  "student": {
    "id": 7,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "01798958469",
    "studentId": null,
    "photoUrl": null,
    "address": "123 Main St",
    "age": 25,
    "instituteName": "University",
    "semester": "Fall 2024",
    "subject": "Computer Science",
    "isVerified": true,
    "isActive": true,
    "isBanned": false,
    "banReason": null,
    "bannedAt": null,
    "lastOtp": null,
    "otpExpiry": null,
    "isDeleted": false,
    "deletedAt": null,
    "createdAt": "2025-08-25T12:14:09.027Z",
    "updatedAt": "2025-08-28T06:04:20.559Z"
  },
  "course": {
    "id": 2,
    "name": "React Development",
    "slugName": "complete-react-development",
    "duration": "20 hours",
    "price": "5000.00",
    "discountPrice": "4000.00",
    "totalJoin": 2,
    "totalSeat": 100,
    "whatYouWillLearn": ["React fundamentals", "Hooks and state management"],
    "technologies": [{"name": "React", "image": "react-logo.png"}],
    "requirements": ["Basic JavaScript knowledge", "HTML and CSS fundamentals"],
    "promoVideoUrl": "https://www.youtube.com/embed/...",
    "courseVideosUrl": null,
    "thumbnail": "http://localhost:8000/api/cdn/files/...",
    "facebookGroupLink": null,
    "assignments": null,
    "isActive": true,
    "isPublished": true,
    "totalModules": 1,
    "instructors": [...],
    "modules": [...],
    "isFeatured": true,
    "createdAt": "2025-08-20T07:49:15.068Z",
    "updatedAt": "2025-08-30T07:54:57.300Z"
  },
  "createdAt": "2025-08-25T12:17:49.999Z",
  "updatedAt": "2025-08-25T12:17:50.496Z"
}
```

## Status Values

### Enrollment Status
- `active` - Student is actively enrolled and can access course content
- `pending` - Enrollment is pending approval or payment
- `completed` - Student has completed the course
- `cancelled` - Enrollment has been cancelled

### Payment Status
- `success` - Payment was successful
- `pending` - Payment is pending
- `failed` - Payment failed

### Payment Methods
- `manual` - Manual payment (cash, bank transfer, etc.)
- `sslcommerz` - SSL Commerz payment gateway
- `cash` - Cash payment
- `bank_transfer` - Bank transfer
- `check` - Check payment
- `other` - Other payment methods

## Frontend Components

### Pages
1. **EnrollmentsPage** (`/enrollments`) - Main enrollment management page
2. **ManualPaymentPage** (`/manual-payment`) - Create manual payment enrollments
3. **EnrollmentDetailsPage** (`/enrollments/:id`) - View enrollment details

### Features
- **Statistics Dashboard** - Overview of enrollment metrics
- **Search and Filtering** - Find enrollments by various criteria
- **Status Management** - Update enrollment and payment status
- **Student/Course Selection** - Dropdown selectors for manual payments
- **Real-time Updates** - Automatic data refresh and cache invalidation
- **Export Functionality** - Export enrollment data to Excel
- **Responsive Design** - Works on desktop and mobile devices

## Usage Examples

### Creating a Manual Payment
```javascript
import { useCreateManualPaymentMutation } from "@/features/enrollment-apis/enrollmentApis";

const [createManualPayment] = useCreateManualPaymentMutation();

const handleCreatePayment = async () => {
  try {
    const enrollmentData = {
      studentId: 3,
      courseId: 2,
      amountPaid: 5000,
      transactionId: "TXN_20240115_001",
      paymentMethod: "manual"
    };
    
    await createManualPayment(enrollmentData).unwrap();
    toast.success("Manual payment enrollment created successfully!");
  } catch (error) {
    toast.error("Failed to create enrollment");
  }
};
```

### Getting All Enrollments
```javascript
import { useGetAllEnrollmentsQuery } from "@/features/enrollment-apis/enrollmentApis";

const { data: enrollments, isLoading, error } = useGetAllEnrollmentsQuery();
```

### Getting Enrollment Statistics
```javascript
import { useGetEnrollmentStatisticsQuery } from "@/features/enrollment-apis/enrollmentApis";

const { data: stats, isLoading } = useGetEnrollmentStatisticsQuery();
```

## Error Handling

All API calls include comprehensive error handling:
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
- `enrollments` - All enrollments
- `enrollment` - Individual enrollment
- `enrollment-statistics` - Statistics data
- `student-enrollments` - Student-specific enrollments
- `course-enrollments` - Course-specific enrollments
- `enrollment-progress` - Progress data
