import React, { useReducer } from 'react';
import { View } from 'react-native';
import { State } from 'react-native-gesture-handler';
import { DraggableButton, PrimaryButton } from '../../buttons';
import { QuestionHeader } from '../../texts';
import timedAnimation from '../../../services/timedAnimation';
import {
  MultipleChoiceQInitialState,
  MultipleChoiceQProps,
} from './definitions';
import { MultipleChoiceQReducer } from './reducer';
import { Sizing } from '../../../styles';
import styles from '../styles';

const MultipleChoiceQuestion: React.FC<MultipleChoiceQProps> = ({
  answer,
  allChoices,
  onSubmit = (isCorrect: boolean) => isCorrect,
  customContainerStyle,
  instructionText,
  question,
  checkButtonContainerStyle,
  checkLabelStyle,
  checkButtonStyle,
}) => {
  const [state, dispatch] = useReducer(
    MultipleChoiceQReducer,
    MultipleChoiceQInitialState
  );

  const setLandingZoneCoordinates = (layout: any) => {
    dispatch({ type: 'setCoordinates', payload: { layout } });
  };

  const prepareForLanding = (occupier: any) =>
    dispatch({ type: 'prepareForLanding', payload: { occupier } });

  const clearOut = () => dispatch({ type: 'clearOut' });

  const selectChoice = (selectedChoice: number) => {
    selectedChoice == -1
      ? dispatch({ type: 'disableCheck' })
      : dispatch({ type: 'selectChoice', payload: { selectedChoice } });
  };

  const submit = () => {
    dispatch({
      type: 'checkPlease',
      payload: { answer: answer, allChoices: allChoices },
    });
    onSubmit(allChoices[state.selectedChoice] == answer);
  };

  const returnHandlerHome = (_translate: any, index: number) => {
    timedAnimation(_translate, 200, { x: 0, y: 0 }).start(() => {
      _translate.setOffset({ x: 0, y: 0 });
      _translate.setValue({ x: 0, y: 0 });
      state.occupier == index && clearOut();
    });
  };

  const sendHandlerToPlace = (_layout: any, _translate: any, index: number) => {
    timedAnimation(_translate, 200, {
      x: 0,
      y: -state.layout.y - _layout.y + 50,
    }).start(() => {
      _translate.setOffset({
        x: 0,
        y: -state.layout.y - _layout.y + 50,
      });
      _translate.setValue({ x: 0, y: 0 });
      prepareForLanding(index);
      selectChoice(index);
    });
  };

  const onHandlerStateChange = (
    _layout: any,
    _translate: any,
    index: number
  ) => (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      _translate.flattenOffset();
      state.isFull
        ? returnHandlerHome(_translate, index)
        : sendHandlerToPlace(_layout, _translate, index);
    }
  };

  return (
    <View style={[{ width: Sizing.sw }, customContainerStyle]}>
      <QuestionHeader instructions={instructionText} question={question} />
      <View
        onLayout={(event) => {
          setLandingZoneCoordinates({
            x: event.nativeEvent.layout.x,
            y: event.nativeEvent.layout.y,
          });
        }}
        style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          flex: 2,
        }}
      >
        <View
          style={{
            ...styles.underline,
            width: Sizing.normalize(answer.length * 20),
          }}
        ></View>
      </View>
      <View style={{ flex: 3 }}>
        {allChoices.map((name, index) => (
          <DraggableButton
            key={index}
            name={name.toString()}
            onHandlerStateChange={onHandlerStateChange}
            index={index}
            landingZoneOccupier={state.occupier}
            clearOut={clearOut}
            choices={allChoices}
            enabled={state.choicesEnabled}
          />
        ))}
      </View>
      <PrimaryButton
        label="Check"
        onPress={submit}
        labelStyle={checkLabelStyle}
        buttonStyle={checkButtonStyle}
        buttonContainerStyle={checkButtonContainerStyle}
        enabled={state.checkEnabled}
      />
      {/*       <ContinueButton
        onContinue={onContinue}
        labelStyle={continueLabelStyle}
        buttonStyle={continueButtonStyle}
        buttonContainerStyle={continueButtonContainerStyle}
        enabled={state.continueEnabled}
      /> */}
    </View>
  );
};

export default MultipleChoiceQuestion;
