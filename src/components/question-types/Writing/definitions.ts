import type QuestionProps from '../commonProps';

export interface WritingQProps extends QuestionProps {
  question: string;

  answer: string | number;

  underlineLength?: number;

  underlineStyle?: number;
}

export interface WritingQState {
  inputValue: string | number;

  grade: string;

  inputEnabled: boolean;

  nextBtnEnabled: boolean;
}

export const WritingQInitialState: WritingQState = {
  grade: 'unanswered',
  inputEnabled: true,
  nextBtnEnabled: false,
  inputValue: '',
};
