<template>
  <div
    class="flex flex-row gap-2 items-center bg-amber-200 px-2 py-2 mx-10 mt-10 border-x-[1.5rem] border-y-[1.8rem] border-green-600 rounded-md"
  >
    <div class="flex flex-col m-auto items-center mb-5">
      <img
        class="bg-amber-100 w-40 rounded-full h-40 object-center object-cover sm:w-60 sm:h-60"
        :src="data?.data?.sprites.front_default"
        :alt="data?.data?.name"
        v-if="data?.data"
      />
      <div
        v-else
        class="bg-rose-500 w-40 rounded-full h-40 object-center object-cover sm:w-60 sm:h-60"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-40 rounded-full h-40 object-center object-cover sm:w-60 sm:h-60"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <p
        v-if="data.data"
        class="w-full text-center text-slate-700 font-bold text-xl uppercase"
      >
        <strong>#{{ data?.data?.id }}</strong>
        {{ data?.data?.name }}
      </p>
      <p class="text-center text-gray-700 font-bold" v-if="data.name">
        Buscar Pokémon {{ data?.name }}
      </p>
      <msg-state
        class="text-center text-red-700 font-bold"
        msg="Al parecer este pokémon no existe"
        v-if="data?.stateFail"
      />
    </div>
  </div>
</template>
<script>
import MsgState from "@/components/MsgState.vue";

export default {
  name: "ScreenPokedex",
  components: {
    MsgState,
  },
  props: {
    data: Object,
  },
  setup(props) {
    return { props };
  },
};
</script>
