<template>
  <button @click="actionBtn">
    {{ msg }}
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    msg: String,
  },
  setup(props, context) {
    const actionBtn = () => {
      context.emit("action");
    };
    return { props, actionBtn };
  },
};
</script>
