<template>
  <div class="dialog-container">
    <div class="dialog-title">
      <div class="title-left">
        <v-icon large>mdi-history</v-icon>
        <span>Phiếu chi PC00028</span>
        <div class="title-box">
          <v-autocomplete
            solo
            item-text="name"
            item-value="value"
            no-data-text="Không có dữ liệu"
          ></v-autocomplete>
        </div>
      </div>

      <v-spacer></v-spacer>
      <div class="modal-close">
        <v-tooltip bottom style="z-index: 100000">
          <template v-slot:activator="{ on, attrs }">
            <div class="modal-icon mi-tour" v-bind="attrs" v-on="on"></div>
          </template>
          <span>Chuyển hướng</span>
        </v-tooltip>
        <router-link class="link-to" to="/CA/CAProcess">Hướng dẫn</router-link>
        <v-tooltip bottom style="z-index: 100000">
          <template v-slot:activator="{ on, attrs }">
            <div class="modal-icon setting-icon" v-bind="attrs" v-on="on"></div>
          </template>
          <span>Cài đặt</span>
        </v-tooltip>
        <v-tooltip bottom style="z-index: 100000">
          <template v-slot:activator="{ on, attrs }">
            <div class="modal-icon help-icon" v-bind="attrs" v-on="on"></div>
          </template>
          <span>Hỏi đáp</span>
        </v-tooltip>
        <v-tooltip bottom style="z-index: 100000">
          <template v-slot:activator="{ on, attrs }">
            <div
              class="modal-icon close-icon"
              v-bind="attrs"
              v-on="on"
              @click="isShowDialogAddOrUpdate = false"
            ></div>
          </template>
          <span>Thoát (ESC)</span>
        </v-tooltip>
      </div>
    </div>
    <div class="dialog-content">
      <div class="content-left">
        <div class="content-left-top">
          <div class="content-left-left">
            <div class="left-1">
              <div class="w-49 h-32 m-r-10" style="position: relative">
                <div class="mi-32 ic-plus-position">
                  <div class="mi-24 mi-plus--success"></div>
                </div>
                <span>Đối tượng</span>
                <v-autocomplete
                  solo
                  item-text="name"
                  item-value="value"
                  no-data-text="Không có dữ liệu"
                ></v-autocomplete>
              </div>
              <InputField class="w-49 h-32 m-t--3" :label="'Người nhận'" />
            </div>
            <div class="left-1">
              <InputField class="w-99 h-32 m-t--3" :label="'Địa chỉ'" />
            </div>
            <div class="left-1">
              <InputField
                class="w-99 h-32 m-t--3"
                :value="'Chi tiền cho'"
                :label="'Lí do chi'"
              />
            </div>
          </div>
          <div class="content-left-right">
            <div class="right-1">
              <InputField
                :label="'Ngày hạch toán'"
                class="w-49 h-32 m-t--3"
                type="date"
              />
            </div>
            <div class="right-1">
              <InputField
                :label="'Ngày phiếu chi'"
                class="w-49 h-32 m-t--3"
                type="date"
              />
            </div>
            <div class="right-1">
              <InputField :label="'Lý do chi'" class="w-49 h-32 m-t--3" />
            </div>
          </div>
        </div>
        <div class="content-left-bottom">
          <div class="w-43 h-32 m-r-10" style="position: relative">
            <div class="mi-32 ic-plus-position">
              <div class="mi-24 mi-plus--success"></div>
            </div>
            <span>Nhân viên</span>
            <v-autocomplete
              solo
              item-text="name"
              item-value="value"
              no-data-text="Không có dữ liệu"
            ></v-autocomplete>
          </div>
          <InputField :label="'Kèm theo'" class="w-15 h-32 m-t--3" />
          <span>chứng từ gốc</span>
        </div>
      </div>
      <div class="content-right">
        <div class="right-1">
          <div class="title-span">Tổng tiền</div>
          <div class="account-span">0,0</div>
        </div>
      </div>
    </div>
    <div class="table-content">
      <div class="title-table">
        <span class="name-table">Hạch toán</span>
        <div class="option">
          <span>loại tiền</span>
          <v-menu
            style="position: relative"
            v-model="menu"
            :close-on-content-click="false"
            :nudge-width="200"
            bottom
            offset-y
            right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-bind="attrs"
                v-on="on"
                v-model="search"
              ></v-text-field>
              <div class="mi-32 icon-dropdown">
                <v-icon>mdi-menu-down</v-icon>
              </div>
            </template>
            <v-card>
              <v-data-table
                hide-default-footer
                :headers="headerMoney"
                :items="collume"
                :search="search"
              >
                <template v-slot:body="{ items }">
                  <tbody>
                    <tr
                      v-for="item in items"
                      :key="item.ma"
                      @click="handleSelectMoney(item)"
                    >
                      <td>{{ item.ma }}</td>
                      <td>{{ item.ten }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-data-table>
            </v-card>
          </v-menu>
          <span>Tỷ giá</span>
          <div class="revelue">23.150.00</div>
        </div>
      </div>

      <div class="table-account">
        <v-data-table
          hide-default-footer
          :headers="headerAccount"
          :items="rowData"
          :search="search"
        >
          <template v-slot:body="{ items }">
            <tbody>
              <tr
                v-for="item in items"
                :key="item.ma"
                @click="handleSelectMoney(item)"
              >
                <td>1</td>
                <td>{{ item.data1 }}</td>
                <td>{{ item.data2 }}</td>
                <td>{{ item.data3 }}</td>
                <td>{{ item.data4 }}</td>
                <td>{{ item.data5 }}</td>
                <td>{{ item.data6 }}</td>
                <td>{{ item.data7 }}</td>
                <td>{{ item.data8 }}</td>
                <td>{{ item.data9 }}</td>
              </tr>
              <tr style="background: #f3f8f8 !important">
                <td>3</td>
                <td>
                  <InputField
                    v-model="data1"
                    style="height: 32px"
                    :value="data1"
                  />
                </td>
                <td>
                  <InputField
                    v-model="data2"
                    style="height: 32px"
                    :value="data2"
                  />
                </td>
                <td>
                  <InputField
                    v-model="data3"
                    style="height: 32px"
                    :value="data3"
                  />
                </td>
                <td>
                  <InputField
                    v-model="data4"
                    style="height: 32px"
                    :value="data4"
                  />
                </td>
                <td>
                  <InputField
                    v-model="data5"
                    style="height: 32px"
                    :value="data5"
                  />
                </td>
                <td>
                  <InputField
                    v-model="data6"
                    style="height: 32px"
                    :value="data6"
                  />
                </td>
                <td>
                  <InputField
                    v-model="data7"
                    style="height: 32px"
                    :value="data7"
                  />
                </td>
                <td>
                  <InputField
                    v-model="data8"
                    style="height: 32px"
                    :value="data8"
                  />
                </td>
                <td>
                  <InputField
                    v-model="data9"
                    style="height: 32px"
                    :value="data9"
                  />
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
        <div class="bottom-btn">
          <v-btn x-small class="btn" @click="addItem">Thêm dòng</v-btn>
          <v-btn x-small class="btn" @click="deleteItem">Xóa hết dòng</v-btn>
        </div>
      </div>
    </div>
    <div class="excel">
      <div class="title-excel">
        <div class="mi mi-attach mi-16"></div>
        <span class="span-title">Đính kèm</span>
        <span class="span-maxsize">Dung lượng tối đa 5MB</span>
      </div>
      <div class="input-file">
        <input type="file" id="files" class="hidden" />
        <label class="file-place" for="files"
          >Kéo thả tệp vào đây hoặc bấm vào đây</label
        >
      </div>
    </div>
    <div class="dialog-bottom">
      <v-btn
        style="
          margin-left: 20px;
          color: #fff;
          text-transform: none;
          border: 1px solid #6b6c72;
        "
        color="#38393D"
        >Hủy</v-btn
      >
      <div class="btn-right">
        <v-btn
          style="
            margin: 0 20px 0 20px;
            color: #fff;
            text-transform: none;
            border: 1px solid #6b6c72;
          "
          color="#38393D"
          >Cất</v-btn
        >
        <v-btn
          style="
            margin-right: 30px;
            color: #fff;
            text-transform: none;
            border: 1px solid #6b6c72;
          "
          color="#23c70c"
          >Cất và in</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import InputField from "../commons/InputField.vue";
export default {
  components: {
    InputField,
  },
  data() {
    return {
      search: "",
      showRevalue: false,
      menu: false,
      headerAccount: [
        { text: "#", value: "1" },
        { text: "TK CÓ", value: "2" },
        { text: "DIỄN GIẢI", value: "3" },
        { text: "TK NỢ", value: "4" },
        { text: "SỐ TIỀN", value: "5" },
        { text: "QUY ĐỔI", value: "6" },
        { text: "ĐỐI TƯỢNG", value: "7" },
        { text: "TÊN ĐỐI TUỌNG", value: "8" },
        { text: "TK NGÂN HÀND", value: "9" },
        { text: "", value: "10" },
      ],
      rowData: [],
      headerMoney: [
        { text: "Mã loại tiền", value: "ma" },
        { text: "Tên loại tiền", value: "ten" },
      ],
      collume: [
        { ma: "VND", ten: "Việt Nam đồng" },
        { ma: "USD", ten: "Đô la Mỹ" },
      ],
    };
  },
  methods: {
    handleSelectMoney(item) {
      this.search = item.ma;
      this.menu = false;
      if (item.ma == "USD") {
        this.showRevalue = true;
      } else {
        this.showRevalue = false;
      }
    },
    addItem() {
      var my_object = {
        data1: this.data1,
        data2: this.data2,
        data3: this.data3,
        data4: this.data4,
        data5: this.data5,
        data6: this.data6,
        data7: this.data7,
        data8: this.data8,
        data9: this.data9,
      };
      this.rowData.push(my_object);
      (this.data1 = ""),
        (this.data2 = ""),
        (this.data3 = ""),
        (this.data4 = ""),
        (this.data5 = ""),
        (this.data6 = ""),
        (this.data7 = ""),
        (this.data8 = ""),
        (this.data9 = "");
    },
    deleteItem() {
      this.rowData = [];
    },
  },
};
</script>

<style lang="scss" scope>
@mixin widthHeight($w, $h) {
  width: $w;
  height: $h;
}

@mixin flex {
  display: flex;
  align-items: center;
}
@mixin flex-space {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.dialog-container {
  width: 100%;
  height: 100%;
  background-color: #f4f5f8;

  .dialog-title {
    height: 60px;
    @include flex-space;
    .title-left {
      @include flex;
      span {
        font-weight: 700;
        font-size: 24px;
        top: -7px;
        left: 20px;
        padding: 0 0 0 16px;
        color: #111;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .title-box {
        @include widthHeight(350px, 32px);
        margin-left: 50px;
      }
    }
    .modal-close {
      padding-left: 12px;
      margin-right: 10px;
      @include flex;
      position: absolute;
      right: 10px;
      .modal-icon {
        @include widthHeight(24px, 24px);
        cursor: pointer;
        background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat;
      }
      .mi-tour {
        background-position: -984px -144px;
        margin-right: 16px;
      }
      .link-to {
        margin-right: 16px;
        cursor: pointer;
        text-decoration-line: none;
      }
      .link-to:hover {
        text-decoration-line: underline;
      }
      .setting-icon {
        background-position: -32px -144px;
        margin-right: 16px;
      }
      .help-icon {
        background-position: -89px -144px;
        margin-right: 16px;
      }
      .close-icon {
        background-position: -144px -144px;
      }
    }
  }
  .dialog-content {
    @include flex;
    height: 320px;
    .content-left {
      display: flex;
      flex-direction: column;
      @include widthHeight(80%, 100%);
      .content-left-top {
        @include widthHeight(100%, 60%);
        @include flex;
        .content-left-left {
          @include widthHeight(72%, 100%);
          @include flex;
          margin-left: 30px;
          flex-direction: column;
          .left-1 {
            @include widthHeight(100%, 33.33%);
            @include flex;
            span {
              font-size: 12px;
              font-weight: 700;
              color: #212121;
            }
          }
        }
        .content-left-right {
          @include widthHeight(24%, 100%);
          border-left: 1px solid #d4d7dc;
          @include flex;
          flex-direction: column;
          .right-1 {
            @include widthHeight(100%, 33.33%);
            margin-left: 30px;
            @include flex;
          }
        }
      }
      .content-left-bottom {
        @include widthHeight(80%, 25%);
        @include flex;
        margin-left: 30px;
        span {
          padding-top: 40px;
          margin-left: 20px;
        }
      }
    }
    .content-right {
      @include widthHeight(20%, 100%);
      display: flex;
      justify-content: flex-end;
      .right-1 {
        @include widthHeight(100%, 25%);
        display: flex;
        align-items: flex-end;
        flex-direction: column;
        margin: 20px 30px 0 0;
        .account-span {
          font-size: 36px;
          font-weight: 700;
        }
      }
    }
  }
  .table-content {
    @include flex;
    flex-direction: column;
    background: #fff;
    .title-table {
      width: 100%;
      height: 68px;
      display: flex;
      justify-content: space-between;
      .name-table {
        color: #0075c0;
        font-weight: 700;
        text-decoration: underline;
        margin-top: 20px;
        margin-left: 30px;
        &:hover {
          color: green;
          cursor: pointer;
        }
      }
      .option {
        @include flex;
        justify-content: flex-end;
        margin-right: 30px;
        span {
          padding-right: 10px;
          white-space: nowrap;
          padding-left: 20px;
        }
        .revelue {
          @include flex;
          height: 32px;
          width: 24%;
          border-radius: 0.15em;
          border: 1px solid #babec5;
          padding-left: 20px;
        }
      }
    }
    .table-account {
      margin: 0 30px 0 30px;
      .bottom-btn {
        margin: 30px;
        .btn {
          text-transform: none;
          padding: 0 10px 0 10px;
          background: #fff;
          margin-right: 20px;
          border: 1px solid;
        }
      }
    }
  }
  .excel {
    width: 100%;
    height: 200px;
    background: #fff;
    @include flex;
    flex-direction: column;

    .title-excel {
      @include widthHeight(100%, 20%);
      @include flex;
      margin-left: 30px;
      .span-title {
        font-weight: 700;
        color: #212121;
        margin: 0 10px 0 10px;
      }
    }
    .input-file {
      @include widthHeight(100%, 40%);
      margin-left: 30px;
      .hidden {
        display: none;
      }
      .file-place {
        width: 350px;
        height: 50px;
        display: flex;
        justify-content: center;
        padding-top: 10px;
        font-style: italic;
        border: 1px solid #BABEC5;
        border-radius: 2px;
        font-weight: 100;
        background: #fff;
        margin: 8px 0;
      }
    }
  }
  .dialog-bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 50px;
    width: 100%;
    background: #38393d;
    @include flex;
    justify-content: space-between;
  }
}
/** chung */
.h-32 {
  height: 32px !important;
}
.w-5 {
  width: 5%;
}
.w-15 {
  width: 15%;
}
.w-20 {
  width: 20% !important;
}
.w-24 {
  width: 24%;
}
.w-40 {
  width: 40%;
}
.w-43 {
  width: 43%;
}
.w-45 {
  width: 45%;
}
.w-48 {
  width: 48%;
}
.w-49 {
  width: 49%;
}
.w-99 {
  width: 98.9%;
}
.m-r-10 {
  margin-right: 10px;
}
.m-r-16 {
  margin-right: 16px;
}
.m-t--3 {
  margin-top: -3px;
}
/** icon */
.mi-plus--success {
  background: url("../../assets/icon/ic_Plus.svg") no-repeat;
  margin-top: 4.5px;
}
.mi-attach {
  background-position: -539px -203px;
}

.mi-16 {
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
}
.mi-18 {
  width: 18px;
  height: 18px;
  min-width: 18px;
  min-height: 18px;
}
.mi-32 {
  width: 32px;
  height: 32px;
  min-width: 32px;
  min-height: 32px;
}

.mi-24 {
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
}
.mi-arrow-right--black {
  background-position: -320px -360px;
  transition: all 0.2s ease-out;
}

.mi {
  background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat;
  cursor: pointer;
}
.ic-plus-position {
  cursor: pointer;
  position: absolute;
  top: 21px;
  right: 32px;
  z-index: 1;
  border-right: 1px solid #e0e0e0;
  display: flex;
  justify-content: center;
}
.icon-dropdown {
  position: absolute;
  right: 190px;
  display: flex;
  align-items: center;
}

.hidden {
  display: none;
}

/** cutsom */
/** input */
.v-text-field {
  padding: 0;
  margin: 0;
  height: 32px;
}
/** table */
.v-data-table-header th {
  height: 40px;
}
.v-data-table__wrapper th {
  background: #f4f5f8;
  height: 40px;
  span {
    font-weight: 700;
  }
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  height: 32px !important;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
.v-data-table > .v-data-table__wrapper > table > thead > tr > td,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
  height: 32px !important;
}
th {
  height: 32px;
  span {
    font-weight: 700;
  }
}
</style>