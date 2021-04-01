import * as React from 'react';
import {
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableHighlight,
    View,
    ViewStyle
} from 'react-native';

interface BtnProps {
    label: string;
    buttonStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    onPress: () => void;
}

const PrimaryButton: React.FC<BtnProps> = (props) => (
    <TouchableHighlight onPress={() => props.onPress()}>
        <View style={[styles.button, props.buttonStyle]}>
            <Text style={[styles.label, props.labelStyle]}>
                {props.label}
            </Text>
        </View>
    </TouchableHighlight>
);

interface Style {
    button: ViewStyle;
    label: TextStyle;
}

const styles = StyleSheet.create<Style>({
    button: {

    },
    label: {

    }
})

export default PrimaryButton;