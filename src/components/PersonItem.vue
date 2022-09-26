<template>
        <div class="actor-item">
        <el-avatar shape="square" :size="70" fit="cover" :src="avatar">
        </el-avatar>
        <div>{{name}}</div>
        <i class="el-icon-close" @click="deleteActor"></i>
    </div>
</template>

<script>
export default {
      props:["id","name","avatar"],
      methods: {
        deleteActor() { 
              // 通知父组件 已经删除完毕 将会触发delete事件
                    this.$emit('delete')
                 
        }
      },
}
</script>

<style lang="scss" scoped>
.actor-item{
    display: inline-block;
    margin: 20px 20px 0 20px;
    text-align: center;
    position: relative;
}
.actor-item:hover i{
    display: block;
}
.actor-item div{
    font-size: 0.9em;
}
.el-avatar>>>img{
    width: 100%;
}
.actor-item i{
    position: absolute;
    top: -6px;
    font-size: 1.2em;
    right: -6px;
    display: none;
}
</style>