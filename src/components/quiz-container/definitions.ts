import type React from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { MatchingQProps } from '../question-types/Matching/definitions';
import type { MultipleChoiceQProps } from '../question-types/MultipleChoice/definitions';
import type { WritingQProps } from '../question-types/Writing/definitions';

export type QuestionComponent =
  | React.FC<MatchingQProps>
  | React.FC<MultipleChoiceQProps>
  | React.FC<WritingQProps>
  | never;

export type QuestionProps = (
  | MatchingQProps
  | MultipleChoiceQProps
  | WritingQProps
  | never
)[];

export interface QuizContainerProps {
  questions: QuestionProps;

  customContainerStyle?: StyleProp<ViewStyle>;

  lives?: number;

  continueLabelStyle?: StyleProp<TextStyle>;

  continueButtonStyle?: StyleProp<ViewStyle>;

  onSubmit: (isCorrect: boolean) => void;
}

export interface QuizContainerState {
  questionComponents: QuestionProps;

  activeQuestion: number;

  progress?: number;

  lives?: number;

  continueEnabled: boolean;
}
