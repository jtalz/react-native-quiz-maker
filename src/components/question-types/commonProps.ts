import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

interface QuestionProps {
  index?: number;

  onSubmit: (isCorrect: boolean) => void;

  onContinue: () => void;

  isActiveQuestion: boolean;

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

export default QuestionProps;
