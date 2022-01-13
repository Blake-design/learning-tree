import { CHANGE, SUBMIT } from "./actions";

// Name has to be letters numbers and be between 6 and 15 characters

export const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE:
      return {
        user: action.value,
      };
    case SUBMIT:
      return {
        ...state,
      };
    default:
      return state;
  }
};
