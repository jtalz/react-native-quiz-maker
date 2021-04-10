import React, { useReducer } from 'react';
import { View, TextInput } from 'react-native';
import { Sizing } from '../../../styles';
import { ContinueButton, GiveUpButton } from '../../buttons';
import { QuestionHeader } from '../../texts';
import styles from '../styles';
import { WritingQInitialState, WritingQProps } from './definitions';
import { WritingQReducer } from './reducer';

const WritingQuestion: React.FC<WritingQProps> = (props) => {
  const [state, dispatch] = useReducer(WritingQReducer, WritingQInitialState);

  const handleResponse = (response: string) => {
    if (response == props.answer) {
      dispatch({ type: 'correctAnswer', response });
      props.onSubmit(true);
    } else {
      dispatch({ type: 'handleResponse', response });
    }
  };

  const giveUp = () => {
    dispatch({ type: 'giveUp', payload: { answer: props.answer } });
    props.onSubmit(false);
  };

  return (
    <View style={{width: Sizing.sw}}>
      <QuestionHeader
        instructions={props.instructionText}
        question={props.question}
      />
      <View style={{flex: 3, justifyContent: 'center'}}>
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
        labelStyle={props.giveUpLabelStyle}
        buttonStyle={props.giveUpButtonStyle}
        buttonContainerStyle={props.giveUpButtonContainerStyle}
        enabled={state.inputEnabled}
      />
      <ContinueButton
        onContinue={props.onContinue}
        labelStyle={props.continueLabelStyle}
        buttonStyle={props.continueButtonStyle}
        buttonContainerStyle={props.continueButtonContainerStyle}
        enabled={state.continueEnabled}
      />
    </View>
  );
};

WritingQuestion.defaultProps = {
  question: 'Insert question here?',
  answer: 'answer',
};

export default WritingQuestion;
