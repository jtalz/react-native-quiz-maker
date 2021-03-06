import React, { useEffect, useReducer } from 'react';
import { FlatList, View } from 'react-native';
import { QuestionHeader } from '../../texts';
import type { MatchingCard, MatchingQProps } from './definitions';
import PlayingCard from './PlayingCard';
import { matchingReducer } from './setup';
import { default as styles } from './styles';

const MatchingQuestion: React.FC<MatchingQProps> = React.memo(
  ({
    questionAnswerPairs,

    onSubmit = (isCorrect: boolean) => isCorrect,

    customContainerStyle,

    instructionText,

    instructionsTextStyle,

    questionTextStyle,

    headerContainerStyle,

    cardListContainerStyle,

    correctCardColor,

    incorrectCardColor,

    inactiveCardColor,

    cardStyle,

    activeCardColor,

    cardTextStyle,

    cardListStyle,

    listScrollEnabled = false,
  }) => {
    const [state, dispatch] = useReducer(matchingReducer, {
      deck: [],
      continueEnabled: false,
    });

    useEffect(() => {
      dispatch({ type: 'reset', payload: { questionAnswerPairs } });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const selectCard = (selection: MatchingCard) =>
      dispatch({
        type: 'selectCard',
        payload: { selection, submit: onSubmit },
      });

    return (
      <View style={[styles.container, customContainerStyle]}>
        <QuestionHeader
          instructions={instructionText || 'Please insert instructions here'}
          instructionsTextStyle={instructionsTextStyle}
          questionTextStyle={questionTextStyle}
          headerContainerStyle={headerContainerStyle}
        />
        <View style={[styles.cardListContainer, cardListContainerStyle]}>
          <FlatList
            data={state.deck}
            numColumns={2}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <PlayingCard
                item={item}
                selectCard={selectCard}
                correctCardColor={correctCardColor}
                incorrectCardColor={incorrectCardColor}
                cardStyle={cardStyle}
                inactiveCardColor={inactiveCardColor}
                activeCardColor={activeCardColor}
                cardTextStyle={cardTextStyle}
              />
            )}
            style={[cardListStyle]}
            scrollEnabled={listScrollEnabled}
          />
        </View>
      </View>
    );
  }
);

export default MatchingQuestion;
