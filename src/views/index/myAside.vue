<template>
    <div id="myAside">
        <el-menu
                class="el-menu-vertical-demo"
                :collapse="isCollapse"
                :router="true"
                default-active="/index/chart"
        >
            <template v-for="(item,index) in child">
                <el-menu-item :key="index" :index="item.meta.fullpath"
                v-if="item.meta.roles.includes($store.state.role)"
                >
                    <i :class="item.meta.icon"></i>
                    <span slot="title">
                        {{item.meta.title}}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>


    import child from '@/router/childrenRouter';

    export default {
        name: 'myAside',
        data() {
            return {
                isCollapse: true,
                child: child,
            }
        },
        methods: {}
    }
</script>

<style scoped lang="less">
    #myAside {
        text-align: left;
        .is-active {
            /*color: #000;*/
        }
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }


</style>