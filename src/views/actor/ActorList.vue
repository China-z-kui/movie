<template>
    <div class="actor-list">
        <!-- 面包屑导航 -->
       <el-breadcrumb separator="/">
  <el-breadcrumb-item>首页</el-breadcrumb-item>
  <el-breadcrumb-item>演员管理</el-breadcrumb-item>
   <el-breadcrumb-item>演员列表</el-breadcrumb-item>
</el-breadcrumb>
<!-- 下划线 -->
  <el-divider></el-divider>
<!-- 表单 -->
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
  <el-form-item label="姓名">
    <el-input v-model="searchForm.actorName" placeholder="请输入演员姓名"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
  </el-form-item>
   </el-form>
   <!-- 下划线 -->
    <el-divider content-position="left">演员列表</el-divider>
    <!-- 演员列表 -->
    <div>
        <person-item v-for="item in actorList" :key="item.id"
        :id="item.id"
        :name="item.actor_name"
        :avatar="item.actor_avatar"
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
        actorList:[],

       searchForm: {
          actorName: '',
        }
      }
    },
    methods: {
        // 监听删除成功事件
        onDelete(id){
            // 发送http请求 实现删除业务
             this.$http.ActorApi.delete({id:id}).then(res=>{
                console.log('删除演员',res);
                if(res.data.code==200){
                    this.$message.success('删除成功')   
                    this.loadActorList()              
                }
            }) 
          
        },


        // 点击查询执行
      onSubmit() {
        // 模糊查询
        if(!this.searchForm.actorName.trim()){
            // 如果填写空字符
            this.loadActorList() // 加载演员列表   
        }
        // 发送请求模糊查询演员列表
        let name=this.searchForm.actorName

        this.$http.ActorApi.listByname({name}).then(res=>{
           console.log('模糊查询请求',res); 
           if(res.data.code==200){
            this.actorList=res.data.data
           }
        })
      },
// 加载演员列表
      loadActorList(){
      this.$http.ActorApi.list({page:1,pagesize:100}).then(res=>{
            if(res.data.code=200){
                  this.actorList=res.data.data
            }
          
        })
    },
   
    },
    // 页面挂载完毕后
    mounted () {
        this.loadActorList();

    },
    }
</script>

<style lang="scss" scoped>
.actor-item{
    display: inline-block;
    margin: 20px 20px 0 20px;
    text-align: center;
}
.actor-item div{
    font-size: 0.9em;
}

</style>