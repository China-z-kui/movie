<template>
  <div>
    <!-- 主体结构 -->
    <el-container>
      <el-header class="header"
        >私人影院后台管理系统
        <div class="userinfo" v-if="$store.state.user">
          {{ $store.state.user.nickname }}
          <span @click="logout">[注销]</span>
        </div>
        <div class="userinfo" v-else>未登录</div>
      </el-header>
      <el-container>
        <el-aside class="scroll-w aside" width="200px">
          <el-menu
            router
            :default-active="$route.path"
            unique-opened
            background-color="#333"
            text-color="#eee"
            active-text-color="#fff"
          >
            <el-submenu index="actor">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span slot="title">演员管理</span>
              </template>
              <el-menu-item index="/home/actor-list">
                <i class="el-icon-s-grid"></i>
                <span slot="title">演员列表</span>
              </el-menu-item>
              <el-menu-item index="/home/actor-add">
                <i class="el-icon-s-grid"></i>
                <span slot="title">新增演员</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="director">
              <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span slot="title">导演管理</span>
              </template>
              <el-menu-item index="/home/director-list">
                <i class="el-icon-s-grid"></i>
                <span slot="title">导演列表</span>
              </el-menu-item>
              <el-menu-item index="/home/director-add">
                <i class="el-icon-s-grid"></i>
                <span slot="title">新增导演</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="move">
              <template slot="title">
                <i class="el-icon-video-camera-solid"></i>
                <span slot="title">电影管理</span>
              </template>
              <el-menu-item index="/home/movie-list">
                <i class="el-icon-s-grid"></i>
                <span slot="title">电影列表</span>
              </el-menu-item>
              <el-menu-item index="/home/movie-add">
                <i class="el-icon-s-grid"></i>
                <span slot="title">新增电影</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="cinema">
              <template slot="title">
                <i class="el-icon-s-home"></i>
                <span slot="title">电影院管理</span>
              </template>
              <el-menu-item index="/home/cinema-list">
                <i class="el-icon-s-grid"></i>
                <span slot="title">电影院列表</span>
              </el-menu-item>
              <el-menu-item index="/home/cinema-add">
                <i class="el-icon-s-grid"></i>
                <span slot="title">新增电影院</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <!-- 嵌套路由 二级路由 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      //调用vuex方法 注销
      this.$store.commit("cleraUserState");
      this.$router.push("/user/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  background-color: #333;
  color: #fff;
  line-height: 60px;
  font-size: 1.3em;
}
.aside {
  background-color: #333;
  height: calc(100vh - 60px);
}
.main {
  height: calc(100vh - 60px);
}
.userinfo {
  color: white;
  float: right;
  font-size: 16px;
}
.userinfo span:hover {
  color: #999;
  cursor: pointer;
}
</style>