<template>
    <router-link :to="route" class="nav-link">
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
.nav-link {
    border-bottom: solid 2px transparent;

    &:hover {
        border-bottom: solid 2px var(--primary);
    }

    &.router-link-exact-active {
        border-bottom: solid 2px var(--primary);
    }
}

</style>