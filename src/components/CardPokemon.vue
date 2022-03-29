<template>
  <div class="group relative bg-amber-500 shadow-md">
    <div
      class="w-full min-h-80 bg-yellow-100 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none"
    >
      <img
        :src="data.sprites?.front_default"
        :alt="data.name"
        class="w-full h-full object-center object-cover lg:w-full lg:h-full"
      />
    </div>
    <div class="ml-4 mt-4 flex justify-start">
      <div>
        <h3 class="capitalize text-lg font-bold text-white">
          <strong class="text-gray-600">{{ index + 1 }} -</strong>
          <RouterLink :to="`/movimientos/${data.name}`">
            <span aria-hidden="true" class="absolute inset-0" />
            {{ data.name }}
          </RouterLink>
        </h3>
        <p class="mt-1 text-lg font-bold text-white">ID #{{ data.id }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
  components: { RouterLink },
  props: {
    data: Object,
    index: Number,
  },
  setup(props) {
    return {
      props,
    };
  },
};
</script>
