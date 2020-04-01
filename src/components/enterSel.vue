<template>
    <el-select :value="value"
               @input="v => {$emit('input',v)}"
               placeholder="请选择企业">
        <el-option v-if="isQuery"
                   label="所有企业"
                   value="">
        </el-option>
        <el-option
                v-for="(item, index) in enterpriseList"
                :key="index"
                :label="item.name"
                :value="item.id"
        ></el-option>
    </el-select>
</template>

<script>
    // 导入企业 信息查询 接口

    import {getEnterprise} from "@/api/enterprise";

    export default {
        name: 'enterSel',
        props: {
            value: {
                type: [String, Number]
            },
            isQuery: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                // 企业数据
                enterpriseList: [],
                // 内部选中的值
                // selfEnterprise: this.value
            };
        },
        created() {
            // 获取企业数据
            getEnterprise().then(res => {
                this.enterpriseList = res.data.data.items;
            });
        },
        // 侦听器
        // watch: {
        //     selfEnterprise() {
        //         this.$emit('input', this.selfEnterprise);
        //     }
        // }
    };
</script>

<style></style>


