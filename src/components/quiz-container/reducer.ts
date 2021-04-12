import type { QuestionProps, QuizContainerState } from './definitions';

export const isLastElement = (index: number, arr: any[]) =>
  index == arr.length - 1;

type Actions =
  | { type: 'nextSlide' }
  | { type: 'exit' }
  | { type: 'updateProgress' }
  | { type: 'userSubmit' }
  | {
      type: 'setQuestionComponents';
      payload: {
        questionComponents: QuestionProps;
      };
    };

export const QuizContainerReducer = (
  state: QuizContainerState,
  action: Actions
) => {
  if (action.type === 'nextSlide') {
    return {
      ...state,
      activeQuestion: state.activeQuestion + 1,
      continueEnabled: false,
    };
  } else if (action.type === 'userSubmit') {
    return { ...state, continueEnabled: true };
  } else {
    return state;
  }
};
