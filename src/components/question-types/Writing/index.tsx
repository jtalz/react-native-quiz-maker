import React, { useReducer } from 'react';
import { View, TextInput } from 'react-native';
import { Sizing } from '../../../styles';
import { GiveUpButton } from '../../buttons';
import { QuestionHeader } from '../../texts';
import styles from '../styles';
import { WritingQInitialState, WritingQProps } from './definitions';
import { WritingQReducer } from './reducer';

const WritingQuestion: React.FC<WritingQProps> = ({
  onSubmit = (isCorrect: boolean) => isCorrect,
  answer,
  instructionText,
  question,
  giveUpButtonContainerStyle,
  giveUpButtonStyle,
  giveUpLabelStyle,
}) => {
  const [state, dispatch] = useReducer(WritingQReducer, WritingQInitialState);

  const handleResponse = (response: string) => {
    if (response == answer) {
      dispatch({ type: 'correctAnswer', response });
      onSubmit(true);
    } else {
      dispatch({ type: 'handleResponse', response });
    }
  };

  const giveUp = () => {
    dispatch({ type: 'giveUp', payload: { answer: answer } });
    onSubmit(false);
  };

  return (
    <View style={{ width: Sizing.sw }}>
      <QuestionHeader instructions={instructionText} question={question} />
      <View style={{ flex: 3, justifyContent: 'center' }}>
        <View style={styles.underline}>
          <TextInput
            onChangeText={(response) => handleResponse(response)}
            value={state.inputValue.toString()}
            editable={state.inputEnabled}
            autoCorrect={false}
            autoCapitalize="sentences"
            placeholder="start typing here..."
            style={{ width: Sizing.sw / 2, textAlign: 'center' }}
          />
        </View>
      </View>
      <GiveUpButton
        onGiveUp={giveUp}
        labelStyle={giveUpLabelStyle}
        buttonStyle={giveUpButtonStyle}
        buttonContainerStyle={giveUpButtonContainerStyle}
        enabled={state.inputEnabled}
      />
    </View>
  );
};

WritingQuestion.defaultProps = {
  question: 'Insert question here?',
  answer: 'answer',
};

export default WritingQuestion;
