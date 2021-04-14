import type { QuestionProps, QuizContainerState } from './definitions';

export const isLastElement = (index: number, arr: any[]) =>
  index === arr.length - 1;

type Actions =
  | { type: 'nextSlide' }
  | { type: 'exit' }
  | { type: 'reset'; payload: { questions: QuestionProps } }
  | {
      type: 'userSubmit';
      payload: { isCorrect: boolean; progressIncrement: number };
    }
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
    return {
      ...state,
      continueEnabled: true,
      progress: action.payload.isCorrect
        ? state.progress + action.payload.progressIncrement
        : state.progress,
    };
  } else if (action.type === 'reset') {
    return {
      questionComponents: [...action.payload.questions],
      activeQuestion: 0,
      progress: 0,
      lives: 3,
      continueEnabled: false,
    };
  } else {
    return state;
  }
};
