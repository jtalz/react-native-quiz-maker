import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  Text,
  Animated,
  StyleProp,
  ViewStyle,
  StyleSheet,
  Dimensions,
  TextStyle,
} from 'react-native';
import { timedAnimation } from '../../../services';
import type { MatchingCard } from './definitions';

const appropriateCardOpacity = (
  visible: boolean,
  justSubmittedAndIsCorrect: boolean
) => {
  if (justSubmittedAndIsCorrect) {
    return new Animated.Value(1);
  } else if (!visible) {
    return new Animated.Value(0);
  } else {
    return new Animated.Value(1);
  }
};

interface Props {
  item: MatchingCard;
  selectCard: (selection: MatchingCard) => void;
  correctCardColor?: string;
  incorrectCardColor?: string;
  inactiveCardColor?: string;
  activeCardColor?: string;
  cardStyle?: StyleProp<ViewStyle>;
  cardTextStyle?: StyleProp<TextStyle>
}

const PlayingCard: React.FC<Props> = ({
  item,
  selectCard,
  cardStyle = {},
  correctCardColor = '#73D413',
  incorrectCardColor = '#F33232',
  inactiveCardColor = 'white',
  activeCardColor = '#4294DB',
  cardTextStyle
}) => {
  const { selected, visible, name, justSubmitted } = item;

  var disabled = !visible;

  const justSubmittedAndIsCorrect = justSubmitted && !visible;

  const justSubmittedAndIsIncorrect = justSubmitted && visible;

  const cardOpacity = useState(
    appropriateCardOpacity(visible, justSubmittedAndIsCorrect)
  )[0];

  const animatedValue = new Animated.Value(90);

  const fadeCardOut = () => timedAnimation(cardOpacity, 800, 0).start();

  const interpolateToWhite = () => {
    Animated.timing(animatedValue, {
      toValue: 255,
      duration: 700,
      useNativeDriver: false,
    }).start();
  };

  const interpolateColor = animatedValue.interpolate({
    inputRange: [0, 250],
    outputRange: [incorrectCardColor, 'rgb(250, 250, 250)'],
  });

  const bgColor = {
    backgroundColor: appropriateCardColor(
      selected,
      justSubmittedAndIsCorrect,
      justSubmittedAndIsIncorrect
    ),
  };

  function appropriateCardColor(
    selected: boolean,
    justSubmittedAndIsCorrect: boolean,
    justSubmittedAndIsIncorrect: boolean
  ) {
    if (justSubmittedAndIsCorrect) {
      return correctCardColor;
    } else if (justSubmittedAndIsIncorrect) {
      return interpolateColor;
    } else if (selected) {
      return activeCardColor;
    } else {
      return inactiveCardColor;
    }
  }

  useEffect(() => {
    if (justSubmittedAndIsCorrect) {
      fadeCardOut();
    } else if (justSubmittedAndIsIncorrect) {
      interpolateToWhite();
    }
  });

  return (
    <TouchableOpacity
      style={[styles.PlayingCard, cardStyle]}
      disabled={disabled}
      onPress={() => selectCard(item)}
    >
      <Animated.View
        style={[
          {
            opacity: cardOpacity,
            width: '100%',
            height: '100%',
            borderRadius: Dimensions.get('screen').height / 18,
            justifyContent: 'center',
          },
          bgColor,
        ]}
      >
        <Text style={[styles.text, cardTextStyle]}>{name}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  PlayingCard: {
    height: Dimensions.get('screen').height / 12,
    width: Dimensions.get('screen').width / 3.4,
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: Dimensions.get('screen').height / 18,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    alignSelf: "center",
  },
});

export default PlayingCard;
