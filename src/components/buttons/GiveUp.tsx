import React from 'react'
import type { StyleProp, TextStyle, ViewStyle } from 'react-native'
import PrimaryButton from './Primary'

interface Props {
    dispatch: any,
    onSubmit: any,
    labelStyle?: StyleProp<TextStyle>;
    btnStyle?: StyleProp<ViewStyle>;
}

const GiveUpButton: React.FC<Props> = (props) => {

    const giveUp = () => {
        props.dispatch({ type: 'giveUp' })
        props.onSubmit(false)
    }

    return (
        <PrimaryButton
            label="Give Up"
            labelStyle={props.labelStyle}
            buttonStyle={props.btnStyle}
            onPress={giveUp}
        />
    )
}

export default GiveUpButton