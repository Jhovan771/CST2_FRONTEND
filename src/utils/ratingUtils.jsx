export const computeOverAllRating = () => {
  const storedData =
    JSON.parse(localStorage.getItem("pronunciationData")) || [];

  if (storedData.length === 0) {
    return { averageAccuracy: 0, rating: "No Data" };
  }

  const totalAccuracy = storedData.reduce(
    (sum, entry) => sum + entry.accuracy,
    0
  );
  const averageAccuracy = totalAccuracy / storedData.length;

  let rating;
  if (averageAccuracy < 40) {
    rating = "Poor";
  } else if (averageAccuracy >= 40 && averageAccuracy < 60) {
    rating = "Fair";
  } else if (averageAccuracy >= 60 && averageAccuracy < 70) {
    rating = "Good";
  } else if (averageAccuracy >= 70 && averageAccuracy < 80) {
    rating = "Very Good";
  } else if (averageAccuracy >= 80 && averageAccuracy <= 100) {
    rating = "Excellent";
  }

  return {
    averageAccuracy: averageAccuracy.toFixed(2),
    rating: rating,
  };
};
