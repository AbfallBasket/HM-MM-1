<template>


    <div id="index">
        <el-container>
            <el-header class="sonHead">
                <div class="leftBox">
                    <i class="el-icon-s-fold"></i>
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

                <el-aside width="200px">
                    Aside
                </el-aside>

                <el-main class='sonMain'>
                    Main
                </el-main>

            </el-container>

        </el-container>
    </div>


</template>

<script>

    // 导入 index 的获取用户信息
    import {getInfo} from "@/api/index";

    // 导入操作 token
    import {removeToken} from "@/utils/myToken";

    export default {
        name: "index",
        data() {
            return {
                userName: '',
                imgUrl: '',
            }
        },
        methods: {
            logout() {
                //    弹出提示框
                this.$confirm('您确定要退出吗?',
                    '警告', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {

                    //    确定退出后，
                    // 跳转到登录页
                    // 清除token
                    removeToken();
                    this.$router.push('/login');
                    this.$message({
                        type: 'success',
                        message: '退出成功'
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
        created() {
            getInfo().then(res => {


                this.userName = res.data.data.username;
                this.imgUrl = process.env.VUE_APP_BASEURL + '/' + res.data.data.avatar;
                console.log(res);


            }).catch(err => {
                console.log(err);
            })
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
                    .loginOut {order-radius: 4px;
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
                    height: 43px;
                    width: 43px;
                    display: inline-block;
                    padding: 9px 9px 0 0;
                }

            }
        }
    }

    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
    }

    .el-aside {
        background-color: #D3DCE6;
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

    }

    body > .el-container {
        margin-bottom: 40px;
    }

</style>