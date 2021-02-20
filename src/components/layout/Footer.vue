<template>
    <footer class="footer sticky py-2">
        <div class="footer__text text-center font-mono text-sm tracking-tighter text-gray-600">
            Made with 
            <svg class="w-4 h-4 inline stroke-2 hover:stroke-red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            by <a class="text-primary hover:text-gray-600" target="_blank" href="https://twitter.com/npie_">Nick</a>
        </div>
    </footer>
</template>

<script>
export default {
    name: "custom-footer",
    components: {
    }
}
</script>

<style lang="scss">
</style>