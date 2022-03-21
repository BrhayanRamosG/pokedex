<template>
  <div class="grid grid-cols-1">
    <moves-pokemon :data="dataPokemon" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useGetAPI from "@/hooks/useGetAPI.js";
import { useRoute } from "vue-router";
import MovesPokemon from "@/components/MovesPokemon.vue";

export default {
  components: {
    MovesPokemon,
  },

  setup() {
    document.title = `Movimientos | Pokédex BRG`;
    const route = useRoute();
    const dataPokemon = ref();

    onMounted(async () => {
      const { data, fail } = await useGetAPI(route.params.pokemon);
      if (fail) dataPokemon.value = { fail };
      else dataPokemon.value = data;
    });

    return {
      dataPokemon,
    };
  },
};
</script>
