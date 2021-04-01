import { PrimaryButton } from 'lib/typescript/components/buttons';
import React, { useReducer } from 'react';
import { View, TextStyle, ViewStyle, StyleProp, Text } from 'react-native';
import { ContinueButton } from 'src/components/buttons';
import { QuestionHeader } from 'src/components/texts';

interface MultipleChoiceQuestionState {
    selectedChoice: number;
    questionStatus: string;
    choicesEnabled: boolean;
    checkEnabled: boolean;
}

const MultipleChoiceQuestionInitialState: MultipleChoiceQuestionState = {
    selectedChoice: -1,
    questionStatus: "unanswered",
    choicesEnabled: true,
    checkEnabled: false
}

type Actions =
    | { type: 'selectChoice'; payload: { selectedChoice: number } }
    | { type: 'checkPlease'; payload: { answer: string | number; allChoices: Array<string | number> } }
    | { type: 'disableCheck' }
    | { type: 'reset' }

type State = MultipleChoiceQuestionState

const MultipleChoiceReducer = (state: State, action: Actions) => {
    if (action.type == 'selectChoice') {
        return { ...state, selectedChoice: action.payload.selectedChoice, checkEnabled: true }
    } else if (action.type == 'checkPlease') {
        return action.payload.allChoices[state.selectedChoice] == action.payload.answer ?
            { ...state, questionStatus: 'correct', choicesEnabled: false } :
            { ...state, questionStatus: 'incorrect', choicesEnabled: false }
    } else if (action.type == 'disableCheck') {
        return { ...state, checkEnabled: false }
    } else if (action.type == 'reset') {
        return { ...MultipleChoiceQuestionInitialState }
    } else {
        return state
    }
}

interface Props {
    index: number;
    question: string;
    answer: string | number;
    allChoices: Array<string | number>;
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

const MultipleChoiceQuestion: React.FC<Props> = (props) => {

    const [state, dispatch] = useReducer(MultipleChoiceReducer, MultipleChoiceQuestionInitialState)

    const checkPlease = () => {
        dispatch({ type: 'checkPlease', payload: { answer: props.answer, allChoices: props.allChoices } });
        props.onSubmit(props.allChoices[state.selectedChoice] == props.answer)
    }

    return (
        <View>
            <QuestionHeader instructions={props.instructionText} question={props.question} />
            <Text>{state.checkEnabled}</Text>

            <PrimaryButton label='Check' onPress={checkPlease} />
            <ContinueButton
                dispatch={dispatch}
                onContinue={props.onContinue}
                labelStyle={props.giveUpLabelStyle}
                btnStyle={props.giveUpBtnStyle}
            />
        </View>
    )
}

export default MultipleChoiceQuestion;