import type React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { MatchingQProps } from '../question-types/Matching/definitions';
import type { MultipleChoiceQProps } from '../question-types/MultipleChoice/definitions';
import type { WritingQProps } from '../question-types/Writing/definitions';

export type QuestionComponent = (
  | React.FC<MatchingQProps>
  | React.FC<MultipleChoiceQProps>
  | React.FC<WritingQProps>
  | never
);

export type QuestionProps = (
  | MatchingQProps
  | MultipleChoiceQProps
  | WritingQProps
  | never
)[];

/* export interface QuestionComponentContainer {
    component: QuestionComponent;

    question: QuestionProps
} */

export interface QuizContainerProps {
  questions: QuestionProps;

  customContainerStyle?: StyleProp<ViewStyle>;

  lives?: number;
}

export interface QuizContainerState {
  questionComponents: QuestionProps;

  activeQuestion: number;

  progress?: number;

  lives?: number;
}

export const getQuizContainerInitialState = (lives: number = 0) => {
  return {
    questionComponents: [],
    activeQuestion: 0,
    progress: 0,
    lives,
  };
};
