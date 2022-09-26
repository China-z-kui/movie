<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>电影院管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增电影院</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <el-row>
      <el-col :span="12">
        <el-form :rules="rules" ref="form" :model="form" label-width="120px">
          <el-form-item label="电影院名称" prop="cinema_name">
            <el-input v-model="form.cinema_name"></el-input>
          </el-form-item>
          <el-form-item label="选择位置">
            <div style="width: 100%; height: 200px" id="container"></div>
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="省份" prop="province">
            <el-input v-model="form.province"></el-input>
          </el-form-item>
          <el-form-item label="城市" prop="city">
            <el-input v-model="form.city"></el-input>
          </el-form-item>
          <el-form-item label="地区" prop="district">
            <el-input v-model="form.district"></el-input>
          </el-form-item>
          <el-form-item label="经度" prop="longitude">
            <el-input v-model="form.longitude"></el-input>
          </el-form-item>
          <el-form-item label="纬度" prop="latitude">
            <el-input v-model="form.latitude"></el-input>
          </el-form-item>
          <el-form-item label="选择标签" prop="tags">
            <el-select
              v-model="form.tags"
              multiple
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in cinemaTags"
                :key="item.id"
                :label="item.tagname"
                :value="item.tagname"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";

export default {
  data() {
    return {
      cinemaTags: [],
      form: {
        // 封装表单数据
        cinema_name: "",
        address: "",
        province: "",
        city: "",
        district: "",
        longitude: "",
        latitude: "",
        tags: "",
      },
      rules: {
        // 定义表单中每一个表单组件的验证规则
        cinema_name: [
          { required: true, message: "请填写电影院名称", trigger: "blur" },
        ],
        address: [
          { required: true, message: "请在地图中选择地址", trigger: "blur" },
        ],
        province: [
          { required: true, message: "请在地图中选择地址", trigger: "blur" },
        ],
        city: [
          { required: true, message: "请在地图中选择地址", trigger: "blur" },
        ],
        district: [
          { required: true, message: "请在地图中选择地址", trigger: "blur" },
        ],
        longitude: [
          { required: true, message: "请在地图中选择地址", trigger: "blur" },
        ],
        latitude: [
          { required: true, message: "请在地图中选择地址", trigger: "blur" },
        ],
        tags: [
          {
            required: true,
            message: "请选择改影院支持的标签",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    onSubmit() {
      // 将tags转为字符串
      this.form.tags = this.form.tags.toString();
      // 新增电影院
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.$http.CinemaApi.add(this.form).then((res) => {
            console.log("新增电影院请求", res);
            if (res.data.code == 200) {
              this.$message.success("添加成功");
              this.$router.push("/home/cinema-list");
            }
          });
        } else {
          this.$message.warning("请完善表单");
        }
      });
    },
    initMap() {
      AMapLoader.load({
        key: "ecefef71d8c90f2ded5576edce08596e", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.Geocoder"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          let map = new AMap.Map("container", {
            zoom: 11,
            center: [116.397428, 39.90923],
            viewMode: "3D",
          });
          let marker = null;
          // 为地图绑定点击事件
          map.on("click", (e) => {
            let lnglat = e.lnglat;
            //获得经纬度
            console.log("获得坐标", lnglat);
            // 显示点标记
            if (marker != null) {
              map.remove(marker);
            }
            marker = new AMap.Marker({
              position: new AMap.LngLat(lnglat.lng, lnglat.lat), // 经纬度对象
            });
            // 将创建的点标记添加到已有的地图
            map.add(marker);
            // 通过经纬度，访问原地址编码接口
            var geocoder = new AMap.Geocoder();
            geocoder.getAddress([lnglat.KL, lnglat.kT], (status, result) => {
              console.log(status, result);
              if (status == "complete") {
                // result中对应详细地理坐标信息
                this.form.address = result.regeocode.formattedAddress;
                this.form.province = result.regeocode.addressComponent.province;
                this.form.city = result.regeocode.addressComponent.city;
                this.form.district = result.regeocode.addressComponent.district;
                this.form.longitude = lnglat.KL;
                this.form.latitude = lnglat.kT;
              } else {
                this.$message.error("地图数据加载失败");
              }
            });
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 加载所有电影院标签下拉框数据
    loadAllCinematags() {
      this.$http.CinemaApi.queryAllTags().then((res) => {
        // console.log("数据",res);
        this.cinemaTags = res.data.data;
      });
    },
  },
  mounted() {
    this.initMap();
    // 初始化所有电影院标签下拉列表
    this.loadAllCinematags();
  },
};
</script>

<style>
</style>
