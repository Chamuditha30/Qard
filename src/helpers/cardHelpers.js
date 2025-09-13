//initialize intervals in hours
const ratingIntervals = {
  hard: 1,
  normal: 3,
  easy: 5,
};

//multipliers for repeated correct ratings
const multipliers = {
  hard: 1.2,
  normal: 2.5,
  easy: 4.0,
};

//create new interval according to rating
export const getInterval = (rating) => {
  console.log(rating, ": ", ratingIntervals[rating]);
  return ratingIntervals[rating];
};

//calculate next review date based on interval while creating card
export const getNextReviewDate = (currentInterval) => {
  const now = new Date();
  let nextReview = new Date(now.getTime() + currentInterval * 60 * 60 * 1000);

  console.log("Next review:", nextReview.toLocaleString(), "(local time)");
  return nextReview;
};

//calculate next review date and interval if rate changed
export const getUpdatedReviewDate = (
  oldRating,
  newRating,
  currentInterval,
  currentNextReview
) => {
  //if rate changed, get new next review date and interval
  if (newRating !== oldRating) {
    const newInterval = getInterval(newRating);
    const newNextReview = getNextReviewDate(newInterval);
    return {
      lastIntervalHours: newInterval,
      nextReview: newNextReview,
      updated: true,
    };
  }

  console.log(
    "Not changed: ",
    currentInterval,
    currentNextReview.toLocaleString()
  );
  //no any changes
  return {
    lastIntervalHours: currentInterval,
    nextReview: currentNextReview,
    updated: false,
  };
};

//calculate interval for review card
export const getUpdatedIntervalForReview = (
  oldRating,
  newRating,
  lastInterval
) => {
  const baseInterval = ratingIntervals[newRating];
  const multiplier = multipliers[newRating];

  //user changed rating → reset to base interval
  if (oldRating !== newRating) {
    return baseInterval;
  }

  //same rating → multiply last interval
  return lastInterval * multiplier;
};
