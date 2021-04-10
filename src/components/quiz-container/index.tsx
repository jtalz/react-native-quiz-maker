import React, { useState, useReducer, useEffect } from 'react';
import { Animated, Text, View } from 'react-native';
import { Sizing } from '../../styles';
import { springAnimation } from '../../services';
import MatchingQuestion from '../question-types/Matching';
import MultipleChoiceQuestion from '../question-types/MultipleChoice';
import WritingQuestion from '../question-types/Writing';
import {
  getQuizContainerInitialState,
  QuestionProps,
  QuizContainerProps,
} from './definitions';
import { QuizContainerReducer, isLastElement } from './reducer';

const QuizContainer: React.FC<QuizContainerProps> = (props) => {
  const [state, dispatch] = useReducer(
    QuizContainerReducer,
    getQuizContainerInitialState(props.lives)
  );

  const horizontalContainer = useState(new Animated.Value(0))[0];

  useEffect(() => {
    setQuestionComponents(props.questions);
  }, []);

  const setQuestionComponents = (questionComponents: QuestionProps) =>
    dispatch({
      type: 'setQuestionComponents',
      payload: { questionComponents },
    });

  const slideToNextQ = (onContinue: () => void) => {
    if (!isLastElement(state.activeQuestion, state.questionComponents)) {
      springAnimation(horizontalContainer, state.activeQuestion + 1).start();
      onContinue();
      dispatch({ type: 'nextSlide' });
    }else{
        console.log('finished')
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        //horizontal={true}
        style={[
          {
            flexDirection: 'row',
            flex: 1,
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
            question.questionType == 'MultipleChoice' &&
            'question' in question &&
            'allChoices' in question
          ) {
            return (
              <MultipleChoiceQuestion
                key={index}
                question={question.question}
                answer={question.answer}
                allChoices={question.allChoices}
                onSubmit={(isCorrect) => question.onSubmit(isCorrect)}
                onContinue={() => slideToNextQ(question.onContinue)}
                instructionText={question.instructionText}
                isActiveQuestion={state.activeQuestion == index}
              />
            );
          } else if (
            question.questionType == 'Matching' &&
            'questionAnswerPairs' in question
          ) {
            return (
              <MatchingQuestion
                key={index}
                questionAnswerPairs={question.questionAnswerPairs}
                onSubmit={(isCorrect) => question.onSubmit(isCorrect)}
                onContinue={() => slideToNextQ(question.onContinue)}
                instructionText={question.instructionText}
                isActiveQuestion={state.activeQuestion == index}
              />
            );
          } else if (
            question.questionType == 'Writing' &&
            'question' in question
          ) {
            return (
              <WritingQuestion
                key={index}
                question={question.question}
                answer={question.answer}
                onSubmit={(isCorrect) => question.onSubmit(isCorrect)}
                onContinue={() => slideToNextQ(question.onContinue)}
                instructionText={question.instructionText}
                isActiveQuestion={state.activeQuestion == index}
              />
            );
          } else {
            return <Text>ERROR HERE</Text>;
          }
        })}
      </Animated.View>
    </View>
  );
};

export default QuizContainer;
