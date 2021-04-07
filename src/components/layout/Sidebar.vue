<template>
<div :class="stateClass" class="sidebar h-full pl-8 pr-6 flex flex-col border-r divide-y">
    <slot/>
</div>
</template>
<script>

export default {
    name: 'Sidebar',
    props: ['gameState'],
    data: function() {
        return {
            stateClass: this.gameState.toLowerCase()
        }
    },
    components: {
    },
    methods: {
    },
    
}
</script>

<style lang="scss">
.sidebar {

    &.running {
        width: 350px;
    }

    &.waiting {
        width: 500px;
    }
}
</style>