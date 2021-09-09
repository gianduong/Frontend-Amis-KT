<template>
  <div class="navbar">
    <div class="navbar-container">
      <!-- nav logo -->
      <div class="navbar-logo">
        <a href="#" class="menu-logo" @click="resize">
          <div class="home-logo"></div>
        </a>
        <div class="logo" :class="{ notShow: !isShow }">
          <a href="#">
            <img
              src="../../assets/img/Logo_Module_TiengViet_White.66947422.svg"
              alt="logo"
            />
          </a>
        </div>
      </div>
      <!-- end nav logo -->
      <!-- nav list -->
      <div class="nav-list-container">
        <router-link class="nav-item" to="/EmployeeList">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div class="nav-item-link" v-bind="attrs" v-on="on" 
                ><div class="nav-logo-container">
                  <div class="nav-logo logo-dasboard"></div>
                </div>
                <span :class="{ hidden: !isShow }">Tổng quan</span></div
              >
            </template>
            <span>Tổng quan</span>
          </v-tooltip>
        </router-link>

        <router-link class="nav-item" to="/Store"> 
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div class="nav-item-link" v-bind="attrs" v-on="on" 
                ><div class="nav-logo-container">
                  <div class="nav-logo logo-cash"></div>
                </div>
                <span style="z-index:1999" :class="{ hidden: !isShow }">Tiền mặt</span></div
              >
            </template>
            <span>Tiền mặt</span>
          </v-tooltip>
        </router-link>
        <router-link class="nav-item" to="/Store">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div class="nav-item-link" v-bind="attrs" v-on="on"
                ><div class="nav-logo-container">
                  <div class="nav-logo logo-bank"></div>
                </div>
                <span :class="{ hidden: !isShow }">Tiền gửi</span></div
              >
            </template>
            <span>Tiền gửi</span>
          </v-tooltip>
        </router-link>
        <router-link class="nav-item" to="/Store">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div class="nav-item-link" v-bind="attrs" v-on="on"
                ><div class="nav-logo-container">
                  <div class="nav-logo logo-pu"></div>
                </div>
                <span :class="{ hidden: !isShow }">Mua hàng</span></div
              >
            </template>
            <span>Mua hàng</span>
          </v-tooltip>
        </router-link>
        <router-link class="nav-item" to="/Store">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div class="nav-item-link" v-bind="attrs" v-on="on"
                ><div class="nav-logo-container">
                  <div class="nav-logo logo-sale"></div>
                </div>
                <span :class="{ hidden: !isShow }">Bán hàng</span></div
              >
            </template>
            <span>Bán hàng</span>
          </v-tooltip>
        </router-link>
        <router-link class="nav-item" to="/Store">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div class="nav-item-link" v-bind="attrs" v-on="on" 
                ><div class="nav-logo-container">
                  <div class="nav-logo logo-invoice"></div>
                </div>
                <span :class="{ hidden: !isShow }">Quản lý hóa đơn</span></div
              >
            </template>
            <span>Quản lý hóa đơn</span>
          </v-tooltip>
        </router-link>
        <router-link class="nav-item" to="/Store">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div class="nav-item-link" v-bind="attrs" v-on="on"
                ><div class="nav-logo-container">
                  <div class="nav-logo logo-stock"></div>
                </div>
                <span :class="{ hidden: !isShow }">Kho</span></div
              >
            </template>
            <span>Kho</span>
          </v-tooltip>
        </router-link>
        <router-link class="nav-item" to="/Store">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }"> 
              <div class="nav-item-link" v-bind="attrs" v-on="on"
                ><div class="nav-logo-container">
                  <div class="nav-logo logo-tools"></div>
                </div>
                <span :class="{ hidden: !isShow }">Công cụ dụng cụ</span></div
              >
            </template>
            <span>Công cụ dụng cụ</span>
          </v-tooltip>
        </router-link>
        <router-link class="nav-item" to="/Store">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div class="nav-item-link" v-bind="attrs" v-on="on"
                ><div class="nav-logo-container">
                  <div class="nav-logo logo-assets"></div>
                </div>
                <span :class="{ hidden: !isShow }">Tài sản cố định</span></div
              >
            </template>
            <span>Tài sản cố định</span>
          </v-tooltip>
        </router-link>
        <router-link class="nav-item" to="/Store">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div class="nav-item-link" v-bind="attrs" v-on="on"
                ><div class="nav-logo-container">
                  <div class="nav-logo logo-tax"></div>
                </div>
                <span :class="{ hidden: !isShow }">Thuế</span></div
              >
            </template>
            <span>Thuế</span>
          </v-tooltip>
        </router-link>
        <router-link class="nav-item" to="/Store">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div class="nav-item-link" v-bind="attrs" v-on="on"
                ><div class="nav-logo-container">
                  <div class="nav-logo logo-price"></div>
                </div>
                <span :class="{ hidden: !isShow }">Giá thành</span></div
              >
            </template>
            <span>Giá thành</span>
          </v-tooltip>
        </router-link>
        <router-link class="nav-item" to="/Store">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div class="nav-item-link" v-bind="attrs" v-on="on"
                ><div class="nav-logo-container">
                  <div class="nav-logo logo-general"></div>
                </div>
                <span :class="{ hidden: !isShow }">Tổng hợp</span></div
              >
            </template>
            <span>Tổng hợp</span>
          </v-tooltip>
        </router-link>
        <router-link class="nav-item" to="/Store">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div class="nav-item-link" v-bind="attrs" v-on="on"
                ><div class="nav-logo-container">
                  <div class="nav-logo logo-budget"></div>
                </div>
                <span :class="{ hidden: !isShow }">Ngân sách</span></div
              >
            </template>
            <span>Ngân sách</span>
          </v-tooltip>
        </router-link>
        <router-link class="nav-item" to="/Store">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div class="nav-item-link" v-bind="attrs" v-on="on"
                ><div class="nav-logo-container">
                  <div class="nav-logo logo-report"></div>
                </div>
                <span :class="{ hidden: !isShow }">Báo cáo</span></div
              >
            </template>
            <span>Báo cáo</span>
          </v-tooltip>
        </router-link>
        <router-link class="nav-item" to="/Store">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div class="nav-item-link" v-bind="attrs" v-on="on"
                ><div class="nav-logo-container">
                  <div class="nav-logo logo-finance"></div>
                </div>
                <span :class="{ hidden: !isShow }">Phân tích tài chính</span></div
              >
            </template>
            <span>Phân tích tài chính</span>
          </v-tooltip>
        </router-link>
      </div>
      <!-- end nav list -->
    </div>
  </div>
</template>

<script>
// import ada from "../../assets/img"
export default {
  data: () => ({}),
  props: {
    isShow: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    resize() {
      this.$emit("resize");
    },
  },
};
</script>

<style lang="scss" scoped>
/** định nghĩa một số phương thức cơ bản */
@mixin WidthHeight($w, $h) {
  width: $w;
  height: $h;
}
@mixin Display {
  display: flex;
  align-items: center;
}

/**----------------------------------- */

.navbar-logo {
  @include Display;
  justify-content: center;
  height: 48px;
}
.logo {
  @include WidthHeight(96px, 32px);
  img {
    @include WidthHeight(100%, 100%);
  }
  .menu-logo {
    @include WidthHeight(24px, 24px);
    margin-right: 10px;
  }
}

.notShow {
  display: none;
}

.nav-list-container {
  padding-top: 14px;
  max-height: calc(100vh - 48px);
}
.nav-item {
  height: 42px;
  @include Display;
  text-decoration-line:none;
}
.nav-item-link {
  @include WidthHeight(100%, 42px);
  @include Display;
  text-decoration: none;
  color: #fff;
  padding: 0 14px;
  &:hover {
    background: #616164;
  }
}
/* nav logo */
.nav-logo-container {
  width: 24px;
  background-size: contain;
  margin-right: 8px;
}

::-webkit-scrollbar {
  width: 6px;
  background: #fff;
}
::-webkit-scrollbar-thumb {
  background: #d4d7dc;
}
::-webkit-scrollbar-thumb:hover {
  background: #616164;
}
/* logo */
.home-logo {
  @include WidthHeight(24px, 24px);
  background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat -424px -86px;
  margin-right: 10px;
}
.nav-logo {
  @include WidthHeight(24px, 24px);
  background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat;
}
.logo-dasboard {
  background-position: -30px -1628px;
}
.logo-cash {
  background-position: -73px -1628px;
}
.logo-bank {
  background-position: -117px -1628px;
}
.logo-pu {
  background-position: -161px -1628px;
}
.logo-sale {
  background-position: -204px -1628px;
}
.logo-invoice {
  background-position: -249px -1628px;
}
.logo-stock {
  background-position: -291px -1628px;
}
.logo-tools {
  background-position: -336px -1628px;
}
.logo-assets {
  background-position: -378px -1630px;
}
.logo-tax {
  background-position: -423px -1630px;
}
.logo-price {
  background-position: -467px -1628px;
}
.logo-general {
  background-position: -510px -1628px;
}
.logo-budget {
  background-position: -378px -1659px;
}
.logo-report {
  background-position: -547px -1628px;
}
.logo-finance {
  background-position: -204px -1664px;
}

.hidden {
  overflow: hidden;
}
</style>
