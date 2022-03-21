<template>
  <div class="bg-red-500 px-5 py-5 mx-3 my-3 rounded-md">
    <div
      class="max-w-2xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <h2 class="text-2xl font-extrabold tracking-tight text-gray-100">
        Lista de Pokémons
      </h2>

      <div
        class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
      >
        <div
          v-for="(value, index) in data?.results"
          :key="index"
          class="group relative bg-yellow-200"
        >
          <div class="ml-4 mt-4 flex justify-start">
            <div>
              <h3 class="capitalize text-lg text-gray-700">
                <strong class="text-gray-700">{{ index + 1 }} -</strong>
                <a href="#">
                  <span aria-hidden="true" class="absolute inset-0" />
                  {{ value.name }}
                </a>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
  setup(props) {
    return {
      props,
    };
  },
};
</script>
