import React from 'react'
import type { StyleProp, TextStyle, ViewStyle } from 'react-native'
import PrimaryButton from './Primary'

interface Props {
    onGiveUp: ()=>void,
    
    labelStyle?: StyleProp<TextStyle>;
    
    buttonStyle?: StyleProp<ViewStyle>;

    buttonContainerStyle?: StyleProp<ViewStyle>;

    enabled?: boolean;
}

const GiveUpButton: React.FC<Props> = (props) => {

    return (
        <PrimaryButton
            label="Give Up"
            labelStyle={props.labelStyle}
            buttonStyle={props.buttonStyle}
            buttonContainerStyle={props.buttonContainerStyle}
            enabled={props.enabled}
            onPress={props.onGiveUp}
        />
    )
}

export default GiveUpButton