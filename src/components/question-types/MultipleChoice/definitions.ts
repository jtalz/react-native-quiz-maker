import type QuestionProps from "../commonProps";

export interface MultipleChoiceQProps extends QuestionProps {
  question: string;

  answer: string | number;

  allChoices: Array<string | number>;

  underlineLength?: number;

  underlineStyle?: number;
}

export interface MultipleChoiceQState {
  selectedChoice: number;

  questionStatus: string;

  choicesEnabled: boolean;

  checkEnabled: boolean;

  layout: { x: any; y: any };

  occupier: number;

  isFull: boolean;
}

export const MultipleChoiceQInitialState: MultipleChoiceQState = {
  selectedChoice: -1,
  questionStatus: 'unanswered',
  choicesEnabled: true,
  checkEnabled: false,
  layout: { x: 0, y: 0 },
  occupier: -1,
  isFull: false,
};
