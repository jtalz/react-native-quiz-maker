import type QuestionProps from '../commonProps';

export interface WritingQProps extends QuestionProps {
  question: string;

  answer: string;

  underlineLength?: number;

  underlineStyle?: number;
}

export interface WritingQState {
  inputValue: string;

  grade: string;

  inputEnabled: boolean;

  continueEnabled: boolean;
}

export const WritingQInitialState: WritingQState = {
  grade: 'unanswered',
  inputEnabled: true,
  continueEnabled: false,
  inputValue: '',
};
