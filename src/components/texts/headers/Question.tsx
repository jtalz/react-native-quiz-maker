import React from 'react';
import { Text, View } from 'react-native';

interface Props {
    instructions?: string;
    question?: string;
}

const QuestionHeader: React.FC<Props> = (props) => {
    return (
        <View>
            <Text>{props.instructions}</Text>
            <Text>{props.question}</Text>
        </View>
    )
}

export default QuestionHeader;