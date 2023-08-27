<script setup lang="ts">
import { ref, onMounted } from "vue";
import { nopass } from "../../api/noPass"
<<<<<<< HEAD
/* import { subNext } from "../../api/submitNext" */
=======
>>>>>>> 190d29993caf89b98735d40d740eda0cbf23bbff
import { ElTable, ElMessage } from 'element-plus'
import { changepass } from "../../api/status"
import { admin } from "../../api/admin"
const tableData = ref<any[]>([]);
const total = ref(100);
const table = ref<InstanceType<typeof ElTable>>()
//未通过人员信息
const nopassPerson = async () => {
    let data = (await nopass()).data.data
    tableData.value = data
    total.value = data.length
}

onMounted(async () => { await nopassPerson() })

const currentChange = (value: number) => {
    console.log(value);
};
const handleCheck = async (rowid: string) => {
    changepass(rowid, "1")
    const { message }: any = await changepass(rowid, "1")
    if (message === "success") {
        let data = (await admin()).data.data
        tableData.value = data
        total.value = data.length
        ElMessage.success("修改成功！")
    }
}
/* const submitnext = async (id:number) =>{
    console.log(id)
    subNext(id)
    const {message}:any = await subNext(id)
    if (message === "success") {
        alert("提交成功")
    }
} */
</script>
<template>
    <div class="container">
        <el-button size="small" plain disabled>发送请求</el-button>
        <div style="margin-top: 10px">
            <el-table ref="table" :data="tableData" style="width: 100%">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="Order" width="80">
                    <template #default="scope">
                        <span>{{ scope.$index + 1 }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="image" label="Image" align="center">
                    <template #default="scope">
                        <div v-for="(val, index) in scope.row.image" :key="index">
                            <div class="block text-center">
                                <el-carousel height="70px" :autoplay="false" indicator-position="outside">
                                    <el-carousel-item v-for="index in 4" :key="index">
                                        <el-image style="width: 70px; height: 70px;" :src="val" alt=""></el-image>
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="college" label="College" />
                <el-table-column prop="id" label="Id" />
                <el-table-column label="Volunteer">
                    <template #default="scope">
                        <div v-for="(val, index) in scope.row.volunteer" :key="index">
                            <div>{{ val + '\n' }}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="gender" label="Gender" width="80" />
                <el-table-column prop="major" label="Major" />
                <el-table-column prop="introduction" label="Introduction">
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
                <el-table-column label="button">
                    <template #default="scope">
                        <el-button size="small" plain @click="handleCheck(scope.row.id)">通过</el-button>
                    </template>
                </el-table-column>
<<<<<<< HEAD
                <!-- <el-table-column label="operation">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click="submitnext(scope.row.id)">提交给下个部门</el-button>
                    </template>
                </el-table-column> -->
=======
>>>>>>> 190d29993caf89b98735d40d740eda0cbf23bbff
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