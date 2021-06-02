<template>
  <div id="quiz">
    <h2>Quiz Machine - v6 - TS - Vite</h2>
    <h3>Same as V5, but with Vite and not with Vue CLI</h3>
    <code>state: {{ state.value }} </code>

    <div class="box">
      <!-- if you don't want to use GSAP, bind CSS -->
      <!-- :class="{ wiggle: state.matches('answering.invalid') }" -->
      <!-- feedback emojis -->
      <feedback :currentFeedback="currentFeedback" :state="state"/>

      <!-- instructions -->
      <instructions :state="state" />

      <!-- question -->
        <div v-if="isQuestionTime">
          <span class="question">
            {{ currentQuestion.text }}
          </span>
          <div v-for="option in currentQuestion.options" :key="option" style="text-align: left;">
            <input
              :disabled="isAnswered"
              type="radio"
              :id="option"
              :value="option"
              v-model="selectedOption"
            />
            <label :class="{ 'disabled-label': isAnswered }" :for="option">{{option}}</label>
          </div>
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
    actions,
  },
  setup() {
    const {
      state,
      send,
      selectedOption,
      isQuestionTime,
      isAnswered,
      currentQuestion,
      currentFeedback,
      activeButton,
    } = useQuiz(fetchQuestions());

    return {
      state,
      send,
      selectedOption,
      isAnswered,
      isQuestionTime,
      currentQuestion,
      currentFeedback,
      activeButton,
    };
  },
});
</script>
<style></style>
<!-- Active issue on watch -->
<!-- https://github.com/znck/vue-developer-experience/issues/142 -->