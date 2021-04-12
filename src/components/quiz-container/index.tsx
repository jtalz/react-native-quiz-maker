import React, { useState, useReducer, useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Sizing } from '../../styles';
import { springAnimation } from '../../services';
import MatchingQuestion from '../question-types/Matching';
import MultipleChoiceQuestion from '../question-types/MultipleChoice';
import WritingQuestion from '../question-types/Writing';
import type { QuizContainerProps } from './definitions';
import { QuizContainerReducer } from './reducer';
import { ContinueButton } from '../buttons';

const QuizContainer: React.FC<QuizContainerProps> = ({
  questions,
  customContainerStyle,
  lives = 0,
  continueLabelStyle,
  continueButtonStyle,
  onSubmit,
  onComplete,
}) => {
  const [state, dispatch] = useReducer(QuizContainerReducer, {
    questionComponents: [...questions],
    activeQuestion: 0,
    progress: 0,
    lives,
    continueEnabled: false,
  });

  const didMount = useRef(false);

  const horizontalContainer = useState(new Animated.Value(0))[0];

  const progressIncrement = 100 / questions.length;

  const nextQuestion = () =>
    state.activeQuestion === state.questionComponents.length - 1
      ? onComplete(state.progress)
      : dispatch({ type: 'nextSlide' });

  const userSubmit = (isCorrect: boolean = true) => {
    dispatch({ type: 'userSubmit', payload: { isCorrect, progressIncrement } });
    onSubmit(isCorrect);
  };

  useEffect(() => {
    didMount.current
      ? springAnimation(horizontalContainer, state.activeQuestion).start()
      : (didMount.current = true);
  }, [state.activeQuestion, horizontalContainer]);

  return (
    <View style={[{ flex: 1 }, customContainerStyle]}>
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            transform: [
              {
                translateX: horizontalContainer.interpolate({
                  inputRange: [0, state.questionComponents.length],
                  outputRange: [
                    (Sizing.sw * state.questionComponents.length) / 2 -
                      Sizing.sw / 2,
                    (-Sizing.sw * state.questionComponents.length) / 2 -
                      Sizing.sw / 2,
                  ],
                }),
              },
            ],
          },
        ]}
      >
        {state.questionComponents.map((question, index) => {
          if (
            question.questionType === 'MultipleChoice' &&
            'question' in question &&
            'allChoices' in question
          ) {
            return (
              <MultipleChoiceQuestion
                key={index}
                question={question.question}
                answer={question.answer}
                allChoices={question.allChoices}
                onSubmit={userSubmit}
                instructionText={question.instructionText}
              />
            );
          } else if (
            question.questionType === 'Matching' &&
            'questionAnswerPairs' in question
          ) {
            return (
              <MatchingQuestion
                key={index}
                questionAnswerPairs={question.questionAnswerPairs}
                onSubmit={userSubmit}
                instructionText={question.instructionText}
              />
            );
          } else if (
            question.questionType === 'Writing' &&
            'question' in question
          ) {
            return (
              <WritingQuestion
                key={index}
                question={question.question}
                answer={question.answer}
                onSubmit={userSubmit}
                instructionText={question.instructionText}
                isActiveQuestion={state.activeQuestion === index}
              />
            );
          } else {
            return <Text>ERROR HERE</Text>;
          }
        })}
      </Animated.View>
      <ContinueButton
        onContinue={nextQuestion}
        labelStyle={continueLabelStyle}
        buttonStyle={continueButtonStyle}
        enabled={state.continueEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    flexDirection: 'row',
    flex: 3,
  },
});

export default QuizContainer;
