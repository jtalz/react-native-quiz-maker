import React, { useReducer } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { State } from 'react-native-gesture-handler';
import { ContinueButton, DraggableButton, PrimaryButton } from '../../buttons';
import { QuestionHeader } from '../../texts';
import timedAnimation from '../../../services/timedAnimation';
import { MultipleChoiceQInitialState, MultipleChoiceQProps } from './definitions';
import { MultipleChoiceQReducer } from './reducer';
import { Sizing } from '../../../styles';

const MultipleChoiceQuestion: React.FC<MultipleChoiceQProps> = (props) => {
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
      payload: { answer: props.answer, allChoices: props.allChoices },
    });
    props.onSubmit(props.allChoices[state.selectedChoice] == props.answer);
  };

  const returnHandlerHome = (_translate: any, index: number) => {
    console.log('returning handler home')
    timedAnimation(_translate, 200, { x: 0, y: 0 }).start(() => {
      _translate.setOffset({ x: 0, y: 0 });
      _translate.setValue({ x: 0, y: 0 });
      state.occupier == index && clearOut();
    });
  };

  const sendHandlerToPlace = (_layout: any, _translate: any, index: number) => {
    console.log('seending handler to place')
    timedAnimation(_translate, 200, {
      x: state.layout.x - _layout.x + Sizing.normalize(props.answer.length),
      y: state.layout.y - _layout.y + Sizing.normalize(10),
    }).start(() => {
      _translate.setOffset({
        x: state.layout.x - _layout.x + Sizing.normalize(props.answer.length),
        y: state.layout.y - _layout.y + Sizing.normalize(10),
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
    <View style={[props.customContainerStyle]}>
      <QuestionHeader
        instructions={props.instructionText}
        question={props.question}
      />
      <View
        onLayout={(event) => {
          setLandingZoneCoordinates({
            x: event.nativeEvent.layout.x,
            y: event.nativeEvent.layout.y,
          });
        }}
        style={{justifyContent: 'center', alignItems: 'center'}}
      >
        <View style={{...styles.underline, width: Sizing.normalize(props.answer.length*20) }}></View>
      </View>
      {props.allChoices.map((name, index) => (
        <DraggableButton
          key={index}
          name={name.toString()}
          onHandlerStateChange={onHandlerStateChange}
          index={index}
          landingZoneOccupier={state.occupier}
          clearOut={clearOut}
          choices={props.allChoices}
          enabled={state.choicesEnabled}
        />
      ))}
      <PrimaryButton
        label="Check"
        onPress={submit}
        labelStyle={props.checkLabelStyle}
        buttonStyle={props.checkButtonStyle}
        buttonContainerStyle={props.checkButtonContainerStyle}
        enabled={state.checkEnabled}
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

const styles = StyleSheet.create({
  underline: {
    height: 45,
    borderBottomColor: 'black',
    borderWidth: 1,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MultipleChoiceQuestion;
