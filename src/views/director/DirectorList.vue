<template>
    <div class="director-list">
        <!-- 面包屑导航 -->
       <el-breadcrumb separator="/">
  <el-breadcrumb-item>首页</el-breadcrumb-item>
  <el-breadcrumb-item>导演管理</el-breadcrumb-item>
   <el-breadcrumb-item>导演列表</el-breadcrumb-item>
</el-breadcrumb>
<!-- 下划线 -->
  <el-divider></el-divider>
<!-- 表单 -->
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
  <el-form-item label="姓名">
    <el-input v-model="searchForm.directorName" placeholder="请输入导演姓名"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
  </el-form-item>
   </el-form>
   <!-- 下划线 -->
    <el-divider content-position="left">导演列表</el-divider>
    <!-- 导演列表 -->
    <div>
        <person-item v-for="item in directorList" :key="item.id"
        :id="item.id"
        :name="item.director_name"
        :avatar="item.director_avatar"
        @delete="onDelete(item.id)"></person-item>
    </div>
    </div>
</template>
 
<script>
import PersonItem from '@/components/PersonItem.vue';
    export default {
  components: { PersonItem },
        data() {
      return {
        directorList:[],

       searchForm: {
          directorName: '',
        }
      }
    },
    methods: {
        // 监听删除成功事件
        onDelete(id){
            // 发送http请求 实现删除业务
             this.$http.DirectorApi.delete({id:id}).then(res=>{
                console.log('删除导演',res);
                if(res.data.code==200){
                    this.$message.success('删除成功') 
                         this.loadDirectorList()            
                }
            }) 
         
        },
        // 点击查询执行
      onSubmit() {
        // 模糊查询
        if(!this.searchForm.directorName.trim()){
            // 如果填写空字符
            this.loadDirectorList() // 加载导演列表   
        }
        // 发送请求模糊查询导演列表
        let name=this.searchForm.directorName

        this.$http.DirectorApi.listByname({name}).then(res=>{
           console.log('模糊查询请求',res); 
           if(res.data.code==200){
            this.directorList=res.data.data
           }
        })
      },
// 加载导演列表
      loadDirectorList(){
      this.$http.DirectorApi.list({page:1,pagesize:100}).then(res=>{
            if(res.data.code=200){
                  this.directorList=res.data.data
            }
          
        })
    },
   
    },
    // 页面挂载完毕后
    mounted () {
        this.loadDirectorList();

    },
    }
</script>

<style lang="scss" scoped>
.director-item{
    display: inline-block;
    margin: 20px 20px 0 20px;
    text-align: center;
}
.director-item div{
    font-size: 0.9em;
}

</style>