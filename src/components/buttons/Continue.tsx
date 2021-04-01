import React from 'react'
import type { StyleProp, TextStyle, ViewStyle } from 'react-native'
import PrimaryButton from './Primary'

interface Props {
    dispatch: any,
    onContinue: any,
    labelStyle?: StyleProp<TextStyle>;
    btnStyle?: StyleProp<ViewStyle>;
}

const ContinueButton: React.FC<Props> = (props) => {

    const onContinue = () => {
        props.onContinue()
        props.dispatch({ type: 'reset' })
    }

    return (
        <PrimaryButton
            label="Continue"
            labelStyle={props.labelStyle}
            buttonStyle={props.btnStyle}
            onPress={onContinue}
        />
    )
}

export default ContinueButton