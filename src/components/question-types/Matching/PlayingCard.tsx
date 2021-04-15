import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, Animated } from 'react-native';
import { default as styles } from './styles';
import { timedAnimation } from '../../../services';
import type { MatchingCardProps } from './definitions';

const fadeOut = (opacity: Animated.Value) =>
  timedAnimation(opacity, 1000, 0).start();

const resetCardColor = (val: Animated.Value) =>
  Animated.timing(val, {
    toValue: 250,
    duration: 1000,
    useNativeDriver: false,
  }).start();

const PlayingCard: React.FC<MatchingCardProps> = ({
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

  const justSubmittedAndIsCorrect = justSubmitted && !visible;

  const justSubmittedAndIsIncorrect = justSubmitted && visible;

  const cardOpacity = useState(
    visible ? new Animated.Value(1) : new Animated.Value(0)
  )[0];

  const interpolateValue = new Animated.Value(0);

  const animatedColor = interpolateValue.interpolate({
    inputRange: [0, 250],
    outputRange: [incorrectCardColor, inactiveCardColor],
  });

  useEffect(() => {
    if (justSubmittedAndIsCorrect) fadeOut(cardOpacity);
    else if (justSubmittedAndIsIncorrect) resetCardColor(interpolateValue);
  });

  const getBgColor = () => {
    if (justSubmittedAndIsCorrect) {
      return correctCardColor;
    } else if (justSubmittedAndIsIncorrect) {
      return animatedColor;
    } else if (selected) {
      return activeCardColor;
    } else {
      return inactiveCardColor;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.PlayingCard, cardStyle]}
      disabled={!visible}
      onPress={() => selectCard(item)}
    >
      <Animated.View
        style={[
          styles.playingCardAnimatedContainer,
          { opacity: cardOpacity, backgroundColor: getBgColor() },
        ]}
      >
        <Text style={[styles.text, cardTextStyle]}>{name}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default PlayingCard;
