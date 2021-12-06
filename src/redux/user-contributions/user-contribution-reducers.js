const INITIAL_STATE = {
  userContributionsLoading: false,
  userContributions: [],
  userContributionError: null,
  userContributionDetail: {
  }
};

const userContributionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    default:
      return state;

  }
};

export const selectUserContributions = state => state.userContributions;

export default userContributionReducer;
