<template>
  <div class="score">
    <div class="count correct">
      {{ correct }}
    </div>
    <div class="count incorrect">
      {{ incorrect }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    correct: Number,
    incorrect: Number
  }
});
</script>
