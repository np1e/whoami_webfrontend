<template>
  <div class="layout-default container max-w-screen-2xl flex flex-col h-screen justify-between py-4">
    <navigation />
    <main class="mb-auto">
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