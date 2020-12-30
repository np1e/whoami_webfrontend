<template>
  <div class="layout-default container flex flex-col h-screen justify-between py-4">
    <nav class="flex justify-left space-x-6 mb-8">
      <nav-link route="/">Home</nav-link>
      <nav-link route="/about">About</nav-link>
    </nav>
    <main class="mb-auto">
      <slot/>
    </main>
    <custom-footer />
  </div>
</template>

<script>
import NavLink from '../NavLink.vue';
import Footer from './Footer.vue';

export default {
    name: "DefaultLayout",
    components: {
        NavLink,
        "custom-footer": Footer
    }
}
</script>

<style lang="scss">
</style>