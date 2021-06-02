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
import { defineComponent, PropType } from "vue";
import { Feedback } from "../types/index";

import { QuizContext, QuizEvent, QuizState } from "../types/index";
import { State } from "xstate";

export default defineComponent({
  props: {
    state: {
      type: Object as PropType<State<QuizContext, QuizEvent, QuizState>>,
      required: true
    },
    currentFeedback: {
      type: Object as PropType<Feedback>,
      required: true
    }
  }
});
</script>
