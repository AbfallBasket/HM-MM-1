<template>

    <div id="index">
        <el-container>
            <el-header class="sonHead">
                <div class="leftBox">
                    <i class="el-icon-s-fold" @click="collapse"></i>
                    <img src="../../assets/index_logo.png" alt="">
                    <span>黑马妈妈</span>
                </div>
                <div class="rightBox">
                    <img :src="imgUrl" alt="">
                    <div class="boxSon">
                        <span>{{userName}},您好</span>
                        <el-button class="loginOut" type="primary" @click="logout" round size="small">
                            退出
                        </el-button>
                    </div>

                </div>
            </el-header>

            <el-container class="fatherBox">

                <el-aside width="auto">

                    <!-- 左侧导航栏-->

                    <myAside ref="myAside">

                    </myAside>
                </el-aside>

                <el-main class='sonMain'>
                    <!-- 中间显示内容部分-->
                    <router-view>

                    </router-view>
                </el-main>

            </el-container>

        </el-container>
    </div>


</template>

<script>

    // 导入 index 的获取用户信息
    import {logout} from "@/api/index";

    // 导入操作 token
    import {removeToken} from "@/utils/myToken";

    // 导入子组件
    import myAside from './myAside';

    export default {
        name: "index",
        components:{
            myAside
        },
        data() {
            return {
                userName: '',
                imgUrl: '',
            }
        },
        methods: {
            collapse() {
                // 点击显示 隐藏 左侧列表
                this.$refs.myAside.isCollapse = !this.$refs.myAside.isCollapse;

            },
            logout() {
                //    弹出提示框
                this.$confirm('您确定要退出吗?',
                    '警告', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {

                    // 发送服务器退出登录请求
                    logout().then(res => {
                        console.log(res);

                        if (res.data.code == 200) {
                            //    确定退出后，
                            // 跳转到登录页
                            // 清除token
                            removeToken();

                            this.$router.push('/login');

                            this.$message({
                                type: 'success',
                                message: '退出成功'
                            });
                        }
                    }).catch(err => {

                        console.log(err);

                    });

                }).catch(() => {
                    // 点击取消退出后，显示弹框
                    this.$message({
                        type: 'info',
                        message: '取消退出'
                    })

                })
            }
        },
        mounted() {

            // 获取vuex 设置 的store中的保存的用户信息
            this.userName = this.$store.state.username;

            this.imgUrl = this.$store.state.imgUrl;

        }

    }
</script>

<style scoped lang="less">
    * {
        margin: 0;
        padding: 0;
    }

    html, body {
        height: 100%;
    }

    .fatherBox {
        height: 100%;

        .sonMain {
            background: #E9E9E9;
            width: 100%;
            /*overflow: hidden;*/
        }
    }

    #index {
        height: 100%;

        .sonHead {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .leftBox {
                height: 100%;
                line-height: 60px;
                i.el-icon-s-fold {
                    width: 24px;
                    height: 20px;
                    font-size: 24px;
                }
                span {
                    color: #49A1FF;
                    font-size: 24px;
                    margin-left: 15px;
                }
                img {
                    margin-left: 22px;
                    width: 33px;
                    height: 28px;
                    vertical-align: sub;
                }
            }
            .rightBox {
                line-height: 60px;
                height: 100%;
                display: flex;

                .boxSon {
                    line-height: 55px;
                    .loginOut {
                        order-radius: 4px;
                        border-radius: 4px;
                    }
                    span {
                        font-size: 14px;
                        font-weight: bold;
                        color: rgba(99, 99, 99, 1);
                        margin-right: 33px;
                    }

                }

                img {
                    margin: 9px 9px 0 0;
                    -webkit-border-radius: 50%;
                    -moz-border-radius: 50%;
                    border-radius: 50%;
                    height: 43px;
                    width: 43px;
                    display: inline-block;
                }

            }
        }
    }

    .el-header {
        background-color: #FFFFFF;
        color: #333;
        text-align: center;
        box-shadow:-15px 0px 15px 5px #3F3F3F;

    }

    .el-aside {
        background-color: #FFFFFF;
        color: #333;
        text-align: center;
        height: 100%;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        height: 100%;
    }

    .el-container {
        height: 100%;
        /*box-shadow:-15px 15px 15px 5px #3F3F3F;*/

    }

    body > .el-container {
        margin-bottom: 40px;
    }

</style>