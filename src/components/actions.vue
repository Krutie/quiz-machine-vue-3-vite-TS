<template>
  <div class="action" v-if="!state.matches('finish')">
    <button @click="activeButton.action">
      {{ activeButton.label }}
    </button>
    <span style="display: block">{{ state.context.errorMessage }}</span>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Action, QuizContext, QuizEvent, QuizState } from "../types/index";

import { State } from "xstate";

export default defineComponent({
  props: {
    state: {
      type: Object as PropType<State<QuizContext, QuizEvent, QuizState>>,
      required: true
    },
    activeButton: {
      type: Object as PropType<Action>,
      required: true
    }
  }
});
</script>
