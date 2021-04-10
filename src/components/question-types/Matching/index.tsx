import React, { useEffect, useReducer } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Sizing } from '../../../styles';
import { ContinueButton } from '../../buttons';
import { QuestionHeader } from '../../texts';
import type { MatchingCard, MatchingQProps } from './definitions';
import PlayingCard from './PlayingCard';
import { matchingReducer } from './setup';

const MatchingQuestion: React.FC<MatchingQProps> = (props) => {
  const [state, dispatch] = useReducer(matchingReducer, {
    deck: [],
    continueEnabled: false,
  });

  const resetGame = () =>
    dispatch({
      type: 'reset',
      payload: { questionAnswers: props.questionAnswerPairs },
    });

  //useeffect to check if game is completed, matching cannot send a false result
  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    state.continueEnabled && props.onSubmit(true);
  }, [state.continueEnabled]);

  const selectCard = (selection: MatchingCard) =>
    dispatch({ type: 'selectCard', payload: { selection } });

  const onContinue = () => {
    props.onContinue();
    resetGame();
  };

  return (
    <View style={[styles.container, props.customContainerStyle]}>
      <QuestionHeader
        instructions={
          props.instructionText || 'Please insert instructions here'
        }
        instructionsTextStyle={props.instructionsTextStyle}
        questionTextStyle={props.questionTextStyle}
        headerContainerStyle={props.headerContainerStyle}
      />
      <View style={[{ flex: 4 }, props.cardListContainerStyle]}>
        <FlatList
          data={state.deck}
          numColumns={2}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayingCard
              item={item}
              selectCard={selectCard}
              correctCardColor={props.correctCardColor}
              incorrectCardColor={props.incorrectCardColor}
              cardStyle={props.cardStyle}
              inactiveCardColor={props.inactiveCardColor}
              activeCardColor={props.activeCardColor}
              cardTextStyle={props.cardTextStyle}
            />
          )}
          style={[props.cardListStyle]}
          scrollEnabled={props.listScrollEnabled || false}
        />
      </View>
      <ContinueButton
        onContinue={onContinue}
        labelStyle={props.continueLabelStyle}
        buttonStyle={props.continueButtonStyle}
        enabled={state.continueEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Sizing.sw
  },
});

export default MatchingQuestion;
