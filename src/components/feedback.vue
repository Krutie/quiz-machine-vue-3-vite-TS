<template>
  <div style="padding-top: 20px;">
    <component
      v-if="currentFeedback"
      v-bind:is="currentFeedback.mood"
      :key="currentFeedback.state"
      class="feedback"
    ></component>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Feedback } from "../types/index";

export default defineComponent({
  props: {
    currentFeedback: {
      type: Object as PropType<Feedback>,
      required: true
    }
  }
});
</script>
