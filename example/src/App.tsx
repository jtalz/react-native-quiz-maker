import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  MatchingQuestion,
  MultipleChoiceQuestion,
  QuizContainer,
  WritingQuestion,
} from 'react-native-quiz-maker';

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
            questionType: 'Writing',
            question:
              'What is the last name of The United States of Americas first President?',
            answer: 'Washington',
          },
          {
            questionType: 'MultipleChoice',
            question: 'What is 5 x 10 + 30?',
            answer: '80',
            allChoices: ['54', '85', '80'],
            instructionText: 'Press on or drag the best answer to place',
          },
          {
            questionType: 'Matching',
            questionAnswerPairs: [
              {
                answer: ' Equilateral',
                question: 'Three sides of equal length',
              },
              {
                answer: 'Acute',
                question: 'Three angles less than 90 degrees',
              },
              {
                answer: 'Obtuse',
                question: 'One angle greater than 90 degrees',
              },
              { answer: 'Isosceles', question: 'Two sides of equal length' },
            ],
            instructionText:
              'Match the definition with the appropriate triangle',
          },
        ]}
        onSubmit={(isCorrect: boolean) => console.log(isCorrect)}
        onComplete={(progress: number) => console.log('score: ', progress)}
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
