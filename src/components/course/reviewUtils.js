export const calculateReviewStats = (reviews) => {
    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0
        ? (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1)
        : 0;

    const ratingDistribution = {
        5: reviews.filter(r => r.rating === 5).length,
        4: reviews.filter(r => r.rating === 4).length,
        3: reviews.filter(r => r.rating === 3).length,
        2: reviews.filter(r => r.rating === 2).length,
        1: reviews.filter(r => r.rating === 1).length,
    };

    return {
        totalReviews,
        averageRating,
        ratingDistribution
    };
};

export const filterReviews = (reviews, searchTerm, ratingFilter) => {
    return reviews.filter(review => {
        const student = review.student || review;
        const matchesSearch = student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            review.comment?.toLowerCase().includes(searchTerm.toLowerCase());

        let matchesRating = true;
        if (ratingFilter !== "all") {
            matchesRating = review.rating === parseInt(ratingFilter);
        }

        return matchesSearch && matchesRating;
    });
};
