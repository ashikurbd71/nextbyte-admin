import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getAccessibleRoutes, getAdminRoleDisplay } from '@/lib/enums';

// Icons (you'll need to import your actual icons)
import {
    DashboardIcon,
    AnalyticsIcon,
    UserIcon,
    CourseIcon,
    ModuleIcon,
    LessonIcon,
    ReviewIcon,
    NotificationIcon,
    AssignmentIcon,
    SubmissionIcon,
    CategoryIcon,
    InstructorIcon,
    EnrollmentIcon,
    SupportIcon,
    SettingsIcon
} from '@/assets/icons/svgIcons';

const AdminSidebar = () => {
    const location = useLocation();
    const { admin } = useSelector((state) => state.adminAuth);

    const accessibleRoutes = getAccessibleRoutes(admin?.role);

    const menuItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: DashboardIcon,
            path: '/admin/dashboard',
            description: 'Overview and statistics'
        },
        {
            id: 'analytics',
            label: 'Analytics',
            icon: AnalyticsIcon,
            path: '/admin/analytics',
            description: 'Detailed analytics and reports'
        },
        {
            id: 'instructor',
            label: 'Instructors',
            icon: InstructorIcon,
            path: '/admin/instructors',
            description: 'Manage instructors'
        },
        {
            id: 'enrollment',
            label: 'Enrollments',
            icon: EnrollmentIcon,
            path: '/admin/enrollments',
            description: 'Manage student enrollments'
        },
        {
            id: 'support-tickets',
            label: 'Support Tickets',
            icon: SupportIcon,
            path: '/admin/support-tickets',
            description: 'Handle support requests'
        },
        {
            id: 'user',
            label: 'Users',
            icon: UserIcon,
            path: '/admin/users',
            description: 'Manage system users'
        },
        {
            id: 'categories',
            label: 'Categories',
            icon: CategoryIcon,
            path: '/admin/categories',
            description: 'Manage course categories'
        },
        {
            id: 'courses',
            label: 'Courses',
            icon: CourseIcon,
            path: '/admin/courses',
            description: 'Manage courses'
        },
        {
            id: 'modules',
            label: 'Modules',
            icon: ModuleIcon,
            path: '/admin/modules',
            description: 'Manage course modules'
        },
        {
            id: 'lessons',
            label: 'Lessons',
            icon: LessonIcon,
            path: '/admin/lessons',
            description: 'Manage lessons'
        },
        {
            id: 'reviews',
            label: 'Reviews',
            icon: ReviewIcon,
            path: '/admin/reviews',
            description: 'Manage course reviews'
        },
        {
            id: 'notifications',
            label: 'Notifications',
            icon: NotificationIcon,
            path: '/admin/notifications',
            description: 'Manage notifications'
        },
        {
            id: 'assignments',
            label: 'Assignments',
            icon: AssignmentIcon,
            path: '/admin/assignments',
            description: 'Manage assignments'
        },
        {
            id: 'assignment-submissions',
            label: 'Submissions',
            icon: SubmissionIcon,
            path: '/admin/submissions',
            description: 'Review submissions'
        }
    ];

    const filteredMenuItems = menuItems.filter(item =>
        accessibleRoutes.includes(item.id)
    );

    return (
        <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full">
            {/* Admin Info */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                            {admin?.name?.charAt(0)?.toUpperCase()}
                        </span>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                            {admin?.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {getAdminRoleDisplay(admin?.role)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="p-4 space-y-2">
                {filteredMenuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.id}
                            to={item.path}
                            className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                            title={item.description}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Settings Link */}
            <div className="absolute bottom-4 left-4 right-4">
                <Link
                    to="/admin/settings"
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === '/admin/settings'
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                >
                    <SettingsIcon className="w-5 h-5" />
                    <span>Settings</span>
                </Link>
            </div>
        </div>
    );
};

export default AdminSidebar;
