import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import StarRating from "./StarRating";

const ReviewsTable = ({
    filteredReviews,
    onEditReview,
    onDeleteReview
}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Reviews ({filteredReviews.length})</CardTitle>
            </CardHeader>
            <CardContent>
                {filteredReviews.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No reviews found</p>
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Course</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead>Comment</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredReviews.map((review) => (
                                <TableRow key={review.id}>
                                    <TableCell>{review.id}</TableCell>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{review.user?.name || 'Unknown'}</div>
                                            <div className="text-sm text-gray-500">{review.user?.email}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{review.course?.name || 'Unknown'}</div>
                                            <div className="text-sm text-gray-500">ID: {review.course?.id}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <StarRating rating={review.rating} showNumber={true} />
                                    </TableCell>
                                    <TableCell>
                                        <div className="max-w-xs truncate" title={review.comment}>
                                            {review.comment}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={review.isActive ? "default" : "secondary"}>
                                            {review.isActive ? "Active" : "Inactive"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => onEditReview(review)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => onDeleteReview(review.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
};

export default ReviewsTable;
