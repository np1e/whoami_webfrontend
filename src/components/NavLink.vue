<template>
    <router-link :to="route" class="nav__item opacity-90 hover:opacity-100">
        <slot/>
    </router-link>
</template>

<script>
export default {
    name: 'NavLink',
    props: {
        route: String,
        label: String
    },
}
</script>

<style lang="scss">

</style>