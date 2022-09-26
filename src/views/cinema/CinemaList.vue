<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icom-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>电影院管理</el-breadcrumb-item>
      <el-breadcrumb-item>电影院列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 下划线 -->
    <el-divider></el-divider>
    <div
      id="cinemaListmapContainer"
      style="width: 100%; height: 200px; border: 1px solid #aaa"
    ></div>
    <!-- 下划线 -->
    <el-divider content-position="left">电影院列表</el-divider>
    <!--  列表页面-->
    <el-table :data="tableData" style="width: 100%" height="300px">
      <el-table-column
        align="left"
        sortable
        prop="cinema_name"
        label="影院名称"
        width="280"
      >
      </el-table-column>
      <el-table-column align="left" prop="address" label="影院详细地址">
      </el-table-column>
      <el-table-column
        align="left"
        sortable
        :sort-method="sortByLocation"
        label="影院位置"
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px"
            >{{ scope.row.city }}{{ scope.row.district }}</span
          >
        </template>
      </el-table-column>
      <el-table-column align="left" width="280" label="操作">
        <template slot-scope="scope">
          <el-button
            type="success"
            icon="el-icon-location-outline"
            circle
            title="查看位置"
            @click="showLocation(scope.row.longitude, scope.row.latitude)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-s-grid"
            circle
            @click="$router.push(`/home/cinema-room-list/${scope.row.id}`)"
            title="查看电影院详情"
          ></el-button>
          <el-button
            type="warning"
            icon="el-icon-edit"
            circle
            title="修改电影院信息"
            @click="$router.push(`/home/cinema-update/${scope.row.id}`)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            title="删除电影院"
            @click="showDel(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import AMapLoader from "@amap/amap-jsapi-loader";
export default {
  data() {
    return {
      tableData: [],
      map: null,
    };
  },
  methods: {
    // 删除电影院
    showDel(id) {
      this.$confirm("此操作将永久关闭该影院, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return this.$http.CinemaApi.delete({ id });
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.loadAllCinemas();
          }
        });
    },
    // 在地图中显示影院位置
    showLocation(lng, lat) {
      if (this.map != null) {
        this.map.setCenter([lng, lat], false, 1000);
        this.map.setZoom(18, false, 1000);
      }
    },
    // 影院位置列排序
    sortByLocation(a, b) {
      let astr = a.city + a.district;
      let bstr = b.city + b.district;
      return astr > bstr;
    },
    // 加载所有电影院数据
    loadAllCinemas() {
      this.$http.CinemaApi.list().then((res) => {
        // console.log("数据",res);
        if (res.data.code == 200) {
          this.tableData = res.data.data;
        }
      });
    },
    // 加载地图
    initMap() {
      AMapLoader.load({
        key: "ecefef71d8c90f2ded5576edce08596e", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [],
      })
        .then((AMap) => {
          this.map = new AMap.Map("cinemaListmapContainer", {
            zoom: 11,
            center: [116.397428, 39.90923],
            viewMode: "3D",
          });
          // 获得所有电影院位置
          this.tableData.forEach((item) => {
            let lat = item.latitude;
            let lng = item.longitude;
            let marker = new AMap.Marker({
              position: new AMap.LngLat(lng, lat), // 经纬度对象
            });
            this.map.add(marker);
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.loadAllCinemas();
    this.initMap();
  },
};
</script>
<style scoped>
</style>


