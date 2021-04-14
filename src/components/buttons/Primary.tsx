import * as React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Sizing, Typography } from '../../styles';

interface Props {
  label: string;

  onPress: () => void;

  enabled?: boolean;

  buttonStyle?: StyleProp<ViewStyle>;

  buttonContainerStyle?: StyleProp<ViewStyle>;

  labelStyle?: StyleProp<TextStyle>;
}

const PrimaryButton: React.FC<Props> = (props) => (
  <SafeAreaView style={[styles.buttonContainer, props.buttonContainerStyle]}>
    <TouchableOpacity
      onPress={() => props.onPress()}
      disabled={!props.enabled}
      style={[styles.button, { backgroundColor: '#f0de89' }, props.buttonStyle]}
    >
      <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>
    </TouchableOpacity>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: Dimensions.get('screen').width / 3,
    height: Dimensions.get('screen').width / 10,
    justifyContent: 'center',
    borderRadius: 10,
  },
  label: {
    color: 'black',
    textAlign: 'center',
    fontFamily: Typography.light,
    fontSize: Sizing.normalize(12),
  },
});

export default PrimaryButton;
