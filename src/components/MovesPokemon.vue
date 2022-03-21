<template>
  <div class="bg-red-500 px-5 py-5 mx-3 my-3 rounded-md">
    <div v-if="!data?.fail">
      <div class="uppercase mb-5">
        <h2>
          Nombre: <strong class="text-amber-200">{{ data?.name }}</strong>
        </h2>
        <p>
          Total de movimientos:
          <strong class="text-amber-200">{{ data?.moves.length }}</strong>
        </p>
      </div>

      <div class="flex flex-col m-auto items-center mb-5">
        <div class="bg-amber-500 rounded-lg">
          <img
            class="bg-amber-200 w-40 rounded-full h-40 object-center object-cover sm:w-60 sm:h-60"
            :src="data?.sprites.front_default"
            :alt="data?.name"
            v-if="data"
          />
        </div>
      </div>
      <hr class="bg-amber-200 border-amber-200 border-2 mb-4" />
      <div class="columns-2 md:columns-4 xl:columns-6">
        <p v-for="(value, index) in data?.moves" :key="index">
          <strong class="text-amber-200">{{ index + 1 }} - </strong>
          <span class="capitalize">{{ value.move.name }}</span>
        </p>
      </div>
    </div>

    <div v-else-if="data?.fail" class="flex flex-col m-auto items-center">
      <h1 class="text-2xl uppercase font-bold">Pokémon no encontrado</h1>
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

    <div v-if="!data" class="flex flex-col m-auto items-center">
      <h1 class="text-2xl uppercase font-bold">
        Buscando Pokémon, espere ....
      </h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-40 rounded-full h-40 object-center object-cover sm:w-60 sm:h-60"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z" />
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
  setup(props) {
    return { props };
  },
};
</script>
