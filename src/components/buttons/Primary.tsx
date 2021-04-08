import * as React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableHighlight,
  ViewStyle,
} from 'react-native';

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
    <TouchableHighlight
      onPress={() => props.onPress()}
      disabled={!props.enabled}
      style={[styles.button, props.buttonStyle]}
    >
      <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>
    </TouchableHighlight>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    width: Dimensions.get('screen').width / 3,
    height: Dimensions.get('screen').width / 10,
    justifyContent: 'center',
    borderRadius: 10,
  },
  label: {
    color: 'white',
    textAlign: 'center',
  },
});

export default PrimaryButton;
