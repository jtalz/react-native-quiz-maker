import {
  MultipleChoiceQInitialState,
  MultipleChoiceQState,
} from './definitions';

type Actions =
  | { type: 'selectChoice'; payload: { selectedChoice: number } }
  | {
      type: 'checkPlease';
      payload: { answer: string | number; allChoices: Array<string | number> };
    }
  | { type: 'disableCheck' }
  | { type: 'setCoordinates'; payload: { layout: { x: any; y: any } } }
  | { type: 'prepareForLanding'; payload: { occupier: number } }
  | { type: 'clearOut' }
  | { type: 'reset' };

type QuestionState = MultipleChoiceQState;

export const MultipleChoiceQReducer = (
  state: QuestionState,
  action: Actions
) => {
  if (action.type === 'selectChoice') {
    return {
      ...state,
      selectedChoice: action.payload.selectedChoice,
      checkEnabled: true,
    };
  } else if (action.type === 'checkPlease') {
    return action.payload.allChoices[state.selectedChoice] ===
      action.payload.answer
      ? { ...state, questionStatus: 'correct', choicesEnabled: false, continueEnabled: true, checkEnabled: false }
      : { ...state, questionStatus: 'incorrect', choicesEnabled: false, continueEnabled: true, checkEnabled: false };
  } else if (action.type === 'disableCheck') {
    return { ...state, checkEnabled: false };
  } else if (action.type === 'setCoordinates') {
    return { ...state, layout: action.payload.layout };
  } else if (action.type === 'prepareForLanding') {
    return { ...state, isFull: true, occupier: action.payload.occupier };
  } else if (action.type === 'clearOut') {
    return { ...state, isFull: false, occupier: -1, checkEnabled: false };
  } else if (action.type === 'reset') {
    return { ...MultipleChoiceQInitialState };
  } else {
    return state;
  }
};
