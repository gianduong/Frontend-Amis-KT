<template>
  <div class="content-container">
    <div class="content-title">
      <v-tabs background-color="#F4F5F6" color="green">
        <v-tab
          style="
            text-transform: none;
            font-weight: bold;
            color: #111;
            font-size: 13px;
          "
          >Quy chình</v-tab
        >
        <v-tab
          style="
            text-transform: none;
            font-weight: bold;
            color: #111;
            font-size: 13px;
          "
          >Thu, chi tiền</v-tab
        >
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
            <v-menu open-on-hover bottom offset-y left nudge-bottom="-10px">
              <template v-slot:activator="{ on, attrs }">
                <img
                  class="img-hover"
                  v-bind="attrs"
                  v-on="on"
                  src="../../assets/img/ThuTien.png"
                  alt="Thu Tiền"
                />
              </template>

              <v-list width="300px" dense>
                <v-list-item v-for="(item, index) in thuTien" :key="index" link>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <div class="img-KiemKeQuy">
            <img class="muiten-position" src="../../assets/img/MuiTen.png" />
            <v-menu bottom open-on-hover offset-y left>
              <template v-slot:activator="{ on, attrs }">
                <img
                  class="img-hover item-kiemkequy"
                  v-bind="attrs"
                  v-on="on"
                  src="../../assets/img/KiemKeQuy.png"
                  alt="Kiểm kê quỹ"
                  style="margin-right: 5px"
                />
              </template>

              <v-list dense>
                <v-list-item
                  v-for="(item, index) in kiemKeQuy"
                  :key="index"
                  link
                  
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <img class="muiten-2-position" src="../../assets/img/MuiTen2.png" />
          </div>
          <div class="img-ChiTien">
            <v-menu open-on-hover bottom offset-y left>
              <template v-slot:activator="{ on, attrs }">
                <img
                  class="img-hover"
                  v-bind="attrs"
                  v-on="on"
                  src="../../assets/img/ChiTien.png"
                  alt="Chi tiền"
                />
              </template>

              <v-list dense>
                <v-list-item v-for="(item, index) in chiTien" :key="index" link>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
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
          <v-tab
            to="/DI/DIVendor"
            style="text-transform: none; border: 1px solid #e5e5e5; color: #111"
          >
            Khách hàng
            <v-icon color="green">mdi-account-tie-outline</v-icon>
          </v-tab>
          <v-tab
            to="/DI/DIVendor"
            style="text-transform: none; border: 1px solid #e5e5e5; color: #111"
          >
            Nhà cung cấp
            <v-icon color="green">mdi-account-filter-outline</v-icon>
          </v-tab>
          <v-tab
            to="/Employee"
            style="text-transform: none; border: 1px solid #e5e5e5; color: #111"
          >
            Nhân viên
            <v-icon color="green">mdi-account-supervisor-outline</v-icon>
          </v-tab>
          <v-tab to="/DI/DIAccount"
            style="text-transform: none; border: 1px solid #e5e5e5; color: #111"
          >
            Hệ thống tài khoản
            <v-icon color="green">mdi-alarm-panel-outline</v-icon>
          </v-tab>
        </v-tabs>
      </div>
      <div class="major-container"></div>
      <div class="title-container">
        <div class="title-title">
          <span>Báo Cáo</span>
        </div>
        <div class="title-content">
          <ul style="list-style-type: disc">
            <li class="content-li">&#8226; Dòng tiền</li>
            <li class="content-li">&#8226; Bảng kê số dư tiền theo ngày</li>
            <li class="content-li">&#8226; Sổ kế toán chi tiết quỹ tiền mặt</li>
            <li class="content-li">&#8226; SO3a2-DN: Sổ nhật ký chi tiền</li>
            <li class="content-li">&#8226; SO3a1-DN: Sổ nhật ký thu tiền</li>
          </ul>
          <div class="total-title">Tất cả báo cáo</div>
        </div>
      </div>
    </div>
    <!-- end main content -->
    <!--  -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      thuTien: [
        { title: "Phiếu thu" },
        { title: "Thu tiền theo hóa đơn" },
        { title: "Thu tiền theo hóa đơn nhiều khách hàng" },
      ],
      kiemKeQuy: [{ title: "Kiểm kê" }],
      chiTien: [
        { title: "Phiếu chi" },
        { title: "Trả tên theo hóa đơn" },
        { title: "Nộp thuế" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.v-list{
  padding-top: 3px;
  padding-bottom: 3px;
}
.v-list-item{
  height: 30px;
  min-height: 20px;
}
.v-list-item__title:hover{
  color: #23c70c;
}

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
      margin-top: 100px;
      border: 1px solid #e5e5e5;

      .major-title {
        @include widthHeight(100%, 50px);
        border: 1px solid #e5e5e5;

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
          color: #111111;
          border-bottom: 1px solid #e5e5e5;
        }
      }
      .major-content {
        @include widthHeight(100%, 300px);
        margin-left: 10%;
        margin-top: 10px;
        .img-ThuTien{
          position: absolute;
          top: 250px;
        }
        .img-KiemKeQuy {
          position: absolute;
          top: 350px;

          .muiten-position {
            position: absolute;
            top: 0;
          }

          .item-kiemkequy {
            position: absolute;
            left: 230px;
          }

          .muiten-2-position {
            position: absolute;
            left: 330px;
          }
        }

        .img-ChiTien {
          position: absolute;
          top: 440px;
        }
      }
    }

    .title-container {
      @include widthHeight(290px, 440px);
      position: absolute;
      top: 194px;
      right: 275px;
      border: 1px solid #e5e5e5;
      background: #fff;

      .title-title {
        @include widthHeight(100%, 42px);
        border-bottom: 1px solid #e5e5e5;

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
          color: #111111;
          border-bottom: 1px solid #e5e5e5;
        }
      }
      .title-content {
        .content-li {
          display: flex;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid #e5e5e5;
          height: 74px;
        }
        .content-li:hover {
          color: #0075c0;
        }
        .total-title {
          display: flex;
          justify-content: center;
          color: #0075c0;
        }
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
.img-hover:hover {
  border: 0.5px solid #f8f8f8;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 2px;
}

.tab-router {
  width: 167px;
  height: 80px;
  text-decoration-line: none;
}

.list-item-length {
  height: 30px;
}
</style>
