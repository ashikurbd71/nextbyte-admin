import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CourseReviewHeader = ({ courseName, reviewCount }) => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(-1)}
                    className="flex items-center space-x-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Course Reviews
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        {courseName} - {reviewCount} reviews
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CourseReviewHeader;
