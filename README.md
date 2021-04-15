# react-native-quiz-maker

A dynamic UI library for creating interactive quizzes in react-native.

## Installation

```sh
npm install react-native-quiz-maker
```

https://www.npmjs.com/package/react-native-quiz-maker

## Examples

![](https://user-images.githubusercontent.com/31594943/114805261-aa0feb00-9d70-11eb-9a58-4eb1fd7b1a08.gif)
![](https://user-images.githubusercontent.com/31594943/114805255-a8debe00-9d70-11eb-8df3-d3388b86f18f.gif)
![](https://user-images.githubusercontent.com/31594943/114805253-a714fa80-9d70-11eb-86c3-f00eb01abc47.gif)

## Usage

```js
import { QuizContainer } from 'react-native-quiz-maker';
import { View } from 'react-native';

<View style={styles.container}>
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
        instructionText: 'Match the definition with the appropriate triangle',
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
