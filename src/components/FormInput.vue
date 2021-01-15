<template>
    <div class="flex flex-col">
        <input :value="value" @input="$emit('input', $event.target.value)"
            :placeholder="placeholder"
            :class="[ error ? 'border-red-500' : 'border-gray' ]"
            class="h-14 transition-all text-base flex-1 placeholder-color-dark-accent rounded-md border appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
        >
    </div>
</template>

<script>

export default {
  name: "FormInput",
  props: {
      placeholder: String,
      value: String
  },
  emits: ['update:value'],
  data: function() {
      return {
      }
  },
}
</script>