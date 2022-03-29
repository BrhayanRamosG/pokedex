<template>
  <div class="flex flex-col justify-center sm:flex-row px-4">
    <input
      class="text-gray-700 border-x-2 border-y-2 border-amber-200 focus:ring-amber-400 focus:border-amber-500 rounded-md"
      type="text"
      placeholder="Limit"
      v-model="character.limit"
    />
    <input
      class="text-gray-700 border-x-2 border-y-2 border-amber-200 focus:ring-amber-400 focus:border-amber-500 sm:ml-2 sm:mr-2 rounded-md mt-2 sm:mt-0"
      type="text"
      placeholder="Offset"
      v-model="character.offset"
    />
    <button
      :class="[
        !character.stateRange
          ? 'bg-gray-400 text-gray-100'
          : 'bg-green-600 hover:bg-green-700',
        ' text-lg rounded-md px-5 py-2 mt-2 sm:mt-0',
      ]"
      @click="search"
      :disabled="!character.stateRange"
    >
      Buscar
    </button>
  </div>

  <div
    v-if="totalPokemon > 0"
    class="bg-red-500 px-5 py-5 mx-3 my-3 rounded-md"
  >
    <div
      class="max-w-2xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <h2 class="text-2xl font-extrabold tracking-tight text-gray-100">
        Lista de Pokémon ({{ totalPokemon }})
      </h2>
      <div
        class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
      >
        <card-pokemon
          v-for="(value, index) in character.information"
          :key="index"
          :data="value"
          :index="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onUpdated, computed, watchEffect } from "vue";
import useGetAPI from "@/hooks/useGetAPI.js";
import CardPokemon from "@/components/CardPokemon.vue";
export default {
  components: { CardPokemon },
  setup() {
    document.title = `Lista Pokémon | Pokédex BRG`;
    const initialState = {
      information: [],
      names: [],
      stateRange: false,
      stateInformation: false,
      stateData: false,
      limit: "",
      offset: "0",
    };
    const character = reactive({ ...initialState });

    onUpdated(() => {
      if (character.limit === "") {
        character.stateRange = false;
      } else {
        character.stateRange = true;
        character.stateData = false;
      }
      if (character.information.length > 0 && !character.stateData) {
        character.information = [];
      }
    });

    watchEffect(() => {
      character.information.sort((a, b) => a.id - b.id);
    });

    const totalPokemon = computed(() => {
      return character.information.length;
    });

    const searchPokemon = async () => {
      const {
        data: { results },
        fail,
      } = await useGetAPI(undefined, character);
      if (fail) character.stateInformation = true;
      character.names = results;
    };

    const getInfoPokemon = async () => {
      character.names.forEach(async (element) => {
        const { data } = await useGetAPI(element.name);
        character.information.push(data);
      });
      character.stateData = true;
    };

    const search = async () => {
      if (!character.stateRange) {
        return;
      }
      await searchPokemon();
      await getInfoPokemon();
      character.limit = "";
    };

    return { character, search, totalPokemon };
  },
};
</script>
