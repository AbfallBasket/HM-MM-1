<template>
    <div class="myTabl">
        <el-dialog :title="isEdit == false ? '新增题库'  : '编辑题库'" :visible.sync="dialogFormVisible"
                   :fullscreen="true"

        >
            <el-form ref="form"
                     :model="form"
                     label-width="80px"
                     :rules="rules"
                     :hide-required-asterisk="true">

                <el-form-item label="学科" prop="subject">
                    <subSelCom :value="form.subject" @input="val => (form.subject = val)">
                    </subSelCom>
                    {{form.subject}}
                </el-form-item>

                <el-form-item label="阶段" prop="step">
                    <el-select class="normal" v-model="form.step" placeholder="请选择阶段">
                        <el-option label="请选择"
                                   value=""></el-option>
                        <el-option label="初级"
                                   :value="1"></el-option>
                        <el-option label="中级"
                                   :value="2"></el-option>
                        <el-option label="高级"
                                   :value="3"></el-option>
                    </el-select>
                    {{form.step}}
                </el-form-item>

                <el-form-item label="企业" prop="enterprise">
                    <enterCom :value="form.enterprise" @input="val => (form.enterprise = val)">
                    </enterCom>
                    {{form.enterprise}}
                </el-form-item>

                <el-form-item label="城市" prop="city">

                    <myCity :value="form.city" @input="val => (form.city = val)">

                    </myCity>
                    {{form.city}}
                </el-form-item>

                <el-form-item label="题型" prop="type">
                    <el-radio-group v-model="form.type">
                        <el-radio :label="1">单选</el-radio>
                        <el-radio :label="2">多选</el-radio>
                        <el-radio :label="3">简答</el-radio>
                    </el-radio-group>
                    {{form.type}}
                </el-form-item>

                <el-form-item label="难度" prop="difficulty">
                    <el-radio-group v-model="form.difficulty">
                        <el-radio :label="1">简单</el-radio>
                        <el-radio :label="2">一般</el-radio>
                        <el-radio :label="3">困难</el-radio>
                    </el-radio-group>
                    {{form.difficulty}}
                </el-form-item>

                <!-- 分割线-->
                <el-divider>
                    我是分割线
                </el-divider>


                <el-form-item label="试题标题" prop="title">
                    {{form.title}}
                    <br>
                    <br>
                    <quill-editor @change="titleChange($event)" :content="form.title"
                    >
                    </quill-editor>
                </el-form-item>

                <!--单选的 -->
                <el-form-item label="单选" v-if="form.type == 1" prop="single_select_answer">
                    {{form.select_options}}
                    <el-radio-group v-model="form.single_select_answer">
                        <myRadio
                                v-for="(item,index) in form.select_options" :key="index"
                                :label="item.label"
                                :text="item.text"
                                :image="item.image"

                                @changeText="v =>item.text = v"
                                @changeImg="v=>item.image =v"
                        >
                        </myRadio>
                    </el-radio-group>
                </el-form-item>

                <!-- 多选 的 -->
                <el-form-item label="多选" v-if="form.type == 2" prop="multiple_select_answer">
                    <br>
                    <!-- 多选框 -->
                    {{form.multiple_select_answer}}
                    <el-checkbox-group
                            v-model="form.multiple_select_answer">
                        <myCheck
                                v-for="(item,index) in form.select_options"
                                :key="index"

                                :label="item.label"
                                :text="item.text"
                                :image="item.image"

                                @checkInput="v => {item.text = v}"
                                @checkImg="v => {item.image = v}"></myCheck>
                    </el-checkbox-group>
                </el-form-item>

                <!--简答 的 选项-->
                <el-form-item label="简答" v-if="form.type == 3" prop="short_answer">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.short_answer">

                    </el-input>
                </el-form-item>

                <!-- 分割线-->
                <el-divider>
                </el-divider>

                <el-form-item label="解析视频" prop="video">
                    <myVideo v-model="form.video"></myVideo>
                    {{form.video}}
                </el-form-item>

                <!-- 分割线-->
                <el-divider>
                </el-divider>


                <el-form-item label="答案解析" prop="answer_analyze">
                    {{form.answer_analyze}}
                    <br>
                    <br>
                    <quill-editor :content="form.answer_analyze" @change="answerChange($event)"
                    >
                    </quill-editor>

                </el-form-item>

                <!-- 分割线-->
                <el-divider>
                </el-divider>


                <el-form-item label="试题备注" prop="remark">
                    {{form.remark}}
                    <el-input style="width:90%; margin-left:80px;" type="textarea" :rows="2" v-model="form.remark">
                    </el-input>
                </el-form-item>


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="clearForm">
                    取 消
                </el-button>
                <el-button type="primary"
                           @click="onSubmit"
                >
                    确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>


    import {apiAddQues,apiEditQues} from "@/api/question";

    import myRadio from './myRadio';
    import myCheck from './myCheck';

    import myVideo from './myVideo';

    export default {
        name: "questionAdd",
        components: {
            myCheck,
            myRadio,
            myVideo
        },
        data() {
            return {

                isEdit:false,

                msg: '',

                dialogFormVisible: false,
                form: {
                    title: '', //标题
                    step: '', //阶段1、初级 2、中级 3、高级
                    enterprise: '', //企业id标识
                    subject: '', //学科id标识
                    city: [], //	[省、市、区县]
                    type: 1,//题型 1单选 、2多选 、3简答
                    difficulty: 1,//	题目难度 1简单 、2一般 、3困难
                    short_answer: '', //简答题答案
                    single_select_answer: '',//单选题答案
                    multiple_select_answer: [],//	多选题答案
                    remark: '',//答案备注
                    answer_analyze: '', //答案解析
                    video: '',//解析视频地址
                    select_options: [
                        {
                            "label": "A",
                            "text": "狗不理",
                            "image": ""
                        },
                        {
                            "label": "B",
                            "text": "猫不理",
                            "image": "upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg"
                        },
                        {
                            "label": "C",
                            "text": "麻花",
                            "image": "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
                        },
                        {
                            "label": "D",
                            "text": "炸酱面",
                            "image": "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
                        }
                    ]//选项，介绍，图片介绍

                },
                rules: {
                    subject: [
                        {required: true, message: '请选择学科!', trigger: 'blur'},
                    ],
                }
            }
        },
        methods: {
            answerChange(e) {
                this.form.answer_analyze = e.text;
            },
            titleChange(e) {
                //    title富文本改变
                console.log(e);
                // 富文本改变就 把值 赋值到form表单
                this.form.title = e.text;
            },
            clearForm() {
                // 取消后，清空表单
                this.dialogFormVisible = false;
                this.$refs.form.resetFields();
            },
            onSubmit() {
                //    点击提交表单,数据
                console.log(this.form);

                this.$refs.form.validate((valid) =>{
                    if(valid){
                        if(this.isEdit){
                        //    编辑
                            apiEditQues(this.form).then(res=>{
                                if(res.data.code == 200){
                                    console.log(res);
                                    //提示成功
                                    this.$message.success('编辑题库成功!');
                                    //    关闭面板
                                    this.dialogFormVisible = false;
                                    this.$parent.total = 1;

                                    //重新加载数据
                                    this.$parent.getQuestion();

                                }else{
                                  this.$message.error(res.data.messsage);
                                }
                            }).catch(err => {
                                console.log(err);
                            })

                        }else{
                            // 添加
                            apiAddQues(this.form).then(res => {
                                console.log(res);
                                if(res.data.code == 200){
                                    console.log(res);
                                    //提示成功
                                    this.$message.success('新增题库成功!');
                                    //    关闭面板
                                    this.dialogFormVisible = false;
                                    this.$parent.total = 1;

                                    //重新加载数据
                                    this.$parent.getQuestion();
                                }else{
                                    console.log(res);
                                }
                            }).catch(err => {
                                console.log(err);
                            })
                        }
                    }
                });
            }
        }
    }
</script>

<style lang="less">
    /*scoped*/
    .myTabl {
        width: 60%;

        .el-dialog__body {
            margin: 0 auto;
            text-align: center;
            width: 832px;
            display: block;
            /*justify-content: center;*/
            /*align-items: center;*/
        }

        .el-form {
            display: block;
            .el-select {
                /*display: block;*/
            }
            .el-upload__tip {
                margin-left: 80px;
            }

            .el-divider--horizontal {
                margin: 40px 0;
            }

            .el-divider {
                background: #AAAAAA;
            }
            .myAdio {
                display: flex;
                align-items: center;
                margin-bottom: 45px;

                .el-input__inner {
                    margin: 0 15px 0 15px;
                    width: 476px;
                    height: 40px;
                }

                .avatar-uploader {
                    margin: 0 auto;
                    display: flex;
                    justify-content: center;
                    .el-upload {
                        margin: 0 auto;
                        border: 1px dashed #d9d9d9;
                        border-radius: 6px;
                        cursor: pointer;
                        position: relative;
                        overflow: hidden;
                    }
                    .el-upload:hover {
                        border-color: #409EFF;
                    }
                }
                .avatar-uploader-icon {
                    font-size: 28px;
                    color: #8c939d;
                    width: 178px;
                    height: 178px;
                    line-height: 178px;
                    text-align: center;
                }
                .avatar {
                    width: 178px;
                    height: 178px;
                    display: block;
                }

            }

        }

        .el-form-item__label {
            text-align: left;
        }
        .el-form-item__content {
            margin-left: 0 !important;
            text-align: left;
            /*width: 364px;*/
            /*height: 40px;*/
        }
        .el-input__inner {
            width: 364px;
            height: 40px;
        }
    }

    .el-dialog__footer {
        text-align: center !important;
    }

    /*.el-dialog__header {*/
    /*.el-dialog__title {*/
    /*!*padding-left: 25px;*!*/

    /*}*/
    /*!*text-align: left;*!*/
    /*}*/


</style>