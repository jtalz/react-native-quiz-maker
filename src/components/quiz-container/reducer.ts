import type { QuestionProps, QuizContainerState } from './definitions';

export const isLastElement = (index: number, arr: any[]) => index == arr.length - 1;

type Actions =
  | { type: 'nextSlide' }
  | { type: 'exit' }
  | { type: 'updateProgress' }
  | {
      type: 'setQuestionComponents',
      payload: {
        questionComponents: QuestionProps;
      };
    };

export const QuizContainerReducer = (
  state: QuizContainerState,
  action: Actions
) => {
  if (action.type === 'nextSlide') {
    return { ...state, activeQuestion: state.activeQuestion + 1 };
  } else if (action.type === 'setQuestionComponents') {
    return {...state, questionComponents: action.payload.questionComponents}
  } else {
    return state;
  }
};
