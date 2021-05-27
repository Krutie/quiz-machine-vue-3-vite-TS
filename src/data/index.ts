import { Question } from "../types/";

const questions: Question[] = [
  {
    text: "This is true.",
    answer: true
  },
  {
    text: "This is false.",
    answer: false
  },
  {
    text: "True: Context API in React is bit similar to Provide/Inject in Vue.",
    answer: true
  },
  {
    text:
      "False: You have to author two separate Xstate machines to be used in Vue app and React app. ",
    answer: false
  },
  {
    text:
      "True: watchEffect in Vue 3 is sort of similar to useEffect in React, like they both handle side-effects.",
    answer: true
  },
  {
    text: "This is false.",
    answer: false
  }
];

export const fetchQuestions = () => {
  return questions;
};
