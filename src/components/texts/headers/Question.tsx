import React from 'react';
import { SafeAreaView, StyleProp, Text, TextStyle, ViewStyle } from 'react-native';

interface Props {
  instructions?: string;
  question?: string;
  headerContainerStyle?: StyleProp<ViewStyle>;
  instructionsTextStyle?: StyleProp<TextStyle>;
  questionTextStyle?: StyleProp<TextStyle>;
}

const QuestionHeader: React.FC<Props> = (props) => {
  return (
    <SafeAreaView style={[{flex: 2, alignItems: 'center', justifyContent: 'center'}, props.headerContainerStyle]}>
      <Text style={[props.instructionsTextStyle]}>{props.instructions}</Text>
      <Text style={[props.questionTextStyle]}>{props.question}</Text>
    </SafeAreaView>
  );
};

export default QuestionHeader;
