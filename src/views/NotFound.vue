<template>
  <div class="home content h-full flex justify-center items-center">
      <h1 class="text-gray-800 pb">Not Found</h1>
  </div>
</template>

<script>
import LayoutDefault from "../components/layout/LayoutDefault.vue";

export default {
  name: "Home",
  components: {
  },
  data: function() {
    return {
    }
  },
  created: function () {
    this.$emit("update:layout", LayoutDefault);
  },
  methods: {
    
  }
};
</script>

<style lang="scss">

</style>