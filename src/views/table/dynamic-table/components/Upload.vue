<template>
    <el-upload v-show="showUpload" :limit="limit" :multiple="multiple" action="http://20.210.204.94/api/upload" accept="image/*"
        :on-change="uploadFile" list-type="picture-card" :auto-upload="false" :file-list="filelist"
        :on-exceed="handleExceed"  :on-remove="handleRemove" :handlerUploadRemove="handlerUploadRemove" :handlerUploadRemoveOne="handlerUploadRemoveMany" ref="upload"
        class="avatar-uploader" :disabled="disabled">
        <i class="el-icon-plus"></i>
    </el-upload>
</template>
  
<script>
//引入上传图片接口
// import { uploadImg } from "@/api/public/api";
import { useStore } from '@/store'
export default {
    props: {
        limit: Number,
        type: {
            type: String,
            default: ''
        },
        filelist: {
            type: Array,
            default: []
        },
        disabled: Boolean,
        handlerUploadOne: {
            type: Function,
            default: () => {}
        },
        handlerUploadMany: {
            type: Function,
            default: () => {}
        },
        handlerUploadRemoveOne: {
            type: Function,
            default: () => {}
        },
        handlerUploadRemoveMany: {
            type: Function,
            default: () => {}
        },
        multiple: Boolean
    },
    data() {
        return {
            showUpload: true, //控制limit最大值之后 关闭上传按钮
        };
    },
    //监听上传图片的数组(为了处理修改时,自动渲染问题,和上传按钮消失问题);
    watch: {
        fileList(newName, oldName) {
            // if (newName.length == this.limit) this.showUpload = true;
            // else this.showUpload = false;
        },
    }, 
    onMounted() {
    },
    methods: {
        //文件列表移除文件时的函数
        handleRemove(file, filelists = []) {
            console.log({ file,filelists});
            // const index = this.filelists?.findIndex((item) => item === file.url);
            // this.handlerUploadRemoveOne(file.name || file.filename)
            // this.handlerUploadRemoveMany(file.name || file.filename)
            this.handlerUploadRemoveOne(this.$props.type)
            this.handlerUploadRemoveMany(filelists)
        },
        //文件状态改变时的函数(主要逻辑函数)
        uploadFile(e, fileList) {
            //判断用户上传最大数量限制,来让上传按钮消失
            if (fileList.length >= this.limit) this.showUpload = true;
            // const file = e.file; <- 这里是不需要直接上传而是通过按钮上传的
            const file = e.raw; // <- 这里是直接上传的
            //大小
            const size = file.size / 1024 / 1024 / 2;
            if (
                !(
                    file.type === "image/png" ||
                    file.type === "image/gif" ||
                    file.type === "image/jpg" ||
                    file.type === "image/jpeg"
                )
            ) {
                this.$notify.warning({
                    title: "警告",
                    message:
                        "请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片",
                });
            } else if (size > 2) {
                this.$notify.warning({
                    title: "警告",
                    message: "图片大小必须小于2M",
                });
            } else {
                if (this.limit == 1) this.imgUrl = []; //此处判断为一张的时候需要清空数组
                const params = new FormData();
                console.log(params);
                params.append("file", file);
                const token = useStore().state.user.token
                fetch('https://www.oppenheim.co.jp/upload', {
                    method: 'POST',
                    body: params,
                    headers: {
                        
                        Authorization: 'Bearer ' + token
                    }
                }).then(r => r.json()).then(res => {
                    if (res.msg === "success") {
                        this.$message.success("上传成功");
                        this.handlerUploadOne(res.data)
                        this.handlerUploadMany(res.data)
                        console.log({ooo:this.fileList,ll:this.limit});
                    } else {
                        this.$message.error("上传失败");
                    }
                })
            }
        },
        //文件超出个数限制时的函数
        handleExceed(files, fileList) {
            this.$message.info(`最多只允许上传${this.limit}张图片`);
        },
    },
};
</script>

<style  scope>
.hide .el-upload--picture-card {
    display: none !important;
}

.avatar-uploader>.el-upload {
    width: 200px;
    height: 200px;
    line-height: 200px;
    border-radius: 0px;
    background: #fff;
    border: 1px dashed #ccc;
}

.avatar-uploader>.el-upload>i {
    font-size: 28px;
    color: #ccc;
}

.avatar-uploader>.el-upload-list {
    display: flex;
    flex-wrap: wrap;
}

.avatar-uploader>.el-upload-list>.el-upload-list__item {
    width: 200px;
    height: 200px;
    margin-right: 10px;
}

.avatar-uploader>.el-upload-list>.el-upload-list__item>img {
    width: 200px;
    height: 200px;
    border-radius: 0px;
}

.el-upload-list--picture-card .el-upload-list__item-actions:hover .el-upload-list__item-preview {
    display: none;
}
</style>
  