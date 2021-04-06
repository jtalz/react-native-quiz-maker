import { PrimaryButton } from 'lib/typescript/components/buttons';
import React, { useReducer } from 'react';
import { View, TextStyle, ViewStyle, StyleProp, Text, StyleSheet } from 'react-native';
import { State } from 'react-native-gesture-handler';
import { ContinueButton, DraggableButton } from 'src/components/buttons';
import { QuestionHeader } from 'src/components/texts';
import timedAnimation from 'src/services/timedAnimation';

interface MultipleChoiceQuestionState {
    selectedChoice: number;
    questionStatus: string;
    choicesEnabled: boolean;
    checkEnabled: boolean;
    layout: { x: any, y: any };
    occupier: number
    isFull: boolean;
}

const MultipleChoiceQuestionInitialState: MultipleChoiceQuestionState = {
    selectedChoice: -1,
    questionStatus: "unanswered",
    choicesEnabled: true,
    checkEnabled: false,
    layout: { x: 0, y: 0 },
    occupier: -1,
    isFull: false,
}

type Actions =
    | { type: 'selectChoice'; payload: { selectedChoice: number } }
    | { type: 'checkPlease'; payload: { answer: string | number; allChoices: Array<string | number> } }
    | { type: 'disableCheck' }
    | { type: 'setCoordinates'; payload: { layout: { x: any, y: any } } }
    | { type: 'prepareForLanding'; payload: { occupier: number } }
    | { type: 'clearOut' }
    | { type: 'reset' }

type QuestionState = MultipleChoiceQuestionState

const MultipleChoiceReducer = (state: QuestionState, action: Actions) => {
    if (action.type == 'selectChoice') {
        return { ...state, selectedChoice: action.payload.selectedChoice, checkEnabled: true }
    } else if (action.type == 'checkPlease') {
        return action.payload.allChoices[state.selectedChoice] == action.payload.answer ?
            { ...state, questionStatus: 'correct', choicesEnabled: false } :
            { ...state, questionStatus: 'incorrect', choicesEnabled: false }
    } else if (action.type == 'disableCheck') {
        return { ...state, checkEnabled: false }
    } else if (action.type == 'setCoordinates') {
        return { ...state, layout: action.payload.layout };
    } else if (action.type == 'prepareForLanding') {
        return { ...state, isFull: true, occupier: action.payload.occupier };
    } else if (action.type == 'clearOut') {
        return { ...state, isFull: false, occupier: -1, checkEnabled: false };
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
    checkLabelStyle?: StyleProp<TextStyle>;
    checkBtnStyle?: StyleProp<ViewStyle>;
    continueLabelStyle?: StyleProp<TextStyle>;
    continueBtnStyle?: StyleProp<ViewStyle>;
}

const MultipleChoiceQuestion: React.FC<Props> = (props) => {

    const [state, dispatch] = useReducer(MultipleChoiceReducer, MultipleChoiceQuestionInitialState)

    const setLandingZoneCoordinates = (layout: any) => {
        dispatch({ type: 'setCoordinates', payload: { layout } })
    }

    const prepareForLanding = (occupier: any) =>
        dispatch({ type: "prepareForLanding", payload: { occupier } });

    const clearOut = () => dispatch({ type: "clearOut" });

    const selectChoice = (selectedChoice: number) => {
        selectedChoice == -1 ?
            dispatch({ type: 'disableCheck' })
            : dispatch({ type: 'selectChoice', payload: { selectedChoice } })
    }

    const submit = () => {
        dispatch({ type: 'checkPlease', payload: { answer: props.answer, allChoices: props.allChoices } });
        props.onSubmit(props.allChoices[state.selectedChoice] == props.answer)
    }

    const returnHandlerHome = (_translate: any, index: number) => {
        timedAnimation(_translate, 200, { x: 0, y: 0 }).start(() => {
            _translate.setOffset({ x: 0, y: 0 });
            _translate.setValue({ x: 0, y: 0 });
            state.occupier == index && clearOut();
        });
    };

    const sendHandlerToPlace = (_layout: any, _translate: any, index: number) => {
        timedAnimation(_translate, 200, {
            x:
                state.layout.x -
                _layout.x +
                40,
            y: state.layout.y - _layout.y + 10,
        }).start(() => {
            _translate.setOffset({
                x:
                    state.layout.x -
                    _layout.x +
                    40,
                y: state.layout.y - _layout.y + 10,
            });
            _translate.setValue({ x: 0, y: 0 });
            prepareForLanding(index)
            selectChoice(index);
        });
    };

    const onHandlerStateChange = (_layout: any, _translate: any, index: number) => (event: any) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            _translate.flattenOffset();
            state.isFull
                ? returnHandlerHome(_translate, index)
                : sendHandlerToPlace(_layout, _translate, index);
        }
    };

    return (
        <View>
            <QuestionHeader instructions={props.instructionText} question={props.question} />
            <Text>{state.checkEnabled}</Text>
            <View
                onLayout={
                    (event) => {
                        setLandingZoneCoordinates({
                            x: event.nativeEvent.layout.x,
                            y: event.nativeEvent.layout.y,
                        });
                    }
                }
            >
                <View style={styles.underline}></View>
            </View>
            {props.allChoices.map((name, index) => (
                <DraggableButton
                    key={index}
                    name={name.toString()}
                    onHandlerStateChange={onHandlerStateChange}
                    index={index}
                    landingZoneOccupier={state.occupier}
                    clearOut={clearOut}
                    choices={props.allChoices}
                    enabled={state.choicesEnabled}
                />
            ))}
            <PrimaryButton 
                label='Check' 
                onPress={submit} 
                labelStyle={props.checkLabelStyle} 
                buttonStyle={props.checkBtnStyle} 
            />
            <ContinueButton
                dispatch={dispatch}
                onContinue={props.onContinue}
                labelStyle={props.continueLabelStyle}
                btnStyle={props.continueBtnStyle}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    underline: {
        width: 40,
        height: 45,
        borderBottomColor: "black",
        borderWidth: 1,
        borderColor: "transparent",
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default MultipleChoiceQuestion;