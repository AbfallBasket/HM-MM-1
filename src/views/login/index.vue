<template>
    <div class="login">
        <!-- 左侧 登录 盒子 box -->
        <div class="leftBox">
            
            <div class="title">
                <img class="titleImg" src="../../../src/assets/form_log.png" alt="">
                <span class="titleName">黑马妈妈</span>
                <span class="titleLine"></span>
                <span class="titleLogin">  用户登录</span>
            </div>


            <!-- element 的表单 子组件-->
            <router-view>

            </router-view>

        </div>

        <img src="../../../src/assets/login_banner_ele.png" alt="" class="rightImg">

    </div>
</template>

<script>



    export default {
        name: "index"
    }
</script>

<style scoped lang="less">



    .login {
        height: 100%;
        background: linear-gradient(225deg, rgba(20, 147, 250, 1), rgba(1, 198, 250, 1));
        display: flex;
        /* 设置 左右 间隔 相等*/
        justify-content: space-around;
        /* 上下 居中 */
        align-items: center;

        .leftBox {
            box-sizing: border-box;
            padding: 46px 42px 86px;
            width: 478px;
            height: 550px;
            background: rgba(245, 245, 245, 1);
        }

        .rightImg {
            float: right;
            height: 435px;
            width: 633px;
            user-select: none;
        }

        /* 表单标题部分*/
        .title {
            display: flex;
            align-items: center;

            .titleImg {
                vertical-align:middle
            }

            .titleName {
                padding: 0 14px 0 16px;
                font-size:24px;
                font-family:SourceHanSansCN;
                font-weight:400;
                color:rgba(12,12,12,1);
            }
            .titleLogin{
                padding: 0 14px 0 16px;
                font-size:22px;
                font-family:PingFangSC;
                font-weight:400;
                color:rgba(12,12,12,1);
            }

            .titleLine{
                display: inline-block;
                width:1px;
                height:28px;
                background:rgba(199,199,199,1);
            }

        }

    }






</style>