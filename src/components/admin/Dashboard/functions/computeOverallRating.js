export const computeOverallRating = (activityScores) => {
  if (activityScores.length === 0) {
    return { averageScore: 0, rating: "No Data" };
  }

  const numericScores = activityScores.map(Number);

  const totalScore = numericScores.reduce((sum, score) => sum + score, 0);
  const averageScore = totalScore / numericScores.length;

  let rating;
  if (averageScore < 40) {
    rating = "Poor";
  } else if (averageScore >= 40 && averageScore < 60) {
    rating = "Fair";
  } else if (averageScore >= 60 && averageScore < 70) {
    rating = "Good";
  } else if (averageScore >= 70 && averageScore < 80) {
    rating = "Very Good";
  } else if (averageScore >= 80 && averageScore <= 100) {
    rating = "Excellent";
  }

  return {
    averageScore: averageScore.toFixed(2),
    rating: rating,
  };
};
