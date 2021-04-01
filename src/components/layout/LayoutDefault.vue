<template>
  <div class="layout-default max-w-screen flex flex-col h-screen justify-between">
    <navigation v-on:reportBug="showReportBug"/>
    <BugReport :showDrawer="reportBug" @hide="reportBug=false"></BugReport>
    <main class="mb-auto h-full">
      <slot/>
    </main>
    <custom-footer />
  </div>
</template>

<script>
import Navigation from './Navigation.vue';
import Footer from './Footer.vue';
import BugReport from '../BugReport.vue';

export default {
    name: "DefaultLayout",
    data: function() {
      return {
        reportBug: false
      }
    },
    components: {
        Navigation,
        "custom-footer": Footer,
        BugReport
    },
    methods: {
      showReportBug: function() {
        this.reportBug = true;
      }
    }
}
</script>

<style lang="scss">
</style>