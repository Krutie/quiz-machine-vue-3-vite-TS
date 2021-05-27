/* eslint-disable */
import { ref, computed, watchEffect } from "vue";

// XSTATE
import { useMachine } from "@xstate/vue";
import { QuizEvent, Question, Action, Feedback } from "../types/";
import { QuizMachine } from "../machines/QuizMachine";

// Feedback (Vue) components
import {
  answering,
  incorrect,
  finish,
  idle,
  correct
} from "../components/feedback-components/";

export default function quiz(Questions: Question[]) {
  // initialise xstate machine
  const { state, send } = useMachine(QuizMachine, { devTools: true });

  // user answer to true/false question
  const picked = ref<boolean | null>();

  // show question if the following states don't matche
  const isQuestionTime = computed<boolean>(
    () => !state.value.matches("initial") && !state.value.matches("finish")
  );

  const resultStates = ["correct", "incorrect"] as const;
  const isAnswered = computed<boolean>(() => resultStates.some(state.value.matches));

  // current question based on context value defined in Quiz machine
  const currentQuestion = computed<Question>(
    () => Questions[state.value.context.currentQuestion]
  );

  // reset answers when new question is set
  watchEffect(() => {
    // reset radio buttons when state becomes pending
    if (state.value.matches("answering.idle")) {
      picked.value = null;
    }
  });

  // Feedback ======================================

  // default feedback object map
  const defaultFeedback = { state: "initial", mood: idle, color: "#a27ae8" };

  const newFeedbackMap: Feedback[] = [
    { state: "initial", mood: idle, color: "#a27ae8" },
    { state: "answering.idle", mood: answering, color: "#FCCB7E" },
    { state: "correct", mood: correct, color: "#50b97e" },
    { state: "incorrect", mood: incorrect, color: "#ff7043" },
    { state: "finish", mood: finish, color: "#a27ae8" }
  ];

  const currentFeedback = computed(() => {
    const matched = newFeedbackMap.filter(feedback =>
      state.value.toStrings().includes(feedback.state)
    );
    return matched.length === 1 ? matched[0] : defaultFeedback;
  });

  // ACTIONS ======================================

  // Array below decides which button to show based on current state
  const actions: Action[] = [
    {
      label: "START",
      cond: state => state.value.matches("initial"),
      action: () =>
        send({
          type: "START",
          totalQuestions: Questions.length
        } as QuizEvent)
    },
    {
      label: "ANSWER",
      cond: state => ["answering.idle", "answering.problem"].some(state.value.matches),
      action: () =>
        send({ 
          type: "ANSWER", 
          answer: { 
            picked: picked.value, 
            value: currentQuestion.value.answer 
          }
        } as QuizEvent)
    },
    {
      label: "NEXT",
      cond: state => ["correct", "incorrect"].some(state.value.matches),
      action: () => send({ type: "NEXT_QUESTION" })
    }
  ];

  // show active button based on state value
  const activeButton = computed(() => actions.find(action => action.cond(state)) || actions[0]);

  // return properties and methods to control the UI
  return {
    state,
    send,
    picked,
    isQuestionTime,
    isAnswered,
    currentQuestion,
    currentFeedback,
    activeButton
  };
}
