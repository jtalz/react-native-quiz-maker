import React, { useReducer } from 'react'
import { View, ViewStyle, StyleProp, TextStyle, TextInput } from 'react-native';
import { ContinueButton, GiveUpButton } from 'src/components/buttons';
import { QuestionHeader } from 'src/components/texts';

interface WritingQuestionState {
    inputValue: string | number;
    grade: string;
    inputEnabled: boolean;
    nextBtnEnabled: boolean;
}

type Actions =
    | { type: 'handleResponse'; response: string | number }
    | { type: 'correctAnswer'; response: string | number }
    | { type: 'giveUp' }
    | { type: 'reset' }

type State = WritingQuestionState

const WritingQuestionReducer = (state: State, action: Actions) => {
    switch (action.type) {
        case 'handleResponse':
            return { ...state, inputValue: action.response };
        case 'correctAnswer':
            return { ...state, inputValue: action.response, inputEnabled: false, grade: 'correct', nextBtnEnabled: true };
        case 'giveUp':
            return { ...state, inputEnabled: false, grade: 'incorrect', nextBtnEnabled: true };
        case 'reset':
            return { ...WritingQuestionInitialState }
        default:
            return state
    }
}

const WritingQuestionInitialState: WritingQuestionState = {
    grade: "unanswered",
    inputEnabled: true,
    nextBtnEnabled: false,
    inputValue: "",
}

interface Props {
    index: number;
    question: string;
    answer: string | number;
    isActive: boolean;
    onSubmit: (isCorrect: boolean) => void;
    onContinue: () => void;
    instructionText?: string;
    instructionStyle?: StyleProp<TextStyle>;
    underlineLength?: number;
    underlineStyle?: number;
    giveUpLabelStyle?: StyleProp<TextStyle>;
    giveUpBtnStyle?: StyleProp<ViewStyle>;
    nextLabelStyle?: StyleProp<TextStyle>;
    nextBtnStyle?: StyleProp<ViewStyle>;
}

const WritingQuestion: React.FC<Props> = (props) => {

    const [state, dispatch] = useReducer(WritingQuestionReducer, WritingQuestionInitialState)

    const handleResponse = (response: string | number) => {
        if (response == props.answer) {
            dispatch({ type: 'correctAnswer', response })
            props.onSubmit(true)
        } else {
            dispatch({ type: 'handleResponse', response })
        }
    }

    return (
        <View>
            <QuestionHeader instructions={props.instructionText} question={props.question} />
            <TextInput
                onChangeText={(response) => handleResponse(response)}
                value={state.inputValue.toString()}
                editable={state.inputEnabled}
                autoCorrect={false}
                autoCapitalize='sentences'
                placeholder=''
            />
            <GiveUpButton
                dispatch={dispatch}
                onSubmit={props.onSubmit}
                labelStyle={props.giveUpLabelStyle}
                btnStyle={props.giveUpBtnStyle}
            />
            <ContinueButton
                dispatch={dispatch}
                onContinue={props.onContinue}
                labelStyle={props.giveUpLabelStyle}
                btnStyle={props.giveUpBtnStyle}
            />
        </View>
    )
}

WritingQuestion.defaultProps = {
    question: 'Insert question here?',
    answer: 'answer'
}

export default WritingQuestion;