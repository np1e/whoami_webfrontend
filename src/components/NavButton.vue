<template>
    <router-link :to="route" class="nav__button shadow-md text-gray bg-primary rounded px-md py-sm hover:bg-primary-dark transition-colors">
        <slot/>
    </router-link>
</template>

<script>
export default {
    name: 'NavButton',
    props: {
        route: String,
        label: String
    },
}
</script>

<style lang="scss">
.nav__button {
    text-align: center;
}
</style>