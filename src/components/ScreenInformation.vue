<template>
  <div
    :class="[
      !data.data && 'h-40',
      'flex flex-col gap-2 items-center bg-gray-900 px-2 py-2 mx-10 mt-10 border-x-[0.5rem] border-y-[0.5rem] border-gray-600 rounded-md',
    ]"
  >
    <div v-if="data.data">
      <div class="flex flex-col lg:flex-row m-auto items-center mb-5">
        <label class="text-lime-300 font-bold">{{
          data?.data?.types.length > 1 ? "Tipos:" : "Tipo:"
        }}</label>
        <span
          class="bg-sky-500 text-center text-base text-white ml-2 mt-2 xl:mt-0 rounded-md px-1 py-1 uppercase"
          v-for="(value, index) in data?.data?.types"
          :key="index"
        >
          {{ value.type.name }}
        </span>
      </div>

      <div class="flex flex-col xl:flex-row m-auto items-center mb-5">
        <label class="text-center text-lime-300 font-bold">Estadísticas:</label>
        <p
          class="text-center xl:ml-2 rounded-md py-1"
          v-for="(value, index) in data?.data?.stats"
          :key="index"
        >
          <span class="text-base text-yellow-400 uppercase"
            >{{ value.stat.name }} </span
          ><br />
          <span class="font-bold"> {{ value.base_stat }} </span>
        </p>
      </div>

      <div class="flex flex-col m-auto items-center mb-5">
        <RouterLink
          :to="`/movimientos/${data.data.name}`"
          class="text-center bg-lime-500 text-black font-bold px-2 py-2 rounded-md"
        >
          Ver Movimientos
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ScreenInformation",
  props: {
    data: Object,
  },
  setup(props) {
    return { props };
  },
};
</script>
