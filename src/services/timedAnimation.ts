import {Animated} from 'react-native';

const timedAnimation = (elem: Animated.Value | Animated.ValueXY, time: number, toValue: number | any) => {
    return Animated.timing(elem, {
        toValue,
        duration: time,
        useNativeDriver: true,
    });
};

export default timedAnimation;