import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MatchingQuestion } from '../../src/index'

export default function App() {

  return (
    <View style={styles.container}>
      <MatchingQuestion questionAnswerPairs = {[
        {answer: 'hello', question: 'goodbye'},
        {answer: 'see ya', question: 'be ya'},
        {answer: 'mia', question: 'pia'}
        ]} 
        onSubmit={()=>console.log('submit')}
        onContinue={()=>console.log('submit')}
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
