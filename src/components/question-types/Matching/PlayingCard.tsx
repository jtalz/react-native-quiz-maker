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
import { Sizing, Typography } from '../../../styles';
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
  cardTextStyle?: StyleProp<TextStyle>;
}

const PlayingCard: React.FC<Props> = ({
  item,
  selectCard,
  cardStyle = {},
  correctCardColor = '#cff089',
  incorrectCardColor = '#f0899c',
  inactiveCardColor = '#5cbdea',
  activeCardColor = '#5ea4e7',
  cardTextStyle,
}) => {
  const { selected, visible, name, justSubmitted } = item;

  var disabled = !visible;

  const justSubmittedAndIsCorrect = justSubmitted && !visible;

  const justSubmittedAndIsIncorrect = justSubmitted && visible;

  const cardOpacity = useState(
    appropriateCardOpacity(visible, justSubmittedAndIsCorrect)
  )[0];

  const animatedValue = new Animated.Value(90);

  const fadeCardOut = () => timedAnimation(cardOpacity, 1000, 0).start();

  const interpolateToWhite = () => {
    Animated.timing(animatedValue, {
      toValue: 255,
      duration: 700,
      useNativeDriver: false,
    }).start();
  };

  const interpolateColor = animatedValue.interpolate({
    inputRange: [0, 250],
    outputRange: [incorrectCardColor, '#5cbdea'],
  });

  const bgColor = { backgroundColor: appropriateCardColor() };

  function appropriateCardColor() {
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
    height: Dimensions.get('screen').height / 11,
    width: Dimensions.get('screen').width / 2.7,
    borderWidth: 3,
    borderColor: 'rgba(250,250,250,.6)',
    borderRadius: Dimensions.get('screen').height / 18,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: Sizing.normalize(12),
    fontFamily: Typography.light,
    paddingHorizontal: 5,
    color: 'white',
  },
});

export default PlayingCard;
