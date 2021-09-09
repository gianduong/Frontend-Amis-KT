<template>
  <div class="content-container">
    <div class="content-title">
      <h3 class="title-name">Nhân viên</h3>
      <!-- Dialog add  -->
      <!--  -->
      <div class="dialog-add-update">
        <v-dialog
          v-model="isShowDialogAddOrUpdate"
          width="900px"
          :persistent="true"
        >
          <template v-slot:activator="{ on, attrs }">
            <div class="btn-add" v-bind="attrs" v-on="on">
              <Button content="Thêm mới nhân viên" v-bind="attrs" v-on="on" />
            </div>
          </template>

          <v-card height="600px" @keydown.esc="closeDialog">
            <EmployeeDetail
              :employeeDetail="employeeDetail"
              @handleCloseDialog="closeDialog"
              @handleShowDialog="showDialog"
              @handleReload="getListEmployee"
              @resetEmployeeDetail="resetEmployeeDetail"
              :modeUpdate="modeUpdate"
              :dialogAddOrUpdate="isShowDialogAddOrUpdate"
              :listDepartment="listDepartment"
              @onNotify="handleNotify"
            />
          </v-card>
        </v-dialog>
      </div>
      <!--  -->
      <!-- End of dialog add -->

      <!-- Dialog notify -->
      <!--  -->
      <!-- thông báo khi thêm thành công -->
      <v-dialog v-model="dialogNotify" width="444px" :persistent="false">
        <DialogNotify
          @closeDialog="handleCloseDialog"
          type="notify-success"
          :notifyMessage="notifyMessage"
        />
      </v-dialog>
      <v-dialog v-model="dialogNotifyDanger" width="444px">
        <DialogNotify
          @closeDialog="handleCloseDangerDialog"
          type="notify-danger"
          :notifyMessage="notifyMessage"
        />
      </v-dialog>
      <!--  -->
      <!-- End of dialog notify -->

      <!-- region snackbar -->

      <!-- v-snackbar lỗi -->
      <v-snackbar v-model="snackbar" top color="red lighten-1" timeout="3000">
        {{ messageSnackbar }}

        <template v-slot:action="{ attrs }">
          <v-btn
            color="deep-purple darken-4"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Đóng
          </v-btn>
        </template>
      </v-snackbar>
      <!-- v-snackbar thành công -->
      <v-snackbar v-model="snackbarSuccess" top color="blue lighten-2" timeout="3000">
        {{ messageSuccess }}

        <template v-slot:action="{ attrs }">
          <v-btn
            color="deep-purple darken-4"
            text
            v-bind="attrs"
            @click="snackbarSuccess = false"
          >
            Đóng
          </v-btn>
        </template>
      </v-snackbar>
      <!-- end region -->
    </div>
    <!-- main content -->
    <!--  -->
    <div :class="{ loading: showLoading }"></div>
    <div class="main-content">
      <div class="search-content">
        <div class="search-wrapper">
          <InputField
            :placeholder="'Tìm theo mã, tên nhân viên'"
            :searchField="true"
            v-model="filterValue"
            v-debounce:300ms="handelFilter"
            ref="inputSearch"
          />
        </div>
        <v-tooltip bottom style="z-index: 100000">
          <template v-slot:activator="{ on, attrs }">
            <div
              class="refresh-btn"
              @click="RefreshEmployee"
              v-bind="attrs"
              v-on="on"
            >
              <div class="refresh-icon"></div>
            </div>
          </template>
          <span>Refresh</span>
        </v-tooltip>

        <v-tooltip bottom style="z-index: 100000">
          <template v-slot:activator="{ on, attrs }">
            <div
              class="export-btn"
              @click="exportExcel"
              v-bind="attrs"
              v-on="on"
            >
              <div class="excel-icon"></div>
            </div>
          </template>
          <span>Xuất ra file</span>
        </v-tooltip>
      </div>
      <!--  -->
      <!-- Table -->
      <div class="table-content">
        <table class="table">
          <thead>
            <tr>
              <th class="table-head-checkbox">
                <div @click="isCheckBox = !isCheckBox">
                  <CheckboxField :isCheck="isCheckBox" />
                </div>
              </th>
              <th class="m-150">
                Mã nhân viên
                <div class="line"></div>
              </th>
              <th class="m-250">
                Tên nhân viên
                <div class="line"></div>
              </th>
              <th class="m-120">
                Giới tính
                <div class="line"></div>
              </th>
              <th class="m-150">
                Ngày sinh
                <div class="line"></div>
              </th>
              <th class="m-250">
                Số CMND
                <div class="line"></div>
              </th>
              <th class="m-250">
                Chức danh
                <div class="line"></div>
              </th>
              <th class="m-250">
                Tên đơn vị
                <div class="line"></div>
              </th>
              <th class="m-150">
                Số tài khoản
                <div class="line"></div>
              </th>
              <th class="m-250">
                Tên ngân hàng
                <div class="line"></div>
              </th>
              <th class="m-250">
                Chi nhánh tài khoản ngân hàng
                <div class="line"></div>
              </th>
              <th class="th-sticky m-120">
                <div class="border-left"></div>
                Chức năng
              </th>
            </tr>
          </thead>
          <tbody>
            <!--  -->
            <!-- employee detail -->
            <Employee
              style="cursor: pointer"
              v-for="(employee, index) in listEmployee"
              :key="index"
              :index="index"
              :employee="employee"
              @handleGetEmployeeID="getEmployeeID"
              @handleReload="getListEmployee"
              :listDeparment="listDepartment"
              @duplicateEmployee="handleDuplicateEmployee"
              :isCheckBox="isCheckBox"
            />
            <!-- End of employee detail -->
            <!--  -->
          </tbody>
        </table>
      </div>
      <!-- end table-->
      <!--  -->
    </div>
    <!-- Pagination -->
    <!--  -->
    <div class="pagination-container">
      <div class="total-item">
        Tổng số : <span class="total-value">{{ totalItem }}</span> bản ghi
      </div>
      <div class="pagination-wrapper">
        <div class="dropdown-pagiantion">
          <div style="witdh: 200px; height: 32px">
            <Combobox
              v-model="pageSize"
              :value.sync="pageSize"
              :suggestions="options"
              @ChangeValue="handleChangeValue"
            />
          </div>
        </div>
        <div class="paginations">
          <button
            class="pagination-prev-btn"
            :class="[pageInt > 1 ? 'active' : null]"
            @click="handlePrev"
          >
            Trước
          </button>
          <v-pagination
            v-model="pageInt"
            :length="totalPage"
            color="green"
            total-visible="5"
          ></v-pagination>

          <button
            class="pagination-next-btn"
            :class="[pageInt < totalPage ? 'active' : null]"
            @click="handleNext"
          >
            Sau
          </button>
        </div>
      </div>
    </div>
    <!-- End of pagination -->
    <!--  -->
    <!-- end main content -->
    <!--  -->
  </div>
</template>

<script>
//#region Import dữ liệu
import CheckboxField from "../commons/CheckboxField.vue";
import Button from "../commons/Button.vue";
import Combobox from "../commons/Combobox.vue";
import Autocomplete from "../commons/ComboboxAutoComplete.vue";
import InputField from "../commons/InputField.vue";
import axios from "axios";
import "../../css/table.css";
import Employee from "./Employee.vue";
import EmployeeDetail from "./EmployeeDetail.vue";
import queryString from "query-string";
import DialogNotify from "../commons/DialogNotify.vue";
//#endregion

export default {
  //#region Component
  components: {
    CheckboxField,
    Button,
    InputField,
    Employee,
    DialogNotify,
    Combobox,
    Autocomplete,
    EmployeeDetail,
  },
  //#endregion

  //#region Data
  data() {
    return {
      isCheckclone: false, // kiểm tra nhân bản
      isCheckBox: false, // thay đổi checkBox
      filterValue: "", // giá trị ô filter
      isShowDialogAddOrUpdate: false, // ẩn hiện dialog
      isShowTableSelect: false,
      listEmployee: [], // Danh sách nhân viên
      showLoading: false, // ẩn hiện loading
      listDepartment: [], // danh sách phòng ban
      employeeDetail: null, // thông tin nhân viên dùng để sửa
      modeUpdate: false, // thay đổi thêm sang update mode
      pageInt: 1, // trang hiện tại
      pageSize: 20, // số bản ghi trên page
      totalItem: 0, // số lượng bản ghi được trả về
      dialogNotify: false, // hiển thị dialog thông báo cho người dùng
      notifyMessage: "", // message được hiển thị trên dialog
      listDepartmentCombobox: [], // Giá trị option truyền vào combobox
      dialogNotifyDanger: false, // hiển thị dialog cảnh báo
      snackbar: false, // Hiển thị snackbar cảnh báo
      messageSnackbar: "", // thông điệp snackbar
      snackbarSuccess: false, // hiện cảnh báo thành công 
      messageSuccess: "", // thông điệp cảnh báo
      options: [
        {
          value: 10,
          name: "10 bản ghi trên 1 trang",
        },
        {
          value: 20,
          name: "20 bản ghi trên 1 trang",
        },
        {
          value: 30,
          name: "30 bản ghi trên 1 trang",
        },
        {
          value: 50,
          name: "50 bản ghi trên 1 trang",
        },
        {
          value: 100,
          name: "100 bản ghi trên 1 trang",
        },
      ],
    };
  },
  //#endregion
  mounted() {
    this.getListEmployee(); // lấy danh sách nhân viên
    this.getListDepartment(); // lấy danh sách phòng ban
    setTimeout(() => {
      //focus vào ô tìm kiếm
      this.$refs.inputSearch.handleFocus();
    }, 200);
  },

  //#region các hàm Watch
  watch: {
    /**
     * Bắt thay đổi của pageInt
     * CreatedBy: NGDuong (17/08/2021)
     */
    pageInt() {
      this.getListEmployee();
    },

    /**
     * bắt thay đổi của pageSize
     * CreatedBy: NGDuong (17/08/2021)
     */
    pageSize() {
      this.getListEmployee();
      this.pageInt = 1; // set lại về trang đầu tiên
    },
  },
  //#endregion

  //#region các hàm Computed - thực hiện các hàm tính toán
  computed: {
    /**
     * Tạo chuỗi queryString
     * return chuỗi queryString
     * CreatedBy: NGDuong (17/08/2021)
     */
    dataFilter() {
      var fitersStrings = this.filterValue.trim();
      const data = {
        pageInt: this.pageInt,
        pageSize: this.pageSize,
        filterString: fitersStrings,
      };
      return queryString.stringify(data);
    },
    /**
     * Tính số lượng page
     * return : Số lượng page
     * CreatedBy: NGDuong (17/08/2021)
     */
    totalPage() {
      return Math.ceil(this.totalItem / this.pageSize);
    },
  },
  //#endregion

  methods: {
    //#region Các hàm xử lý logic
    /**
     * bắt sự kiện đóng dialog của dialog con
     * CreatedBy: NGDuong (17/08/2021)
     */
    closeDialog() {
      this.isShowDialogAddOrUpdate = false;
    },

    /**
     * bắt sự kiện mở dialog của dialog con
     * CreatedBy: NGDuong (17/08/2021)
     */
    showDialog() {
      this.isShowDialogAddOrUpdate = true;
    },

    /**
     * đóng dialog notify
     * CreatedBy: NGDuong (17/08/2021)
     */
    handleCloseDialog() {
      this.dialogNotify = false;
    },

    /**
     * Đóng mở cảnh báo
     * CreatedBy: NGDuong (24/08/2021)
     */
    handleCloseDangerDialog() {
      this.dialogNotifyDanger = false;
    },

    /**
     * Bắt dự kiện chỉnh sửa
     * CreatedBy: NGDuong (17/08/2021)
     */
    getEmployeeID(id) {
      this.modeUpdate = true; //thay đổi sang updateMode khi thực hiện chỉnh sửa;
      this.getEmployeeInfo(id);
    },

    /**
     * Di chuyển vị trí div theo con trỏ chuột
     * Createdby: NGDuong (17/08/2021)
     */
    mouseLocation() {
      this.$refs.position.style.top += 10 + "px";
      this.$refs.position.style.left += 35 + "px";
    },

    /**
     * Reset EmployeeDetail and mode update
     * CreatedBy: NGDuong (17/08/2021)
     */
    resetEmployeeDetail() {
      this.employeeDetail = null;
      this.modeUpdate = false;
    },

    /**
     * Chuyển đến page đằng trước
     * NGDuong (20/08/2021)
     */
    handlePrev() {
      if (this.pageInt > 1) {
        this.pageInt--;
      }
    },

    /**
     * Chuyển đến page phía sau
     * NGDuong (20/08/2021)
     */
    handleNext() {
      if (this.pageInt < this.totalPage) {
        this.pageInt++;
      }
    },

    /**
     * lấy giá trị pageSize mới
     * @param = "value" : giá trị của page size
     * NGDuong (20/08/2021)
     */
    handleChangeValue(value) {
      this.pageSize = value;
    },

    /**
     * Hiển thị thông bán cho người dùng
     * @param="message" : Nội dung thông báo cần hiển thị
     * NGDuong (20/08/2021)
     */
    handleNotify(message) {
      this.notifyMessage = message;
      this.dialogNotify = true;
    },

    /**
     * thực hiện nhân bản thông tin nhân viên
     * @param="employeeId" : id nhân viên cần lấy thông tin
     * NGDuong (20/08/2021)
     */
    handleDuplicateEmployee(employeeId) {
      this.isCheckclone = true;
      this.getEmployeeInfo(employeeId);
    },

    /**
     * Refresh danh sách nhân viên
     * CreatedBy: NGDuong (17/08/2021)
     */
    RefreshEmployee() {
      this.filterValue = "";
      this.getListEmployee();
    },
    /**
     * Tìm kiếm theo tên hoặc mã nhân viên
     * NGDuong (20/08/2021)
     */
    handelFilter() {
      this.pageInt = 1;
      this.getListEmployee();
    },
    //#endregion

    //#region các hàm gọi API

    /**
     * Lấy danh sách nhân viên
     * CreatedBy: NGDuong (17/08/2021)
     */
    async getListEmployee() {
      // debugger;
      try {
        this.showLoading = true; // hiện loading
        const data = await axios.get(
          `https://localhost:44376/api/v1/Employees/Filter?${this.dataFilter}`
        );
        if (data.data.status == "200") {
          this.listEmployee = data.data.data;
          this.totalItem = data.data.total;
        } else if (data.data.status == "204") {
          this.totalItem = 0;
          this.messageSuccess = data.data.userMsg;
          this.snackbarSuccess = true; // hiển thị thông báo
        } else {
          this.messageSnackbar = data.data.userMsg;
          this.snackbar = true; // hiển thị thông báo
        }
        this.showLoading = false; // ẩn loading
      } catch (error) {
        this.messageSnackbar =
          "Sorry :( Hệ thống đang gặp vấn đề, vui lòng quay trở lại sau!";
        this.snackbar = true; // hiển thị thông báo
        this.showLoading = false; // ẩn loading khi có lỗi
      }
    },

    /**
     * Lấy danh sách phòng ban
     * CreatedBy: NGDuong (17/08/2021)
     */
    async getListDepartment() {
      try {
        this.showLoading = true; // hiện loading
        const data = await axios.get(
          "https://localhost:44376/api/v1/Departments"
        );
        if (data.data.status == "200") {
          this.listDepartment = data.data.data;
        }
        else if(data.data.status == "204"){
          this.messageSuccess = data.data.userMsg;
          this.snackbarSuccess = true;
        }
        else {
          this.messageSnackbar = data.data.userMsg;
          this.snackbar = true;
        }
        this.showLoading = false; // ẩn loading
      } catch (error) {
        this.messageSnackbar =
          "Sorry :( Hệ thống đang gặp vấn đề, thử lại xem sao!";
        this.snackbar = true;
        this.showLoading = false; // ẩn loading khi có lỗi
      }
    },

    /**
     * Lấy thông tin nhân viên theo id
     * @param="employeeId" : id nhân viên cần lấy thông tin
     * CreatedBy: NGDuong (17/08/2021)
     */
    async getEmployeeInfo(employeeId) {
      try {
        this.showLoading = true; // hiện loading
        var code = await this.HandleGetNewEmployeeCode();
        await axios
          .get(`https://localhost:44376/api/v1/Employees/${employeeId}`)
          .then((data) => {
            if (data.data.status == "200") {
              this.employeeDetail = data.data.data;
              if (this.isCheckclone) {
                this.employeeDetail.employeeCode = code;
              }
              this.isCheckclone = false;
              this.showLoading = false; // ẩn loading
              this.showDialog();
            } else {
              this.messageSnackbar = data.data.userMsg;
              this.snackbar = true; // hiển thị thông báo
            }
          });
      } catch (error) {
        this.showLoading = false;
        this.messageSnackbar =
          "Sorry :( Chức năng này đang có vấn đề, vui lòng quay trở lại sau!";
        this.snackbar = true; // hiển thị thông báo
      }
    },

    /**
     * Lấy mã nhân viên mới
     * CreatedBy: NGDuong(22/08/2021)
     */
    async HandleGetNewEmployeeCode() {
      var newEmployeeCode;
      // debugger
      try {
        await axios
          .get("https://localhost:44376/api/v1/Employees/NewCode")
          .then((data) => {
            if (data.data.status == "200") newEmployeeCode = data.data.data;
            else newEmployeeCode = "";
          });
      } catch (error) {
        newEmployeeCode = "";
      }
      return newEmployeeCode;
    },

    /**
     * Xuất dữ liệu ra excel
     * CreatedBy: NGDuong (17/08/2021)
     */
    exportExcel() {
      window.open("https://localhost:44376/api/v1/Employees/Export");
    },
  },

  //#endregion
};
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

/**-----------------loading------------------ */
.loading {
  background-image: url("../../assets/load-data.gif");
  position: fixed;
  top: 40%;
  left: 50%;
  @include widthHeight(100%, 100%);
  z-index: 10001;
}
/** ----------------Container-------------- */
.content-container {
  background: #f4f5f6;
  padding: 0 20px;
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
    }
  }

  .main-content {
    background: #fff;
    padding: 0 20px;
  }
  .table-content {
    overflow: auto;
    display: block;
    height: calc(100vh - 94px - 48px - 64px + 55px);
  }
  /** Scrollbar */
  ::-webkit-scrollbar {
    @include widthHeight(10px, 10px);
    background: $color-white;
  }
  ::-webkit-scrollbar-thumb {
    background: #d4d7dc;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #616164;
  }
  /*-------------------- icon content------------------- */
  .search-content {
    padding: 16px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
  .search-wrapper {
    width: 240px;
  }
  .refresh-icon {
    @include icon(-423px, -201px);
    &:hover {
      cursor: pointer;
      background-position: -1097px -88px;
    }
  }
  .excel-icon {
    @include icon(-704px, -200px);
  }
  .excel-icon:hover {
    background-position: -704px -256px;
  }
  /* Footer-pagination */
  .pagination-container {
    position: sticky;
    bottom: 0;
    left: 0;
    background: $color-white;
    height: 46px;
    @include flex;
    justify-content: space-between;
    border-top: 1px solid #c7c7c7;
    z-index: 102;
  }
  .pagination-wrapper {
    @include flex;
  }
  .paginations {
    @include flex;
    min-width: 300px;
  }
  .dropdown-pagiantion {
    position: relative;
    margin: 0 16px;
    left: 42px;
    width: 198px;
  }
  /* Pagionation */
  .pagination-prev-btn,
  .pagination-next-btn {
    position: relative;
    color: $color-pagination-button;
    cursor: default;
    user-select: none;
  }
  .pagination-prev-btn {
    left: 42px;
  }
  .pagination-next-btn {
    right: 42px;
  }
  .pagination-prev-btn.active,
  .pagination-next-btn.active {
    cursor: pointer;
    color: $color-active;
  }
  .pag-btn {
    margin-right: 13px;
    cursor: pointer;
  }
  .btn-pagination {
    padding: 0 6.5px;
  }
  .btn-pagination.active {
    border: 1px solid #e0e0e0;
    font-weight: 700;
  }
  .next-btn,
  .prev-btn {
    color: $color-pagination-button;
    cursor: default;
    user-select: none;
  }
  .total-value {
    font-weight: 700;
  }
  .list-btn-pagination {
    display: flex;
  }
  .pag-btn.active {
    color: $color-active;
    cursor: pointer;
  }
}
</style>
