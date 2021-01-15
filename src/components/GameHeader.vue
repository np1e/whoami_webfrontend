<template>
<div class="lg:flex lg:items-center lg:justify-between mb-8">
  <div class="flex-1 min-w-0">
    <h2 class="text-2xl my-0 font-bold leading-7 text-gray-800 sm:text-3xl sm:truncate">
      {{ game.name }}
    </h2>
    <div class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
      <div class="mt-2 flex items-center text-sm text-gray-500">
        <!-- Heroicon name: location-marker -->
        <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
        {{ game.players.length }} players
      </div>
      <div class="mt-2 flex items-center text-sm text-gray-500">
        <!-- Heroicon name: briefcase -->
        <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
        </svg>
        {{ game.created.toLocaleString(locale) }}
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
    name: "GameHeader",
    props: ['game'],
    data: function() {
        return {
            locale: ""
        }
    },
    mounted: function() {
        this.locale = navigator.language;
    }
}
</script>