<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
}
.scroll-w::-webkit-scrollbar {
  width: 6px;
}
.scroll-w::-webkit-scrollbar-track {
  background-color: #efefef;
  width: 6px;
}
/* 滚动条滑块 */
.scroll-w::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: #bfbfbf;
  width: 6px;
}
</style>