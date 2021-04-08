import type { MatchingCard, MatchingQState, QuestionAnswerPair } from "./definitions";

type State = MatchingQState;

type Actions =
  | { type: 'selectCard'; payload: { selection: MatchingCard } }
  | { type: 'reset'; payload: { questionAnswers: Array<QuestionAnswerPair> } };

const compose = (...fns: Array<(y: any) => any>) => (x: any) =>
  fns.reduceRight((y, f) => f(y), x);

const attemptToMatch = (card: MatchingCard, deck: Array<MatchingCard>) =>
  compose(updateDeckAfterSubmission, checkForMatch, selectCard)({ card, deck });

const checkForMatch = (deck: Array<MatchingCard>) => {
  //returns true or false based on 2 selected cards
  var selectedCards = deck.filter((c) => c.selected);
  if (selectedCards.length == 2) {
    return { submission: selectedCards[0].pair == selectedCards[1].pair, deck };
  } else {
    return { submission: false, deck };
  }
};

const updateDeckAfterSubmission = (verdict: {
  submission: boolean;
  deck: Array<MatchingCard>;
}) => {
  //returns new array - if selected card are correct then they become invisible, if not then they become unselected
  return verdict.submission
    ? verdict.deck.map((c) => {
        return c.selected
          ? { ...c, selected: false, visible: false, justSubmitted: true }
          : { ...c, justSubmitted: false };
      })
    : verdict.deck.map((c) => {
        return c.selected
          ? { ...c, selected: false, justSubmitted: true }
          : { ...c, justSubmitted: false };
      });
};

const selectCard = (obj: { card: MatchingCard; deck: Array<MatchingCard> }) => {
  //sets selected card.selected = true and returns array of updated cards
  return obj.deck.map((c) => {
    return c.index == obj.card.index
      ? { ...c, selected: true, justSubmitted: false }
      : { ...c, justSubmitted: false };
  });
};

const unselectCard = (obj: {
  card: MatchingCard;
  deck: Array<MatchingCard>;
}) => {
  return obj.deck.map((c) => {
    return c.index == obj.card.index
      ? { ...c, selected: false, justSubmitted: false }
      : { ...c, justSubmitted: false };
  });
};

const splitQuestionAnswerPair = (
  questionAnswer: QuestionAnswerPair,
  increment: number,
  index: number
): Array<MatchingCard> => {
  return [
    {
      index: index,
      name: questionAnswer.question,
      pair: index,
      selected: false,
      visible: true,
      justSubmitted: false,
    },
    {
      index: increment+index,
      name: questionAnswer.answer,
      pair: index,
      selected: false,
      visible: true,
      justSubmitted: false,
    },
  ];
};

const createMatchingCards = (questionAnswers: Array<QuestionAnswerPair>) => {
  const incrementValue = questionAnswers.length;
  const matchingCards: Array<MatchingCard> = questionAnswers.flatMap(
    (curr, index) => splitQuestionAnswerPair(curr, incrementValue, index)
  );
  return matchingCards;
};

const shuffleArray = (ogArray: Array<any>) => {
  let array = [...ogArray];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  console.log('running shuffle array')
  return array;
};

export const setup = compose(shuffleArray, createMatchingCards);

export const matchingReducer = (state: State, action: Actions) => {
  if (action.type == 'selectCard') {
    var isUserPickingSecondCard =
      state.deck.filter((c) => c.selected).length > 0;
    var isUserPickingSameCard =
      state.deck.find((c) => c.selected) == action.payload.selection;
    var isGameFinished = state.deck.filter((c) => c.visible).length <= 2;
    return isUserPickingSecondCard
      ? isUserPickingSameCard
        ? {
            ...state,
            deck: unselectCard({
              card: action.payload.selection,
              deck: state.deck,
            }),
          }
        : {
            ...state,
            deck: attemptToMatch(action.payload.selection, state.deck),
            continueEnabled: isGameFinished,
          }
      : //setAllCards(compose( updateDeckAfterSubmission, checkForMatch, selectCard )({card, allCards}))
        {
          ...state,
          deck: selectCard({
            card: action.payload.selection,
            deck: state.deck,
          }),
        };
    //setAllCards(selectCard({card, allCards}))
  } else if (action.type === 'reset') {
    return {
      deck: setup(action.payload.questionAnswers),
      continueEnabled: false
    };
  } else {
    return { ...state };
  }
};
