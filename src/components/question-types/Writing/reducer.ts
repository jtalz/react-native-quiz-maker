import { WritingQInitialState, WritingQState } from "./definitions";

type State = WritingQState;

type Actions =
  | { type: 'handleResponse'; response: string | number }
  | { type: 'correctAnswer'; response: string | number }
  | { type: 'giveUp' }
  | { type: 'reset' };

export const WritingQReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case 'handleResponse':
      return { ...state, inputValue: action.response };
    case 'correctAnswer':
      return {
        ...state,
        inputValue: action.response,
        inputEnabled: false,
        grade: 'correct',
        nextBtnEnabled: true,
      };
    case 'giveUp':
      return {
        ...state,
        inputEnabled: false,
        grade: 'incorrect',
        nextBtnEnabled: true,
      };
    case 'reset':
      return { ...WritingQInitialState };
    default:
      return state;
  }
};
