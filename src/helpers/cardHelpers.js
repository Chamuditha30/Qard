//cal new interval if user change rating
export const getUpdatedInterval = (currentInterval, oldRating, newRating) => {
  //initialize intervals in hours
  const ratingIntervals = {
    hard: 1,
    normal: 3,
    easy: 5,
  };

  //if rating changed, return new interval. if it isnt return current
  if (newRating !== oldRating) {
    return ratingIntervals[newRating];
  }

  return currentInterval;
};

//cal next review
export const getNextReview = (intervalHours, rating) => {
  //initialize multipliers to each ratings
  const multipliers = {
    hard: 1.2,
    normal: 2.5,
    easy: 4.0,
  };

  //get current date/time
  const now = new Date();

  //apply algorithm to cal next interval hours
  const nextIntervalHours = intervalHours * multipliers[rating];

  //return next review date
  return new Date(now.getTime() + nextIntervalHours * 60 * 60 * 1000);
};
