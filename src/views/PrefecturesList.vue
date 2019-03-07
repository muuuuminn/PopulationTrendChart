<template>
  <div class="Checkbox">
    <h1>Checkbox</h1>
    <button @click="fetchPrefectures()">CallAPI</button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Checkbox",
  methods: {
    ...mapActions("apiCaller", ["fetchPrefectures"])
  }
};
</script>
