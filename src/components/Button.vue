<template>
    <button :type="type || 'button'" class="button shadow-md text-gray bg-primary rounded px-md py-sm hover:bg-primary-dark transition-colors">
        <slot/>
    </button>
</template>

<script>
export default {
    name: 'CustomButton',
    props: {
        type: String
    },
}
</script>

<style lang="scss">
.button {
    font-weight: 500;
    font-size: 18px;
}
</style>