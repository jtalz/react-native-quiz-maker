# react-native-quiz-maker

A dynamic UI library for creating interactive quizzes in react-native. 

## Installation

```sh
npm install react-native-quiz-maker
```
https://www.npmjs.com/package/react-native-quiz-maker

## Usage

```js
import { QuizContainer } from 'react-native-quiz-maker';
import { View } from 'react-native';

<View style={styles.container}>
  <QuizContainer
    questions={[
      {
        questionType: 'MultipleChoice',
        question: 'How much does an apple cost?',
        answer: '$15.99',
        allChoices: ['$15.99', '$1.00', '$9.99'],
        instructionText: 'please answer',
      },
      {
        questionType: 'Matching',
        questionAnswerPairs: [
          { answer: 'hello', question: 'goodbye' },
          { answer: 'see ya', question: 'be ya' },
          { answer: 'mia', question: 'pia' },
        ],
        instructionText: 'try this out',
      },
      {
        questionType: 'Writing',
        question: 'How many apples are in a dozen?',
        answer: '12',
        instructionText: 'please answer',
      },
    ]}
    onSubmit={(isCorrect: boolean) => console.log(isCorrect)}
    onComplete={(progress: number) => console.log('score: ', progress)}
  />
</View>;
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
