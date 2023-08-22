<script setup lang="ts">
import { ref, onMounted } from "vue";
import { willpass } from "../../api/willPass"
import { ElTable } from 'element-plus'
import { sendpass } from "../../api/send"
const tableData = ref<any[]>([]);
const total = ref(100);
const table = ref<InstanceType<typeof ElTable>>()
//通过人员信息
const willpassPerson = async () => {
    let data = (await willpass()).data.data
    tableData.value = data
    total.value = data.length
}

onMounted(async () => { await willpassPerson() })

const currentChange = (value: number) => {
    console.log(value);
};

const handleCheck = async () => {
    let getrow = table.value!.getSelectionRows()
    let arr: string[] = [];
    for (let index = 0; index < getrow.length; index++) {
        if(getrow[index].messageStatus===0){
            let getid: any =getrow[index].id
            arr.push(getid)
            await sendpass(arr, "face")
        }else{
            alert("你已经发过了！")
        }
    }
}
</script>
<template>
    <div class="container">
        <el-button size="small" plain @click="handleCheck()">发送请求</el-button>
        <div style="margin-top: 10px">
            <el-table ref="table" :data="tableData" style="width: 100%">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="Order">
                    <template #default="scope">
                        <span>{{ scope.$index + 1 }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="image" label="Image">
                    <template #default="scope">
                        <div v-for="(val, index) in scope.row.image" :key="index">
                            <el-image style="width: 70px; height: 70px" :src="val" alt=""></el-image>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="college" label="College" />
                <el-table-column prop="id" label="Id" />
                <el-table-column label="Volunteer" width="120">
                    <template #default="scope">
                        <div v-for="(val, index) in scope.row.volunteer" :key="index">
                            <div>{{ val + '\n' }}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="gender" label="Gender" />
                <el-table-column prop="major" label="Major" />
                <el-table-column prop="introduction" label="Introduction" width="120">
                    <template #default="scope">
                        <el-tooltip :content="scope.row.introduction" raw-content placement="top-start"
                            v-if="scope.row.introduction">
                            <span v-if="scope.row.introduction && scope.row.introduction.length <= 10">
                                {{ scope.row.introduction }}
                            </span>
                            <span v-if="scope.row.introduction && scope.row.introduction.length > 10">
                                {{ scope.row.introduction.substr(0, 10) + "..." }}
                            </span>
                        </el-tooltip>
                        <span v-else-if="scope.row.introduction == null"> NA </span>
                    </template>
                </el-table-column>
                <el-table-column prop="username" label="Name" width="80" />
            </el-table>
        </div>
        <el-pagination background layout="prev,pager,next" :total="total" @current-change="currentChange"
            class="pagination-center"></el-pagination>
    </div>
</template>
<style scoped>
.container {
    width: 100%;
}

.table {
    margin: 10px 0;
}

.input-with-select {
    width: 380px;
    margin-right: 20px;
}

.pagination-center {
    margin-top: 10px;
    justify-content: center;
    align-items: center;
}

:deep(table tr span.el-tooltip__trigger) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>