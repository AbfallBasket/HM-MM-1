<template>
    <el-checkbox :label="label" class="myAdio">
        <span>{{label}}</span>
        <el-input :value="text" @input="v => $emit('checkInput',v)"></el-input>

        <el-upload
                class="avatar-uploader"
                :action="activeImg"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

    </el-checkbox>
</template>

<script>
    export default {
        name: "myCheck",
        props:['label','text','image'],
        data(){
            return{
                // 保存图片路径
                imageUrl:process.env.VUE_APP_BASEURL + this.image,
                // 提交图片的 地址
                activeImg: process.env.VUE_APP_BASEURL + '/question/upload',
            }
        },
        methods:{
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                console.log(res);
                this.$emit('checkImg',res.data.url);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }

        }
    }
</script>

<style lang="less">

    .myAdio{
        .el-checkbox__label{
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

</style>

