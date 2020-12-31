<template>
    <router-link :to="route" class="footer__item transition-all duration-300">
        <slot/>
    </router-link>
</template>

<script>
export default {
    name: 'FooterLink',
    props: {
        route: String
    },
}
</script>

<style lang="scss">
.footer__item {
    font-size: 18px;
}
</style>