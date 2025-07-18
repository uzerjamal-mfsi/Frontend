export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  WORKOUTS: {
    GET_EXERCISES: '/workouts/exercises',
    ADD_WORKOUT: '/workouts/',
    GET_WORKOUTS_LIST: '/workouts',
    GET_WORKOUT: '/workouts/',
    DELETE_WORKOUT: '/workouts/',
  },
  GOALS: {
    GOALS_LIST: '/goals',
    ADD_GOAL: '/goals',
    ADD_WEIGHT: '/goals/weight',
  },
  ANALYTICS: {
    WEEKLY_CALORIES: '/analytics/workout/calories',
    WEEKLY_FREQUENCY: '/analytics/workout/frequency',
    WEEKLY_DURATION: '/analytics/workout/duration',
    WEIGHT_MEASUREMENT: '/analytics/weight',
  },
};
