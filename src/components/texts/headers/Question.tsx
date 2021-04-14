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
      <Text style={[props.instructionsTextStyle, styles.instructionsText]}>
        {props.instructions}
      </Text>
      <Text style={[props.questionTextStyle]}>{props.question}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  instructionsText: {
    fontFamily: Typography.light,
    fontSize: Sizing.normalize(18),
    textAlign: 'center',
    paddingHorizontal: 10,
    color: 'white',
  },
});

export default QuestionHeader;
