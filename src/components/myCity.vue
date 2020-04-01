<template>
    <el-cascader
            :props="{value:'label'}"
            :options="options"
            :value="value"
            @input="v => {$emit('input',v)}"
    placeholder="请选择城市">
    </el-cascader>
</template>

<script>
    import {regionDataPlus} from 'element-china-area-data';

    export default {
        name: "myCity",
        props:['value'],
        data(){
            return{
            //    保存城市数据
                options:regionDataPlus,
            }
        }
    }
</script>

<style scoped>

</style>