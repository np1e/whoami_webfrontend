<template>
    <button @click="$emit('click', $event.target.value)" :type="type || 'button'" 
    :class="{'running': loading }"
    class="button ld-ext-right shadow-md text-light-gray bg-primary rounded px-md py-sm hover:bg-primary-dark transition-colors">
        <slot/>
        <div class="ld ld-ring ld-spin" style="color:#fff"></div>
    </button>
</template>

<script>
export default {
    name: 'CustomButton',
    emits: ['click'],
    props: {
        type: String,
        loading: Boolean
    },
}
</script>

<style lang="scss">
.button {
    font-weight: 500;
    font-size: 18px;
}
</style>