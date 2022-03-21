<template>
  <div class="px-4">
    <input
      class="text-gray-700 rounded-md"
      type="text"
      placeholder="Limit"
      v-model="character.limit"
    />
    <input
      class="text-gray-700 sm:ml-2 sm:mr-2 rounded-md"
      type="text"
      placeholder="Offset"
      v-model="character.offset"
    />
    <button
      class="bg-green-600 hover:bg-green-500 rounded-md px-2 py-2"
      @click="search"
    >
      Buscar
    </button>
  </div>
  <card-pokemon :data="character?.information" :image="character?.img" />
</template>
<script>
import { reactive, onUpdated } from "vue";
import useGetAPI from "@/hooks/useGetAPI.js";
import CardPokemon from "@/components/CardPokemon.vue";
export default {
  components: { CardPokemon },
  setup() {
    document.title = `Lista Pokémons | Pokédex BRG`;

    const character = reactive({
      information: undefined,
      stateRange: false,
      stateInformation: false,
      limit: "",
      offset: "",
      img: "",
    });
    onUpdated(() => {
      if (character.limit === "" && character.offset === "") {
        character.stateRange = false;
      } else {
        character.stateRange = true;
      }
    });

    const search = async () => {
      if (!character.stateRange) {
        return;
      }
      const { data, fail } = await useGetAPI(undefined, character);
      if (fail) character.stateInformation = true;
      else character.information = data;
    };

    const clear = () => {
      character.information = undefined;
      character.stateInformation = false;
    };

    return { character, search, clear };
  },
};
</script>
