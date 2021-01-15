<template>
  <component :is="layout">
    <router-view :layout.sync="layout"/>
  </component>
</template>

<script>
import NavLink from './components/NavLink.vue';

export default {
  name: 'App',
  components: {
    NavLink
  },
  data: function() {
    return {
      layout: 'div'
    }
  }
}
</script>
