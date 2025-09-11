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
  console.log(
    "Next review: ",
    new Date(now.getTime() + currentInterval * 60 * 60 * 1000).toLocaleString()
  );
  return new Date(now.getTime() + currentInterval * 60 * 60 * 1000);
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

  //if rating changed, reset interval to baseInterval
  if (oldRating !== newRating) {
    return baseInterval;
  }

  //if rating is same, multiply previous interval
  return lastInterval ? lastInterval * multiplier : baseInterval;
};
