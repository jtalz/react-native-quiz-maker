import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

type QuestionType = 'Writing' | 'MultipleChoice' | 'Matching';

export interface QuestionProps {
  index?: number;

  questionType?: QuestionType;

  onSubmit?: (isCorrect: boolean) => void;

  onContinue?: () => void;

  isActiveQuestion?: boolean;

  customContainerStyle?: StyleProp<ViewStyle>;

  instructionText?: string;

  headerContainerStyle?: StyleProp<ViewStyle>;

  instructionsTextStyle?: StyleProp<TextStyle>;

  questionTextStyle?: StyleProp<TextStyle>;

  continueLabelStyle?: StyleProp<TextStyle>;

  continueButtonStyle?: StyleProp<ViewStyle>;

  continueButtonContainerStyle?: StyleProp<ViewStyle>;

  checkLabelStyle?: StyleProp<TextStyle>;

  checkButtonStyle?: StyleProp<ViewStyle>;

  checkButtonContainerStyle?: StyleProp<ViewStyle>;

  giveUpLabelStyle?: StyleProp<TextStyle>;

  giveUpButtonStyle?: StyleProp<ViewStyle>;

  giveUpButtonContainerStyle?: StyleProp<ViewStyle>;
}
