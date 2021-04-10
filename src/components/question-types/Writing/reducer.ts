import { WritingQInitialState, WritingQState } from "./definitions";

type State = WritingQState;

type Actions =
  | { type: 'handleResponse'; response: string }
  | { type: 'correctAnswer'; response: string }
  | { type: 'giveUp'; payload: { answer: string } }
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
        continueEnabled: true,
      };
    case 'giveUp':
      return {
        ...state,
        inputEnabled: false,
        grade: 'incorrect',
        continueEnabled: true,
        inputValue: action.payload.answer
      };
    case 'reset':
      return { ...WritingQInitialState };
    default:
      return state;
  }
};
