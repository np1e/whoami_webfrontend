<template>
    <div class="About">
        
    </div>
</template>

<script>
import LayoutDefault from '../components/layout/LayoutDefault.vue';

export default {
    name: 'About',
    created: function() {
      this.$emit('update:layout', LayoutDefault)
    }
}
</script>