import { StyleSheet } from 'react-native';
import { Sizing, Typography } from '../../../styles';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Sizing.sw,
  },
  cardListContainer: {
    flex: 4,
  },
  PlayingCard: {
    height: Sizing.sh / 11,
    width: Sizing.sw / 2.7,
    borderWidth: 3,
    borderColor: 'rgba(250,250,250,.6)',
    borderRadius: Sizing.sh / 18,
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
  playingCardAnimatedContainer: {
    width: '100%',
    height: '100%',
    borderRadius: Sizing.sh / 18,
    justifyContent: 'center',
  },
});
