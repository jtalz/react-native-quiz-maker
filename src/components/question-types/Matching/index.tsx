import React, { useEffect, useReducer } from 'react';
import { FlatList, StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { ContinueButton } from '../../buttons';
import { QuestionHeader } from '../../texts';
import PlayingCard from './PlayingCard';
import {
  setup,
  matchingReducer,
  MatchingCard,
  QuestionAnswerPair,
} from './setup';

interface Props {
  questionAnswerPairs: Array<QuestionAnswerPair>;
  onSubmit: (isCorrect: boolean) => void;
  onContinue: () => void;
  instructionText?: string;
  instructionStyle?: StyleProp<TextStyle>;
  correctCardColor?: string;
  incorrectCardColor?: string;
  cardStyle?: StyleProp<ViewStyle>;
  continueLabelStyle?: StyleProp<TextStyle>;
  continueBtnStyle?: StyleProp<ViewStyle>;
}

const MatchingQuestion: React.FC<Props> = (props) => {
  const [state, dispatch] = useReducer(matchingReducer, {
    deck: setup(props.questionAnswerPairs),
    continueEnabled: false,
  });

  //useeffect to check if game is completed, matching cannot send a false result
  useEffect(() => {
    state.continueEnabled && props.onSubmit(true);
  }, [state.continueEnabled]);

  const selectCard = (selection: MatchingCard) =>
    dispatch({ type: 'selectCard', payload: { selection } });

  const onContinue = () => {
    props.onContinue();
    dispatch({
      type: 'reset',
      payload: { questionAnswers: props.questionAnswerPairs },
    });
  };

  return (
    <View>
      <QuestionHeader instructions={props.instructionText} />
      <FlatList
        data={state.deck}
        numColumns={2}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View>
            <PlayingCard
              item={item}
              selectCard={selectCard}
              correctCardColor={props.correctCardColor}
              incorrectCardColor={props.incorrectCardColor}
              cardStyle={props.cardStyle}
            />
          </View>
        )}
      />
      <ContinueButton
        dispatch={dispatch}
        onContinue={onContinue}
        labelStyle={props.continueLabelStyle}
        btnStyle={props.continueBtnStyle}
      />
    </View>
  );
};

export default MatchingQuestion;
