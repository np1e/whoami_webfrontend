<template>
    <footer class="flex sticky space-x-4 justify-between">
        <p class="flex place-items-center">Made with 
            <svg class="h-4 w-4 mx-1 hover:opacity-60" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg> 
            in Wiesbaden
        </p>
        <router-link class="hover:text-primary" to='/imprint'>Imprint</router-link>
    </footer>
</template>

<script>
export default {
    name: "custom-footer"
}
</script>

<style lang="scss">
</style>