import React from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import PrimaryButton from './Primary';

interface Props {
  onContinue: () => void;

  labelStyle?: StyleProp<TextStyle>;

  buttonStyle?: StyleProp<ViewStyle>;

  buttonContainerStyle?: StyleProp<ViewStyle>;

  enabled?: boolean;
}

const ContinueButton: React.FC<Props> = (props) => {
  return (
    <PrimaryButton
      label="Continue"
      labelStyle={props.labelStyle}
      buttonStyle={props.buttonStyle}
      buttonContainerStyle={props.buttonContainerStyle}
      onPress={props.onContinue}
      enabled={props.enabled}
    />
  );
};

export default ContinueButton;
