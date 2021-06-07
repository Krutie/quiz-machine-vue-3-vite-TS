<template>
  <div class="quiz">
    <h1>Quiz Machine</h1>
    <h2>Vite + Vue + TS</h2>
    <!-- <h3>Same as V5, but with Vite and not with Vue CLI</h3> -->
    <code>State: {{ state.value }} </code>

    <div class="box">
      <!-- if you don't want to use GSAP, bind CSS -->
      <!-- :class="{ wiggle: state.matches('answering.invalid') }" -->
      <!-- feedback emojis -->
      <feedback :state="state" />

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
      <action :state="state" :activeAction="activeAction" />
      
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
import feedback from "./components/feedback/index.vue";
import score from "./components/score.vue";
import action from "./components/action.vue";

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
    action,
  },
  setup() {
    const {
      state,
      selectedOption,
      isQuestionTime,
      isAnswered,
      currentQuestion,
      activeAction,
    } = useQuiz(fetchQuestions());

    return {
      state,
      selectedOption,
      isAnswered,
      isQuestionTime,
      currentQuestion,
      activeAction,
    };
  },
});
</script>
<style></style>
<!-- Active issue on watch -->
<!-- https://github.com/znck/vue-developer-experience/issues/142 -->