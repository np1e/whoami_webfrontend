<template>

<div class="center-card-container h-full flex items-center justify-center">
  <div class="center-card border border-gray-300 p-5 flex flex-col space-y-6 rounded transition transition-duration-500 hover:shadow-md">
    <slot/>
  </div>
</div>

</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'CenterCard',
    computed: {
    },
}
</script>

<style lang="scss">
</style>