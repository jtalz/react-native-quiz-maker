import { Platform, PixelRatio } from 'react-native';
import {Dimensions} from 'react-native';
// based on iphone 5s's scale
const scale = Dimensions.get('screen').width / 320;

export const normalize = (size: number) => {
  const newSize = size * scale 
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}

export const sw = Dimensions.get('screen').width