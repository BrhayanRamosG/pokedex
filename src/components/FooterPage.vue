<template>
  <footer class="bg-sky-600 mt-auto">
    <div class="px-2 py-2 text-center">
      <p>{{ year }} | Pok&eacute;dex BRG</p>
    </div>
  </footer>
</template>
<script>
export default {
  setup() {
    const year = new Date().getFullYear();
    return { year };
  },
};
</script>
