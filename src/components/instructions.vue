<template>
  <span v-if="state.matches('initial')">
    This quiz is built with XState, Vue and Vite. Click start to
            begin.
  </span>
  <div v-if="state.matches('finish')" class="finish" >
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
