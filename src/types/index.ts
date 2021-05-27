import component from "*.vue";
import { Component } from "vue";
import { State } from "xstate";

export interface Answer {
  picked: boolean | null;
  value: boolean;
}

export interface Question {
  text: string;
  answer: boolean;
}
export interface Action {
  label: string;
  cond: (state: any) => any;
  // action: () => void;
  action: () => State<QuizContext, QuizEvent, QuizState>;
}

export interface Feedback {
  state: string;
  mood: any;
  color: string;
}

// The context (extended state) of the machine
export interface QuizContext {
  currentQuestion: number;
  correct: number;
  incorrect: number;
  errorMessage?: string;
  answer?: Answer;
  totalQuestions: number;
}

type InitialState = { value: "initial"; context: QuizContext };
type AnsweringState = { value: "answering"; context: QuizContext };
type IdleState = { value: "answering.idle"; context: QuizContext };
type SubmittingState = { value: "submitting"; context: QuizContext };
type CompleteState = { value: "complete"; context: QuizContext };
type CheckingState = { value: "checking"; context: QuizContext };
type CorrectState = { value: "correct"; context: QuizContext };
type IncorrectState = { value: "incorrect"; context: QuizContext };
type FinishState = { value: "finish"; context: QuizContext };

export type QuizState =
  | InitialState
  | AnsweringState
  | IdleState
  | SubmittingState
  | CompleteState
  | CheckingState
  | CorrectState
  | IncorrectState
  | FinishState;

export type QuizEvent =
  | { type: "START"; totalQuestions: number }
  | { type: "ANSWER"; answer?: Answer }
  | { type: "NEXT_QUESTION" };
