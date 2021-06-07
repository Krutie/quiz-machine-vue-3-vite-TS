/* eslint-disable */
import { ref, computed, watchEffect } from "vue";

// XSTATE
import { useMachine } from "@xstate/vue";
import { QuizEvent, Question, Action, Feedback } from "../types/";
import { QuizMachine } from "../machines/QuizMachine";

// GSAP Transition
import { shake } from '../utils/transitions';

export default function quiz(Questions: Question[]) {

  // const totalQuestions = ref(Questions.length) // remove

  /* initialise xstate machine */
  const { state, send } = useMachine(QuizMachine, { devTools: true });

  /* user answer to the question */ 
  const selectedOption = ref<string | undefined>();

  /* show question if the following states don't matche */
  const isQuestionTime = computed<boolean>(
    () => !state.value.matches("initial") && !state.value.matches("finish")
  );

  const resultStates = ["correct", "incorrect"] as const;
  const isAnswered = computed<boolean>(() => resultStates.some(state.value.matches));

  /* current question based on context value defined in Quiz machine */
  const currentQuestion = computed<Question>(
    () => Questions[state.value.context.currentQuestion]
  );


  /* reset answers when new question is set */
  watchEffect(() => {
    // reset radio buttons when state becomes pending
    if (state.value.matches("answering.idle")) {
      selectedOption.value = undefined;
    }

    // shake box when answer is invalid
    if (state.value.matches("answering.invalid")) {
      shake(".box")
    }
  });


  /* ACTIONS: Array below decides which button to show based on current state */
  const actions: Action[] = [
    {
      label: "START",
      cond: state => state.value.matches("initial"),
      type: () =>
        send({
          type: "START",
          totalQuestions: Questions.length,
        } as QuizEvent)
    },
    {
      label: "ANSWER",
      cond: state => ["answering.idle", "answering.invalid"].some(state.value.matches),
      type: () =>
        send({ 
          type: "ANSWER",
          answer: { 
            selectedOption: selectedOption.value,
            value: currentQuestion.value.answer 
          }
        } as QuizEvent)
    },
    {
      label: "NEXT",
      cond: state => ["correct", "incorrect"].some(state.value.matches),
      type: () => send({ type: "NEXT_QUESTION" })
    }
  ];

  /* ACTION: show active button based on state value */
  const activeAction = computed(() => actions.find(action => action.cond(state)) || actions[0]);

  /* return properties and methods to control the UI */
  return {
    state,
    selectedOption,
    isQuestionTime,
    isAnswered,
    currentQuestion,
    activeAction
  };
}
