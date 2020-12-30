<template>
  <div class="Home">
    <h1>Home</h1>
    
  </div>
</template>

<script>
import LayoutDefault from '../components/layout/LayoutDefault.vue';

export default {
    name: 'Home',
    created: function() {
      this.$emit('update:layout', LayoutDefault)
    }
}
</script>