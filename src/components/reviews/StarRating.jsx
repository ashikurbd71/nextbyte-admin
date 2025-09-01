import { Star } from "lucide-react";

const StarRating = ({ rating, size = "h-4 w-4", showNumber = false }) => {
    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
                <Star
                    key={i}
                    className={`${size} ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
            ))}
            {showNumber && <span className="ml-1 text-sm">({rating})</span>}
        </div>
    );
};

export default StarRating;
