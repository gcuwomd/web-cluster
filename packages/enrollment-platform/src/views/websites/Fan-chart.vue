
<template>
  <div>
  <Suspense>
  <div class="container" style="display: flex; justify-content: center">
    <div v-if="isLoading" class="loading">Loading...</div>
    <div ref="pie" style="display: flex; width: 100%"></div>
  </div></Suspense></div>
</template>

<script setup lang="ts">
import { Pie } from "@antv/g2plot";
import { ref , onMounted} from "vue";
import { departmentData } from "../../api/Fan-chart";

    const pie = ref();
    const isLoading = ref(false);
    interface Department {
      type: string;
      value: number;
    }
    let arr: Department[] = [];


    onMounted(async () => {
  isLoading.value = true;
  try {
    arr = (await departmentData()).data.data.department;
    initChart();
  } catch (error) {
    console.error(error);
   
  } finally {
    isLoading.value = false;
  }
});

    
          console.log((await departmentData()).data.data.department);

      const initChart = () => { 
      const data = arr;
      const piePlot = new Pie(pie.value, {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: { style: { fontSize: 20 } },
    legend: {
      position: "top",
      marker: { style: { r: 10 } },
    },
    interactions: [{ type: "element-active" }],
  });

  piePlot.render();
  
  return {
    pie,
  };
};
    
</script>
