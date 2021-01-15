<template>
</template>

<script>
import LayoutDefault from "../components/layout/LayoutDefault.vue";
import axios from "../mixins/axios.js";

export default {
  name: "Home",
  mixins: [axios],
  created: function () {
    this.$emit("update:layout", LayoutDefault);
  },
};
</script>

<style lang="scss">
</style>