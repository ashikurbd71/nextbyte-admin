# Analytics Components

This directory contains the modular components for the Analytics Dashboard. The components have been separated from the main `AnalyticsPage.jsx` for better code organization, maintainability, and reusability.

## Component Structure

```
src/components/analytics/
├── index.js                    # Export all components
├── README.md                   # This documentation
├── AnalyticsHeader.jsx         # Page header with title and description
├── ActionBar.jsx              # Action buttons (filter, export, etc.)
├── MetricsCards.jsx           # Key metrics display cards
├── ChartsSection.jsx          # Main charts and visualizations
├── WeeklyRevenueChart.jsx     # Weekly revenue breakdown chart
├── PerformanceOverview.jsx    # Performance metrics and top courses
├── DatePicker.jsx             # Reusable date picker component
├── EarningsReport.jsx         # Earnings report with date filtering
└── EnrollmentReport.jsx       # Enrollment report with date filtering
```

## Component Details

### AnalyticsHeader

- **Purpose**: Displays the page title and description
- **Props**: None
- **Usage**: `<AnalyticsHeader />`

### ActionBar

- **Purpose**: Contains action buttons for filtering, exporting, and viewing reports
- **Props**: None
- **Usage**: `<ActionBar />`

### MetricsCards

- **Purpose**: Displays key performance metrics in card format
- **Props**:
  - `dashboardData`: Dashboard statistics data
  - `conversionRate`: Calculated conversion rate
  - `successRate`: Calculated success rate
- **Usage**: `<MetricsCards dashboardData={data} conversionRate={rate} successRate={rate} />`

### ChartsSection

- **Purpose**: Main charts including revenue overview and enrollment status distribution
- **Props**:
  - `dashboardData`: Dashboard statistics data
  - `chartData`: Transformed chart data
  - `trafficSources`: Enrollment status data
- **Usage**: `<ChartsSection dashboardData={data} chartData={chartData} trafficSources={sources} />`

### WeeklyRevenueChart

- **Purpose**: Weekly revenue breakdown visualization
- **Props**:
  - `dashboardData`: Dashboard statistics data
- **Usage**: `<WeeklyRevenueChart dashboardData={data} />`

### PerformanceOverview

- **Purpose**: Performance indicators and top performing courses
- **Props**:
  - `dashboardData`: Dashboard statistics data
  - `topProducts`: Top courses data
  - `successRate`: Calculated success rate
- **Usage**: `<PerformanceOverview dashboardData={data} topProducts={products} successRate={rate} />`

### DatePicker

- **Purpose**: Reusable date range picker component
- **Props**:
  - `showDatePicker`: Boolean to show/hide picker
  - `setShowDatePicker`: Function to toggle picker
  - `currentMonth`: Current month state
  - `setCurrentMonth`: Function to update current month
  - `selectedStartDate`: Selected start date
  - `setSelectedStartDate`: Function to update start date
  - `selectedEndDate`: Selected end date
  - `setSelectedEndDate`: Function to update end date
  - `onApply`: Function called when applying date range
  - `onReset`: Function called when resetting date range
  - `title`: Optional title for the picker (default: "Select Date Range")
- **Usage**: `<DatePicker {...datePickerProps} />`

### EarningsReport

- **Purpose**: Earnings report with date filtering and payment details
- **Props**:
  - `earningsData`: Earnings report data
  - `earningsLoading`: Loading state
  - `earningsError`: Error state
  - `earningsDateRange`: Current date range
  - Date picker related props (see DatePicker)
- **Usage**: `<EarningsReport {...earningsProps} />`

### EnrollmentReport

- **Purpose**: Enrollment report with date filtering and enrollment details
- **Props**:
  - `enrollmentData`: Enrollment report data
  - `enrollmentLoading`: Loading state
  - `enrollmentError`: Error state
  - `enrollmentDateRange`: Current date range
  - Date picker related props (see DatePicker)
- **Usage**: `<EnrollmentReport {...enrollmentProps} />`

## Benefits of This Structure

1. **Modularity**: Each component has a single responsibility
2. **Reusability**: Components can be reused in other parts of the application
3. **Maintainability**: Easier to maintain and update individual components
4. **Testability**: Each component can be tested independently
5. **Readability**: Code is more organized and easier to understand
6. **Scalability**: Easy to add new features or modify existing ones

## Usage in AnalyticsPage

The main `AnalyticsPage.jsx` now imports and uses these components:

```jsx
import {
    AnalyticsHeader,
    ActionBar,
    MetricsCards,
    ChartsSection,
    WeeklyRevenueChart,
    PerformanceOverview,
    EarningsReport,
    EnrollmentReport
} from "@/components/analytics";

// Then use them in the render method
<AnalyticsHeader />
<ActionBar />
<MetricsCards dashboardData={dashboardData} conversionRate={conversionRate} successRate={successRate} />
// ... etc
```

## Data Flow

1. **AnalyticsPage** fetches data from APIs
2. **AnalyticsPage** transforms data for charts and displays
3. **AnalyticsPage** passes data as props to child components
4. **Child components** render the UI based on received props
5. **DatePicker** components handle user interactions and trigger API refetches

This structure ensures clean separation of concerns and makes the codebase more maintainable.
