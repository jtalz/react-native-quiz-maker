import React from 'react';
import {
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { Sizing, Typography } from '../../../styles';

interface Props {
  instructions?: string;
  question?: string;
  headerContainerStyle?: StyleProp<ViewStyle>;
  instructionsTextStyle?: StyleProp<TextStyle>;
  questionTextStyle?: StyleProp<TextStyle>;
}

const QuestionHeader: React.FC<Props> = (props) => {
  return (
    <SafeAreaView
      style={[
        { flex: 2, alignItems: 'center', justifyContent: 'center' },
        props.headerContainerStyle,
      ]}
    >
      <Text style={[styles.text, styles.questionText, props.questionTextStyle]}>
        {props.question}
      </Text>
      <Text
        style={[
          styles.text,
          styles.instructionsText,
          props.instructionsTextStyle,
        ]}
      >
        {props.instructions}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: Typography.light,
    textAlign: 'center',
    paddingHorizontal: 10,
    color: 'white',
    marginVertical: 10,
  },
  instructionsText: {
    fontSize: Sizing.normalize(12),
  },
  questionText: {
    fontSize: Sizing.normalize(18),
  },
});

export default QuestionHeader;
