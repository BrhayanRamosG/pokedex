<template>
  <input :placeholder="msg" :value="modelValue" @input="updateValue" />
</template>

<script>
export default {
  props: { msg: String, modelValue: String },
  setup(props, context) {
    const updateValue = (event) => {
      context.emit("update:modelValue", event.target.value);
    };
    return { props, updateValue };
  },
};
</script>
