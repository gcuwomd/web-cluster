<template>
  <div
    class="container"
    style="
      display: flex;
      justify-content: center;
      height: 400px;
      margin-top: 80px;
    "
  >
    <div ref="hiss"></div>
  </div>
</template>

<script lang="ts" setup>
import { Column } from "@antv/g2plot";
import { departmentData } from "../../api/statistics";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

    const hiss = ref();
    interface Department {
      type: string;
      value: number;
    }
    
    let arr: Department[] = [];
    // const data = [
    //   { type: "网站运维部", value: 4 },
    //   { type: "信息化运维部", value: 2 },
    //   { type: "行政秘书部", value: 2 },
    //   { type: "网络运维部", value: 2 },
    // ];
    onMounted(async () => {
 try {
   arr = (await departmentData()).data.data.department;
   initChart();}
 catch (error) {
   console.error(error);
 }
});
    let initChart = () => {
      let data=arr;
      const Hisplot = new Column(hiss.value, {
        width: 500,
        data,
        padding: "auto",
        xField: "type",
        yField: "value",
        color: ["#6294fa", "#63daab", "#657798", "#f7c122"],
        seriesField: "type",
        legend: { position:"top"},
        meta: {
          type: {
            alias: "部门",
          },
          value: {
            alias: "人数",
          },
        },
      });
      Hisplot.render();
    };
</script>
