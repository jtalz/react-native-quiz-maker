import { Animated } from 'react-native';

const springAnimation = (
  elem: Animated.Value | Animated.ValueXY,
  toValue: number | any
) => {
  return Animated.spring(elem, {
    toValue,
    useNativeDriver: true,
  });
};

export default springAnimation;
