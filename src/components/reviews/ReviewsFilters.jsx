import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

const ReviewsFilters = ({
    searchTerm,
    setSearchTerm,
    ratingFilter,
    setRatingFilter,
    courseFilter,
    setCourseFilter,
    userFilter,
    setUserFilter,
    reviews
}) => {
    // Get unique courses and users for filters
    const uniqueCourses = [...new Set(reviews.map(review => review.course?.id))].filter(Boolean);
    const uniqueUsers = [...new Set(reviews.map(review => review.user?.id))].filter(Boolean);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filters
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search reviews..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Select value={ratingFilter} onValueChange={setRatingFilter}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by rating" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Ratings</SelectItem>
                            {[1, 2, 3, 4, 5].map(rating => (
                                <SelectItem key={rating} value={rating.toString()}>
                                    {rating} Star{rating > 1 ? 's' : ''}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={courseFilter} onValueChange={setCourseFilter}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by course" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Courses</SelectItem>
                            {uniqueCourses.map(courseId => {
                                const course = reviews.find(r => r.course?.id === courseId)?.course;
                                return (
                                    <SelectItem key={courseId} value={courseId.toString()}>
                                        {course?.name || `Course ${courseId}`}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                    <Select value={userFilter} onValueChange={setUserFilter}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by user" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Users</SelectItem>
                            {uniqueUsers.map(userId => {
                                const user = reviews.find(r => r.user?.id === userId)?.user;
                                return (
                                    <SelectItem key={userId} value={userId.toString()}>
                                        {user?.name || `User ${userId}`}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    );
};

export default ReviewsFilters;
