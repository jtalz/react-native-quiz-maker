import React, { useReducer } from 'react';
import { View, TextInput } from 'react-native';
import { ContinueButton, GiveUpButton } from 'src/components/buttons';
import { QuestionHeader } from 'src/components/texts';
import { WritingQInitialState, WritingQProps } from './definitions';
import { WritingQReducer } from './reducer';

const WritingQuestion: React.FC<WritingQProps> = (props) => {
  const [state, dispatch] = useReducer(
    WritingQReducer,
    WritingQInitialState
  );

  const handleResponse = (response: string | number) => {
    if (response == props.answer) {
      dispatch({ type: 'correctAnswer', response });
      props.onSubmit(true);
    } else {
      dispatch({ type: 'handleResponse', response });
    }
  };

  const giveUp = () => {
    dispatch({ type: 'giveUp' });
    props.onSubmit(false);
  };

  return (
    <View>
      <QuestionHeader
        instructions={props.instructionText}
        question={props.question}
      />
      <TextInput
        onChangeText={(response) => handleResponse(response)}
        value={state.inputValue.toString()}
        editable={state.inputEnabled}
        autoCorrect={false}
        autoCapitalize="sentences"
        placeholder=""
      />
      <GiveUpButton
        onGiveUp={giveUp}
        labelStyle={props.giveUpLabelStyle}
        buttonStyle={props.giveUpButtonStyle}
        buttonContainerStyle={props.giveUpButtonContainerStyle}
      />
      <ContinueButton
        onContinue={props.onContinue}
        labelStyle={props.continueLabelStyle}
        buttonStyle={props.continueButtonStyle}
        buttonContainerStyle={props.continueButtonContainerStyle}
      />
    </View>
  );
};

WritingQuestion.defaultProps = {
  question: 'Insert question here?',
  answer: 'answer',
};

export default WritingQuestion;
