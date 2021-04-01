import React, { useReducer } from 'react';
import { View, TextStyle, ViewStyle, StyleProp, Text } from 'react-native';
import { GiveUpButton, PrimaryButton } from 'src/components/buttons';
import { QuestionHeader } from 'src/components/texts';

interface MultipleChoiceQuestionState {
    selectedChoice: number | null;
    questionStatus: string;
    choicesEnabled: boolean;
    checkEnabled: boolean;
}

const MultipleChoiceQuestionInitialState: MultipleChoiceQuestionState = {
    selectedChoice: null,
    questionStatus: "unanswered",
    choicesEnabled: true,
    checkEnabled: false
}

type Actions = 
    | { type: 'selectChoice'; selectedChoice: number }
    | { type: 'reset'}

type State = MultipleChoiceQuestionState

const MultipleChoiceReducer = (state: State, action: Actions) => {
    if (action.type == 'selectChoice'){
        return { ...state, selectedChoice : action.selectedChoice, checkEnabled: true }
    }else{
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

    const onContinue = () => {
        props.onContinue()
        dispatch({ type: 'reset' })
    }

    return (
        <View>
            <QuestionHeader instructions={props.instructionText} question={props.question} />
            <Text>{state.checkEnabled}</Text>
            <GiveUpButton
                dispatch={dispatch}
                onSubmit={props.onSubmit}
                labelStyle={props.giveUpLabelStyle}
                btnStyle={props.giveUpBtnStyle}
            />
            <PrimaryButton onPress={onContinue} label='Continue' labelStyle={props.nextLabelStyle} buttonStyle={props.nextBtnStyle} />
        </View>
    )
}

export default MultipleChoiceQuestion;