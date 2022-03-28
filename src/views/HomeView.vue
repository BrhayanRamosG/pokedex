<template>
  <div class="grid gap-2 grid-cols-1 md:grid-cols-2 xl:mx-10">
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
        <btn-range
          :class="[
            !character.statePrevious
              ? 'bg-gray-400'
              : 'bg-gray-700 hover:bg-gray-600',
            'inline-flex items-center justify-center w-[5rem] h-[4rem] rounded-lg py-2 ml-auto mr-2 text-lg border-x-4 border-y-4 border-gray-900',
          ]"
          @action="searchPrevious"
          :disabled="!character.statePrevious && true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="block h-20 w-full text-yellow-300"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </btn-range>
        <btn-range
          :class="[
            'bg-gray-700 hover:bg-gray-600',
            'inline-flex items-center justify-center w-[5rem] h-[4rem] rounded-lg py-2 ml-0 mr-0 text-lg border-x-4 border-y-4 border-gray-900',
          ]"
          @action="searchNext"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="block h-20 w-full text-yellow-300"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </btn-range>
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
import { reactive, onMounted } from "vue";
import useGetAPI from "@/hooks/useGetAPI.js";
import BtnSearch from "@/components/BtnSearch.vue";
import BtnRange from "@/components/BtnRange.vue";
import MsgState from "@/components/MsgState.vue";
import InputSearch from "@/components/InputSearch.vue";
import StructurePokedex from "@/components/StructurePokedex.vue";
import ScreenPokedex from "@/components/ScreenPokedex.vue";
import ScreenInformation from "@/components/ScreenInformation.vue";

export default {
  components: {
    StructurePokedex,
    BtnSearch,
    BtnRange,
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
      statePrevious: false,
      limit: 1,
      offset: 0,
    });

    onMounted(async () => {
      const { data } = await useGetAPI("1");
      character.data = data;
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
        }, 2400);
      } else {
        console.log(data);
        character.data = data;
        character.offset = data.id - 1;
        character.name = "";
        setStateBtnPrevious(data.id);
      }
    };

    const searchPrevious = async () => {
      if (character.offset > 0) {
        character.offset -= 1;
        const {
          data: { results },
        } = await useGetAPI(undefined, character);
        const { data } = await useGetAPI(results[0].name);
        character.data = data;
        setStateBtnPrevious(data.id);
      }
    };

    const setStateBtnPrevious = (id) => {
      if (id > 1) {
        character.statePrevious = true;
      } else {
        character.statePrevious = false;
      }
    };

    const searchNext = async () => {
      character.offset += 1;
      const {
        data: { results },
      } = await useGetAPI(undefined, character);
      const { data } = await useGetAPI(results[0].name);
      character.data = data;
      setStateBtnPrevious(data.id);
    };

    const clear = () => {
      character.stateFail = false;
      character.name = "";
    };

    return { character, searchIdOrName, searchPrevious, searchNext, clear };
  },
};
</script>
