<template>
    <div>
        <el-upload class="upload-demo"
                   :action="moviePath"
                   :on-success="moveUp"
                   :before-upload="beforeUp"
        >
            <el-button size="small" type="primary">点击上传</el-button>
            <div
                    slot="tip"
                    class="el-upload__tip">
                只能上传视频文件!
            </div>
        </el-upload>

        <video style="width:300px;height:150px;"
               v-if="videoUrl"
               controls
               :src="videoUrl"
        >
        </video>
    </div>
</template>

<script>
    export default {
        name: "myVideo",
        props:['video'],
        data(){
            return{
                moviePath: process.env.VUE_APP_BASEURL + '/question/upload',
                videoUrl:''
            }
        },
        methods:{
            moveUp(res, file) {

                this.videoUrl = URL.createObjectURL(file.raw);

                this.$emit('input',res.data.url);
            },
            beforeUp(file) {
                console.log(file);

                const isMp4 = file.type === 'video/mp4';
                const isLt8M = file.size / 1024 /1024 <8;

                if(!isMp4){
                    this.$message.error('上传视频只能是mp4格式!');
                }
                if(!isLt8M){
                    this.$message.error('上传视频大小不能超过 8MB !');
                }

                return isMp4 && isLt8M;
            },
        }
    }
</script>

<style scoped>

</style>