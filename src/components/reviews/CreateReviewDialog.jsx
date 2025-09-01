import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

const CreateReviewDialog = ({
    formData,
    setFormData,
    courses,
    coursesLoading,
    enrolledStudents,
    enrolledStudentsLoading,
    onCreateReview,
    onClose,
    isCreating
}) => {
    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Create New Review</DialogTitle>
                <p className="text-sm text-gray-600 mt-2">
                    Note: Users must be enrolled in the course to create a review.
                </p>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                    <label>Rating</label>
                    <Select
                        value={formData.rating.toString()}
                        onValueChange={(value) => setFormData({ ...formData, rating: parseInt(value) })}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {[1, 2, 3, 4, 5].map(rating => (
                                <SelectItem key={rating} value={rating.toString()}>
                                    {rating} Star{rating > 1 ? 's' : ''}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <label>Comment</label>
                    <Textarea
                        value={formData.comment}
                        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                        placeholder="Enter your review comment..."
                    />
                </div>
                <div className="grid gap-2">
                    <label>Course</label>
                    <Select
                        value={formData.courseId}
                        onValueChange={(value) => setFormData({ ...formData, courseId: value, userId: "" })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                        <SelectContent>
                            {coursesLoading ? (
                                <SelectItem value="loading-courses" disabled>Loading courses...</SelectItem>
                            ) : courses.length === 0 ? (
                                <SelectItem value="no-courses" disabled>No courses available</SelectItem>
                            ) : (
                                courses.map(course => (
                                    <SelectItem key={course.id} value={course.id.toString()}>
                                        {course.name}
                                    </SelectItem>
                                ))
                            )}
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <label>User</label>
                    <Select
                        value={formData.userId}
                        onValueChange={(value) => setFormData({ ...formData, userId: value })}
                        disabled={!formData.courseId}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={formData.courseId ? "Select an enrolled user" : "Select a course first"} />
                        </SelectTrigger>
                        <SelectContent>
                            {!formData.courseId ? (
                                <SelectItem value="no-course" disabled>Please select a course first</SelectItem>
                            ) : enrolledStudentsLoading ? (
                                <SelectItem value="loading" disabled>Loading enrolled students...</SelectItem>
                            ) : enrolledStudents.length === 0 ? (
                                <SelectItem value="no-students" disabled>No enrolled students for this course</SelectItem>
                            ) : (
                                enrolledStudents.map(student => (
                                    <SelectItem key={student.id} value={student.id.toString()}>
                                        {student.name || student.student?.name} ({student.email || student.student?.email})
                                    </SelectItem>
                                ))
                            )}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button onClick={onCreateReview} disabled={isCreating}>
                    {isCreating ? "Creating..." : "Create Review"}
                </Button>
            </DialogFooter>
        </DialogContent>
    );
};

export default CreateReviewDialog;
