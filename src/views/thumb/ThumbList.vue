<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>电影管理</el-breadcrumb-item>
      <el-breadcrumb-item>电影列表</el-breadcrumb-item>
      <el-breadcrumb-item>剧照列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>


    <!-- 列表页面 -->
    <el-divider content-position="left">剧照列表</el-divider>
    
    <div v-if="thumbList" >
      <div v-for="item in thumbList"  :key="item.id" class="thumb-item">
    <el-image 
    style="width:160px;height:120px;box-shadow:#0003 5px 5px 5px 0px; margin:10px 20px 0px 0px"
    :src="item.url" fit="cover" >
    </el-image>
     <i class="el-icon-close" @click="deleteThumb(item.id)"></i>
    </div>
 </div>
  </div>
</template>
<script>
export default {
  data() {
    return{
      movie_id:this.$route.params.movie_id,
      thumbList:null
    }   
  },
  methods: {
    loadThumbsByMovieId() {
      this.$http.MovieThumbApi.listByMovieId({movie_id:this.movie_id}).then(res=>{
        console.log('加载',res);
        this.thumbList=res.data.data
      })
      
    },
    deleteThumb(id){
       this.$http.MovieThumbApi.delete({id}).then(res=>{
        console.log('删除剧照',res);
       if(res.data.code==200){
        this.loadThumbsByMovieId()
       }
      })
    }
  },
  mounted () {
    this.loadThumbsByMovieId();
  },
}
</script>

<style scoped >
.thumb-item{
  display: inline-block;
  position: relative;
}
.thumb-item i{
  position: absolute;
  right: 10px;
  top: 0;
  font-size: 1.3em;
  display: none;
}
.thumb-item:hover i{
  display: block;
}
</style>
