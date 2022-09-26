<template>
    <div class="director-list">
        <!-- 面包屑导航 -->
       <el-breadcrumb separator="/">
  <el-breadcrumb-item>首页</el-breadcrumb-item>
  <el-breadcrumb-item>导演管理</el-breadcrumb-item>
   <el-breadcrumb-item>新增导演</el-breadcrumb-item>
</el-breadcrumb>
   <!-- 下划线 -->
    <el-divider content-position="left">新增导演</el-divider>
<!-- 表单 -->
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="导演名称">
    <el-input v-model="form.directorName" style="width:300px;"></el-input>
  </el-form-item>
    <el-form-item label="导演头像">
   <el-upload
  class="avatar-uploader"
  action="http://localhost:9000/upload"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <el-image v-if="form.directorAvatar" :src="form.directorAvatar" class="avatar" fit="cover"/>
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form> 
</div>
</template>
<script>   
  export default {
    data() {
      return { 
        form: {
          directorName: '',
          directorAvatar: '',
           
        }
      }
    },
    methods: {
      onSubmit() {
        //发送http post请求 提交添加导演参数
      this.$http.DirectorApi.add(this.form).then(res=>{
        console.log('添加',res);
            if(res.data.code==200){
              this.$message.success('添加成功')
            this.$router.push('/home/director-list')}
                  })
      },

    //   处理上传成功后显示图片
      handleAvatarSuccess(res, file) {
        if(res.code==200){
            this.form.directorAvatar=res.data
        }
        this.imageUrl = URL.createObjectURL(file.raw);
      },
    //   上传照片时执行的业务
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

<style lang="scss" scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>