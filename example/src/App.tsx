import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  MatchingQuestion,
  MultipleChoiceQuestion,
  QuizContainer,
  WritingQuestion,
} from '../../src/index';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <MatchingQuestion questionAnswerPairs = {[
        {answer: 'hello', question: 'goodbye'},
        {answer: 'see ya', question: 'be ya'},
        {answer: 'mia', question: 'pia'}
        ]} 
        onSubmit={()=>console.log('submit')}
        onContinue={()=>console.log('continue')}
        instructionText='please answer'
        isActiveQuestion={true}
        /> */}
      {/* <MultipleChoiceQuestion
        question="How much does an apple cost?"
        answer="$15.99"
        allChoices={['$15.99', '$1.00', '$9.99']}
        onSubmit={() => console.log('submit')}
        onContinue={() => console.log('continue')}
        instructionText="please answer"
        isActiveQuestion={true}
      /> */}
      {/* <WritingQuestion 
        question='How many apples are in a dozen?'
        answer='12'
        onSubmit={() => console.log('submit')}
        onContinue={() => console.log('continue')}
        instructionText="please answer"
        isActiveQuestion={true}
      /> */}
      <QuizContainer
        questions={[
          {
            questionType: 'Matching',
            questionAnswerPairs: [
              { answer: 'hello', question: 'goodbye' },
              { answer: 'see ya', question: 'be ya' },
              { answer: 'mia', question: 'pia' },
            ],
            onSubmit: (isCorrect: boolean) => console.log(isCorrect),
            instructionText: 'try this out',
            onContinue: () => console.log('continue'),
          },
          {
            questionType: 'MultipleChoice',
            question: 'How much does an apple cost?',
            answer: '$15.99',
            allChoices: ['$15.99', '$1.00', '$9.99'],
            onSubmit: (isCorrect) => console.log('submit'),
            onContinue: () => console.log('continue'),
            instructionText: 'please answer',
          },
          {
            questionType: 'Writing',
            question: 'How many apples are in a dozen?',
            answer: '12',
            onSubmit: () => console.log('submit'),
            onContinue: () => console.log('continue'),
            instructionText: 'please answer',
          },
          {
            questionType: 'Writing',
            question: 'How many apples are in a dozen?',
            answer: '12',
            onSubmit: () => console.log('submit'),
            onContinue: () => console.log('continue'),
            instructionText: 'please answer',
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
