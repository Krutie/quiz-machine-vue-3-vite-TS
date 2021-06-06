<template>
  <div class="feedback">
    <transition name="fade" mode="out-in">
    <component
      v-if="currentFeedback"
      v-bind:is="currentFeedback.mood"
      :key="currentFeedback.state"
      class="emoji"
    ></component>
    </transition>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { Feedback, QuizContext, QuizEvent, QuizState } from "../../types/index";
import { State } from "xstate";

// Feedback (Vue) components
import {
  answering,
  incorrect,
  finish,
  idle,
  correct
} from "./moods/";

export default defineComponent({
  props: {
     state: {
      type: Object as PropType<State<QuizContext, QuizEvent, QuizState>>,
      required: true
    }
  },
  setup(props) {
    /* default feedback object map */
    const defaultFeedback = { state: "initial", mood: idle, color: "#a27ae8" };

    const feedbackMap: Feedback[] = [
      { state: "initial", mood: idle, color: "#a27ae8" },
      { state: "answering.idle", mood: answering, color: "#FCCB7E" },
      { state: "correct", mood: correct, color: "#50b97e" },
      { state: "incorrect", mood: incorrect, color: "#ff7043" },
      { state: "finish", mood: finish, color: "#a27ae8" }
    ];

    /* show current feedback based on state value */
    const currentFeedback = computed(() => {
      const matched = feedbackMap.filter(feedback =>
        props.state.toStrings().includes(feedback.state)
      );
      return matched.length === 1 ? matched[0] : defaultFeedback;
    });

    return {
      currentFeedback
    }
  }
});
</script>
