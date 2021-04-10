import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import type QuestionProps from '../commonProps'

export interface MatchingCard {
  index: number;

  name: string;
  
  pair: number;

  selected: boolean;

  visible: boolean;

  justSubmitted: boolean;
}

export interface QuestionAnswerPair {
  question: string;

  answer: string;
}

export interface MatchingQState {
  deck: Array<MatchingCard>;

  continueEnabled: boolean;
}

export interface MatchingQProps extends QuestionProps {
  questionAnswerPairs: Array<QuestionAnswerPair>;

  correctCardColor?: string;

  incorrectCardColor?: string;

  cardStyle?: StyleProp<ViewStyle>;

  inactiveCardColor?: string;

  activeCardColor?: string;

  cardTextStyle?: StyleProp<TextStyle>;

  cardListStyle?: StyleProp<ViewStyle>;

  cardListContainerStyle?: StyleProp<ViewStyle>;

  listScrollEnabled?: boolean;
}
