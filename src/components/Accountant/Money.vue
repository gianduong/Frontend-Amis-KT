<template>
  <div class="content-container">
    <div class="content-title">
      <v-tabs background-color="#F4F5F6" color="green">
        <v-tab style="text-transform: none;">Quy chình</v-tab>
        <v-tab  style="text-transform: none;">Thu, chi tiền</v-tab>
      </v-tabs>
    </div>
    <!-- main content -->
    <!--  -->
    <div class="main-content">
      <div class="major-container">
        <div class="major-title">
          <span>Nghiệp vụ tiền mặt</span>
        </div>
        <div class="major-content">
          <div class="img-ThuTien">
            <img
              class="img-hover"
              src="../../assets/img/ThuTien.png"
              alt="Thu Tiền"
            />
          </div>
          <div class="img-KiemKeQuy">
            <img src="../../assets/img/MuiTen.png" />
            <img
              class="img-hover"
              src="../../assets/img/KiemKeQuy.png"
              alt="Kiểm kê quỹ"
              style="margin-right: 5px"
            />
            <img src="../../assets/img/MuiTen2.png" />
          </div>
          <div class="img-ChiTien">
            <img
              class="img-hover"
              src="../../assets/img/ChiTien.png"
              alt="Chi tiền"
            />
          </div>
        </div>
      </div>
      <div class="process-container">
        <v-tabs
          fixed-tabs
          icons-and-text
          height="80px"
          background-color="#fff"
          color="green"
        >
          <v-tab to="/DI/DIVendor" style="text-transform: none;">
            Khách hàng
            <v-icon color="green">mdi-account-tie-outline</v-icon>
          </v-tab>
          <v-tab to="/DI/DIVendor" style="text-transform: none;">
            Nhà cung cấp
            <v-icon color="green">mdi-account-filter-outline</v-icon>
          </v-tab>
          <v-tab to="/Employee" style="text-transform: none;">
            Nhân viên
            <v-icon color="green">mdi-account-multiple</v-icon>
          </v-tab>
          <v-tab  style="text-transform: none;">
            Hệ thống tài khoản
            <v-icon color="green">mdi-alarm-panel-outline</v-icon>
          </v-tab>
        </v-tabs>
      </div>
    </div>
    <!-- end main content -->
    <!--  -->
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
/**biến tự định nghĩa */
$Background-: url("../../assets/img/Sprites.64af8f61.svg") no-repeat;
$color-white: #fff;
$color-scroll: #d4d7dc;
$color-paginantion: #c7c7c7;
$color-pagination-button: #9e9e9e;
$color-active: #111;

/**Css mặc định */
@mixin widthHeight($w, $h) {
  width: $w;
  height: $h;
}

@mixin flex {
  display: flex;
  align-items: center;
}

@mixin icon($w, $h) {
  cursor: pointer;
  width: 24px;
  height: 24px;
  margin-left: 18px;
  margin-bottom: 5px;
  background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat $w $h;
}

/**---------------------------------------------------------------------------- */

/** ----------------Container-------------- */
.content-container {
  background: #f8f8f8;
  padding: 0 20px;
  box-sizing: border-box;
  /**-------title--------- */
  .content-title {
    @include flex;
    @include widthHeight(100%, 94px);
    justify-content: space-between;

    .title-name {
      display: block;
      font-size: 24px;
      font-family: "notosans-bold";
      color: #111;
      padding-top: 10px;
    }
  }

  .main-content {
    background: #f8f8f8;
    padding: 0 20px;

    .major-container {
      background: #fff;
      @include widthHeight(700px, 350px);
      display: flex;
      flex-direction: column;
      margin-left: 20%;
      margin-top: 10px;

      .major-title {
        @include widthHeight(100%, 50px);

        @include flex;
        justify-content: center;

        span {
          text-transform: uppercase;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          font-weight: 700;
          border-bottom: 1px solid #e5e5e5;
        }
      }
      .major-content {
        @include widthHeight(100%, 300px);
        margin-left: 10%;
        margin-top: 10px;
      }
    }

    .process-container {
      @include widthHeight(700px, 80px);
      background-color: red;
      margin-left: 20%;
      margin-bottom: 20%;
      margin-top: 10px;
    }
  }
}
.img-hover {
  box-sizing: border-box;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box;
}
.img-hover:hover {
  border: 0.5px solid #f8f8f8;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  // width: calc(100% - 4px);
  // height: calc(100% - 4px);
}

.tab-router {
  width: 167px;
  height: 80px;
  text-decoration-line: none;
}
</style>
