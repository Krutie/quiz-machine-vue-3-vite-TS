<template>
  <div id="quiz">
    <h2>Quiz Machine - v6 - TS - Vite</h2>
    <code>state: {{ state.value }} </code>

    <div class="box">
      <!-- feedback emojis -->
      <feedback :currentFeedback="currentFeedback" />

      <!-- instructions -->
      <instructions :state="state" />

      <!-- question -->
      <div v-if="isQuestionTime">
        <span class="question">
          {{ currentQuestion.text }}
        </span>
        <input
          :disabled="isAnswered"
          type="radio"
          id="true"
          :value="true"
          v-model="picked"
        />
        <label :class="{ 'disabled-label': isAnswered }" for="true">True</label>
        <input
          :disabled="isAnswered"
          type="radio"
          id="false"
          :value="false"
          v-model="picked"
        />
        <label :class="{ 'disabled-label': isAnswered }" for="false"
          >False</label
        >
      </div>

      <!-- ACTIONS -->
      <actions :state="state" :activeButton="activeButton" />
    </div>

    <!-- SCORE -->
    <score
      :correct="state.context.correct"
      :incorrect="state.context.incorrect"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// child components
import instructions from "./components/instructions.vue";
import feedback from "./components/feedback.vue";
import score from "./components/score.vue";
import actions from "./components/actions.vue";
// usable
import useQuiz from "./use/quiz";

// fetch questions
import { fetchQuestions } from "./data";

export default defineComponent({
  name: "Quiz",
  components: {
    instructions,
    score,
    feedback,
    actions
  },
  setup() {
    const {
      state,
      send,
      picked,
      isQuestionTime,
      isAnswered,
      currentQuestion,
      currentFeedback,
      activeButton
    } = useQuiz(fetchQuestions());

    return {
      state,
      send,
      picked,
      isAnswered,
      isQuestionTime,
      currentQuestion,
      currentFeedback,
      activeButton
    };
  }
});
</script>
<style></style>
