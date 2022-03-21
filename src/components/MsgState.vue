<template>
  <span>{{ msg }}</span>
</template>
<script>
export default {
  props: {
    msg: String,
  },
  setup(props) {
    return { props };
  },
};
</script>
