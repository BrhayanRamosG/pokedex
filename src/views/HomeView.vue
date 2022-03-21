<template>
  <div class="grid gap-2 grid-cols-1 md:grid-cols-2">
    <structure-pokedex class="bg-red-600 border-4 border-gray-100">
      <screen-pokedex :data="character" />
      <div class="flex flex-row m-auto items-center px-2 mt-5">
        <btn-search
          :class="[
            !character.name
              ? 'bg-gray-200 text-gray-700'
              : 'bg-amber-500 hover:bg-amber-400 ',
            'w-[6rem] h-[6rem] rounded-full px-10 py-2 ml-2 mr-2 text-lg border-x-4 border-y-4 border-amber-500',
          ]"
          @action="searchIdOrName"
          :disabled="character.name && false"
        />
      </div>
      <div class="flex flex-col md:flex-row gap-1 m-auto items-center mt-5">
        <div>
          <input-search
            class="ml-2 mr-2 rounded-xl text-lg h-[5rem] focus:placeholder:text-white focus:ring-lime-700 focus:bg-lime-600 focus:border-blue-200 text-black focus:text-white"
            msg="Buscar pokémon"
            type="text"
            v-model="character.name"
          />
          <br />
          <msg-state
            class="text-amber-200 ml-2"
            v-if="!character.name"
            msg="Campo requerido"
          />
        </div>
        <div v-if="character.name">
          <btn-search
            :class="[
              !character.name
                ? 'bg-gray-300 text-gray-700'
                : 'bg-gray-900 hover:bg-gray-500 ',
              'rounded-md px-10 py-2 ml-2 mr-2 text-lg',
            ]"
            msg="Limpiar"
            @action="clear"
            :disabled="character.name && false"
          />
        </div>
      </div>
    </structure-pokedex>

    <structure-pokedex class="bg-red-500 border-4 border-gray-100">
      <screen-information :data="character" />
    </structure-pokedex>
  </div>
</template>

<script>
import { reactive } from "vue";
import useGetAPI from "@/hooks/useGetAPI.js";
import BtnSearch from "@/components/BtnSearch.vue";
import MsgState from "@/components/MsgState.vue";
import InputSearch from "@/components/InputSearch.vue";
import StructurePokedex from "@/components/StructurePokedex.vue";
import ScreenPokedex from "@/components/ScreenPokedex.vue";
import ScreenInformation from "@/components/ScreenInformation.vue";

export default {
  components: {
    StructurePokedex,
    BtnSearch,
    MsgState,
    InputSearch,
    ScreenPokedex,
    ScreenInformation,
  },
  setup() {
    document.title = "Inicio | Pokédex BRG";
    const character = reactive({
      name: "",
      data: undefined,
      stateFail: false,
    });
    const searchIdOrName = async () => {
      if (character.name === "") {
        return;
      }
      const { data, fail } = await useGetAPI(
        character.name.toLocaleLowerCase()
      );
      if (fail) {
        character.stateFail = true;
        character.data = undefined;
        character.name = "";
        setTimeout(() => {
          character.stateFail = false;
        }, 3000);
      } else {
        character.data = data;
        character.name = "";
      }
    };

    const clear = () => {
      character.stateFail = false;
      character.name = "";
    };

    return { character, searchIdOrName, clear };
  },
};
</script>
