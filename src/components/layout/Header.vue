<template>
  <div class="header-container">
    <!-- header left -->
    <div class="header-left">
      <div class="header-select">
        <div class="header-select-text">
          Công ty tnhh sản xuất-thương mại-dịch vụ qui phúc
        </div>
        <div class="header-logo logo-dropdown logo-dropdown-l"></div>
      </div>
    </div>
    <!-- end header left -->
    <!-- header-right -->
    <div class="header-right">
      
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
export default {};
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
  font-family: "notosans-bold";
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
  background-position: -787px -30px;
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

</style>
