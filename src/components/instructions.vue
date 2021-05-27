<template>
  <span v-if="state.matches('initial')">
    There are total three questions in this quiz. You can choose to answer or
    skip. Skipped question will be marked as an incorrect answer.
  </span>
  <div v-if="state.matches('finish')" class="finish">
    Congratulations! You finished.
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { QuizContext, QuizEvent, QuizState } from "../types/index";
import { State } from "xstate";
export default defineComponent({
  props: {
    state: {
      type: Object as PropType<State<QuizContext, QuizEvent, QuizState>>,
      required: true
    }
  }
});
</script>
