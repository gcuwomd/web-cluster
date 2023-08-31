<template>
  <div class="container" style= "display:flex; justify-content: center">
        <div ref="pie" style="display: flex; width: 100%"></div>  
  </div>
</template>

<script setup lang="ts">
import { Pie } from "@antv/g2plot";
import { ref , onMounted} from "vue";
import { departmentData } from "../../api/statistics";

    const pie = ref();
    interface Department {
      type: string;
      value: number;
    }
    let arr: Department[] = [];

    
    onMounted(async () => {

        try {
              arr = (await departmentData()).data.data.department;
              console.log((await departmentData()).data.data.department);
              initChart();
            } 
        catch (error) {
            }
});
      const initChart = () => { 
      const data = arr;
      console.log(data);
      const piePlot = new Pie(pie.value, {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.7,
    label: { style: { fontSize: 16 } },
    legend: {
      position: "top",
      marker: { style: { r: 10 } },
    },
    interactions: [{ type: "element-active" }],
  });

  piePlot.render();
  
};
    
</script>
