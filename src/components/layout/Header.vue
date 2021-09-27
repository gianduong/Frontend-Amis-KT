<template>
  <div class="header-container">
    <!-- header left -->
    <div class="header-left">
      <div class="header-select">
        <div class="header-select-text">
          Công ty cổ phần MISA
        </div>
        <div class="header-logo logo-dropdown logo-dropdown-l"></div>
        <v-btn rounded color="#fff" height="30px">
          <div class="icon-header-current-db"></div>
          &ensp;DC-01
        </v-btn>
      </div>
    </div>
    <!-- end header left -->
    <!-- header-right -->
    <div class="header-right">
      <div style="width: 250px;height:30px; margin: 0 15px 10px 0;" class="search">
          <InputField
            :placeholder="'Nhập từ khóa tìm kiếm'"
            :searchField="true"
            ref="inputSearch"
          />
        </div> 
      <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <div class="header-logo mi-category" v-bind="attrs" v-on="on"></div>
          </template>
          <span>Thông báo</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <div class="header-logo mi-setting" v-bind="attrs" v-on="on"></div>
          </template>
          <span>Thông báo</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <div class="header-logo mi-help" v-bind="attrs" v-on="on"></div>
          </template>
          <span>Thông báo</span>
        </v-tooltip>
      <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <div class="header-logo logo-bell" v-bind="attrs" v-on="on"></div>
          </template>
          <span>Thông báo</span>
        </v-tooltip>
      <div class="heaser-user">

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <div class="avatar-icon" v-bind="attrs" v-on="on">
              <img src="../../assets/img/default-avatar.jpg" alt="avatar" />
            </div>
          </template>
          <span>Ảnh đại diện</span>
        </v-tooltip>
        <span class="name-user"
          >Nguyễn Giản Dương</span
        >
        <template>
          <div class="text-center d-flex align-center">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <div
                  class="header-logo logo-dropdown logo-dropdown-m"
                  dark
                  v-bind="attrs"
                  v-on="on"
                ></div>
              </template>
              <span>Thêm</span>
            </v-tooltip>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import InputField from "../commons/InputField.vue"
export default {
  components:{
    InputField
  }
};
</script>

<style lang="scss" scoped>

/**Css mặc định */
@mixin widthHeight($w, $h) {
  width: $w;
  height: $h;
}

@mixin flex {
  display: flex;
  align-items: center;
}

.header-container {
  width: 100%;
  @include flex;
  justify-content: space-between;

}
.header-left {
  @include flex;
}

.header-select {
  @include flex;
}
.header-select-text {
  text-transform: uppercase;
  font-size: 14px;
  color: #111;

  font-family: noto_sans,Open Sans local;
}

.header-logo {
  @include widthHeight(24px,24px );
  background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat;
  cursor: pointer;
}
.header-select {
  cursor: pointer;
}
.toogle-logo {
  background-position: -843px -30px;
}
.logo-bell {
  z-index: 1000;
  background-position: -787px -30px;
}
.mi-category{
  background-position: -568px -30px;
  margin-right: 15px;
}
.mi-setting{
  background-position: -33px -144px;
  margin-right: 15px;
}
.mi-help{
  background-position: -89px -145px;
  margin-right: 15px;
}

.logo-dropdown {
  margin-left: 8px;
}
.logo-dropdown-l {
  background-position: -75px -356px;
  transform: rotate(90deg);
}
/* header right */
.header-right {
  @include flex;

  .search input{
    width: 100%;
    height: 100%;
  }

}
.header-right .logo-dropdown-m {
  background-position: -1076px -28px;
}
.heaser-user {
  @include flex;
  padding: 0 16px;
  cursor: pointer;

}
.name-user {
  color: #111;
  font-weight: 600;
  font-size: 16px;
}
.avatar-icon {
  @include widthHeight(32px,32px);
  border-radius: 50%;
  background: #e8e8e9;
  overflow: hidden;
  margin: 0 8px;
}
.avatar-icon img {
  width: 100%;
}
.icon-header-current-db {
    width: 8px;
    height: 8px;
    background-color: #4ea344;
    border-radius: 50%;
    border: 1px solid #fff;
}
</style>
