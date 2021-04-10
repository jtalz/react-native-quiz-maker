import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MatchingQuestion, MultipleChoiceQuestion, WritingQuestion } from '../../src/index';

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
