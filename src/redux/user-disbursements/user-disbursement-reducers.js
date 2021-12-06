const INITIAL_STATE = {
  userDisbursementLoading: false,
  userDisbursements: [],
  userDisbursementError: null,
  userDisbursementDetail: {}
};

const userDisbursementReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    default:
      return state;

  }
};

export const selectUserDisbursements = state => state.userDisbursements;

export default userDisbursementReducer;
