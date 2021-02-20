<template>
  <div class="layout-default max-w-screen flex flex-col h-screen justify-between">
    <navigation />
    <main class="mb-auto h-full">
      <slot/>
    </main>
    <custom-footer />
  </div>
</template>

<script>
import Navigation from './Navigation.vue';
import Footer from './Footer.vue';

export default {
    name: "DefaultLayout",
    data: function() {
      return {
      }
    },
    components: {
        Navigation,
        "custom-footer": Footer
    },
    methods: {
      
    },
}
</script>

<style lang="scss">
</style>