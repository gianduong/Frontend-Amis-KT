<template>
  <div class="content-container">
    <div class="content-title">
      <h3 class="title-name">
        <h3 class="title-name">Danh sách nhà cung cấp</h3>
        <router-link to="/CA/CAProcess">&#10094; Tất cả danh mục</router-link>
      </h3>

      <!-- Dialog add  -->
      <!--  -->
      <div class="title-option">
        <div class="mi-tour mi mi-24" style="border: 1px solid black"></div>
        <router-link
          class="link-huong-dan"
          to="/CA/CAProcess"
          style="margin: 10px 20px 0 20px"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on" style="z-index: 1999"
                >Hướng dẫn</span
              >
            </template>
            <span>Hướng dẫn</span>
          </v-tooltip>
        </router-link>

        <v-menu v-model="menuUtilities" bottom offset-y left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              rounded
              color="#ffffff"
              style="border: 1px solid black; text-transform: none; color: #111"
            >
              Tiện ích
              <div class="mi-arrow-up--black mi mi-16"></div>
            </v-btn>
          </template>
          <v-card height="40px" width="260px">
            <v-btn width="100%" height="100%" @click="dialogSuppliers = true">
              Gộp nhà cung cấp tự động
            </v-btn>
          </v-card>
        </v-menu>
      </div>
      <v-dialog v-model="dialogSuppliers" width="500px">
        <v-card width="500px" height="500px">
          <h1>Gộp nhà cung cấp tự động</h1>
          
        </v-card>
      </v-dialog>
      <div class="dialog-add-update">
        <v-dialog
          v-model="isShowDialogAddOrUpdate"
          width="900px"
          :persistent="true"
        >
          <template v-slot:activator="{ on, attrs }">
            <div class="btn-add" v-bind="attrs" v-on="on">
              <Button content="Thêm" v-bind="attrs" v-on="on" />
            </div>
          </template>

          <v-card height="620px" @keydown.esc="closeDialog">
            <SupplierDetail
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
      <v-snackbar
        v-model="snackbarSuccess"
        top
        color="blue lighten-2"
        timeout="3000"
      >
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
    <div class="tab-sort" :class="{ 'tab-sort-hidden': isTabSortHidden }">
      <v-tooltip bottom style="z-index: 100000">
        <template v-slot:activator="{ on, attrs }">
          <v-tabs
            v-bind="attrs"
            v-on="on"
            background-color="#FF7F2C"
            height="60px"
            class="tab-sort-item"
          >
            <v-tab style="color: #fff; text-transform: none">
              <div>
                <div class="tab-number tab-number-margin-1">100</div>
                <span>Nợ quá hạn</span>
              </div>
              <div class="funnel-icon mi funnel-icon-position-no">
                <div class="space-3">.</div>
                <div class="space-3">.</div>
              </div>
            </v-tab>
          </v-tabs>
        </template>
        <span>Tùy chỉnh giao diện</span>
      </v-tooltip>

      <v-tabs
        background-color="#B8BCC3"
        show-arrows
        height="60px"
        class="tab-sort-item"
      >
        <v-tab style="color: #fff; text-transform: none">
          <div>
            <div class="tab-number tab-number-margin-2">100</div>
            <span>Tổng nợ phải thu</span>
          </div>
          <div class="funnel-icon mi funnel-icon-position-thu">
            <div class="space-3">.</div>
          </div></v-tab
        >
      </v-tabs>
      <v-tabs background-color="#74CB2F" show-arrows height="60px">
        <v-tab style="color: #fff; text-transform: none"
          >Đã thanh toán(30 ngày gần đây)
          <div class="space-3">.</div></v-tab
        >
      </v-tabs>
    </div>
    <!-- main content -->
    <!--  -->
    <div :class="{ loading: showLoading }"></div>
    <div class="main-content">
      <div
        class="box-resize mi-24"
        @click="isTabSortHidden = !isTabSortHidden"
        :class="{ 'box-rotate': !isTabSortHidden }"
      >
        <div
          class="mi mi-16 mi-chevron-down--primary"
          style="margin-left: 3px"
        ></div>
      </div>
      <div class="search-content">
        <div class="mi-arrow-check-all mi mi-24"></div>
        <v-btn
          class="btn-execution-position"
          rounded
          disabled
          color="#ffffff"
          style="border: 1px solid black; text-transform: none"
        >
          Thực hiện hàng loạt
          <div class="mi-arrow-up--black mi mi-16"></div>
        </v-btn>

        <v-menu
          style="z-index: 100000"
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="200"
          bottom
          offset-y
          left
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              class="btn-filter-position"
              rounded
              color="#ffffff"
              style="border: 1px solid black; text-transform: none; color: #111"
            >
              Lọc
              <div class="mi-arrow-up--black mi mi-16"></div>
            </v-btn>
          </template>

          <v-card width="533px" height="292px">
            <div class="card-filter">
              <div class="card-filter-1">
                <div class="flex-collum size-49">
                  <label>Loại</label>
                  <v-autocomplete
                    solo
                    v-model="options.value"
                    :items="options"
                    item-text="name"
                    item-value="value"
                    no-data-text="Không có dữ liệu"
                  ></v-autocomplete>
                </div>
                <div class="flex-collum size-49">
                  <label>Nhóm</label>
                  <v-autocomplete
                    solo
                    v-model="options.value"
                    :items="options"
                    item-text="name"
                    item-value="value"
                    no-data-text="Không có dữ liệu"
                  ></v-autocomplete>
                </div>
              </div>
              <div class="card-filter-2">
                <div class="flex-collum size-49">
                  <label>Tình trạng công nợ</label>
                  <v-autocomplete
                    solo
                    v-model="options.value"
                    :items="options"
                    item-text="name"
                    item-value="value"
                    no-data-text="Không có dữ liệu"
                  ></v-autocomplete>
                </div>
                <div class="flex-collum size-49">
                  <label>Trạng thái</label>
                  <v-autocomplete
                    solo
                    v-model="options.value"
                    :items="options"
                    item-text="name"
                    item-value="value"
                    no-data-text="Không có dữ liệu"
                  ></v-autocomplete>
                </div>
              </div>
              <div class="card-filter-3">
                <div class="flex-collum size-32">
                  <label>Tỉnh/TP</label>
                  <v-autocomplete
                    solo
                    v-model="options.value"
                    :items="options"
                    item-text="name"
                    item-value="value"
                    no-data-text="Không có dữ liệu"
                  ></v-autocomplete>
                </div>
                <div class="flex-collum size-32">
                  <label>Quận/Huyện</label>
                  <v-autocomplete
                    solo
                    v-model="options.value"
                    :items="options"
                    item-text="name"
                    item-value="value"
                    no-data-text="Không có dữ liệu"
                  ></v-autocomplete>
                </div>
                <div class="flex-collum size-32">
                  <label>Xã/Phường</label>
                  <v-autocomplete
                    solo
                    v-model="options.value"
                    :items="options"
                    item-text="name"
                    item-value="value"
                    no-data-text="Không có dữ liệu"
                  ></v-autocomplete>
                </div>
              </div>
              <div class="card-filter-4"></div>
              <div class="card-filter-5">
                <div class="btn-cancel">
                  <Button :content="'Đặt lại'" :btnWhite="true" tabindex="0" />
                </div>
                <div class="btn-action">
                  <Button :content="'Lọc'" tabindex="0" />
                </div>
              </div>
            </div>
          </v-card>
        </v-menu>
        <div class="search-wrapper">
          <InputField
            :placeholder="'Nhập từ khóa tìm kiếm'"
            :searchField="true"
            v-model="filterValue"
            v-debounce:300ms="handelFilter"
            ref="inputSearch"
          />
        </div>
        <v-tooltip bottom style="z-index: 100000">
          <template v-slot:activator="{ on, attrs }">
            <div @click="RefreshEmployee" v-bind="attrs" v-on="on">
              <div class="refresh-icon"></div>
            </div>
          </template>
          <span>Refresh</span>
        </v-tooltip>

        <v-tooltip bottom style="z-index: 100000">
          <template v-slot:activator="{ on, attrs }">
            <div @click="exportExcel" v-bind="attrs" v-on="on">
              <div class="excel-icon"></div>
            </div>
          </template>
          <span>Xuất ra file</span>
        </v-tooltip>

        <v-tooltip bottom style="z-index: 100000">
          <template v-slot:activator="{ on, attrs }">
            <div @click="exportExcel" v-bind="attrs" v-on="on">
              <div class="setting-icon"></div>
            </div>
          </template>
          <span>Tùy chỉnh giao diện</span>
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
              <th class="m-180">
                Mã nhà cung cấp
                <div class="line"></div>
              </th>
              <th class="m-400">
                Tên nhà cung cấp
                <div class="line"></div>
              </th>
              <th class="m-180">
                Địa chỉ
                <div class="line"></div>
              </th>
              <th class="m-150">
                Mã số thuế
                <div class="line"></div>
              </th>
              <th class="m-150">
                Điện thoại
                <div class="line"></div>
              </th>
              <th class="m-150">
                Số CMND
                <div class="line"></div>
              </th>
              <th class="th-sticky m-250">
                <div class="border-left"></div>
                Chức năng
              </th>
            </tr>
          </thead>
          <tbody>
            <!--  -->
            <!-- employee detail -->
            <SupplierRow
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
import Employee from "../Employee/Employee.vue";
import SupplierDetail from "./SupplierDetail.vue";
import SupplierRow from "./SupplierRow.vue";
import EmployeeDetail from "../Employee/EmployeeDetail.vue";
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
    SupplierDetail,
    SupplierRow,
  },
  //#endregion

  //#region Data
  data() {
    return {
      dialog: false,
      dialog2: false,
      dialog3: false,
      dialogSuppliers: false,
      menu: false, // menu lọc
      menuUtilities: false, // Menu tiện ích
      isTabSortHidden: false, // kiểm tra tab sort
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
        } else if (data.data.status == "204") {
          this.messageSuccess = data.data.userMsg;
          this.snackbarSuccess = true;
        } else {
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
      display: flex;
      flex-direction: column;
      font-size: 24px;
      font-family: "notosans-bold";
      color: #111;
    }

    .title-option {
      @include flex;
      width: 76%;
      justify-content: flex-end;
    }

    .link-huong-dan {
      text-decoration: none;
      margin-top: 5px;
    }
    .link-huong-dan:hover {
      text-decoration: underline;
    }

    .menu-utilities-position {
      position: absolute;
      right: 20px;
    }
  }

  .box-resize {
    border: 1px solid #c7c7c7;
    align-items: center;
    display: flex;
    position: relative;
    top: -12px;
    right: -1536px;
    z-index: 10000;
  }

  .box-rotate {
    transform: rotate(180deg);
  }

  .tab-sort-hidden {
    display: none;
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
    padding: 0 16px 16px 16px;
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

  .setting-icon {
    @include icon(-88px, -200px);
  }
  .setting-icon:hover {
    background-position: -88px -256px;
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
.flex-collum {
  display: flex;
  flex-direction: column;
}
/** icon */
.mi-tour {
  background-position: -984px -145px;
}
.mi-24 {
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
}
.mi-16 {
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
}

.mi {
  background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat;
  cursor: pointer;
}

.mi-arrow-check-all {
  background-position: -256px -143px;
  position: absolute;
  left: 40px;
}

.mi-arrow-up--black {
  background-position: -560px -359px;
}

.mi-chevron-down--primary {
  background-position: -176px -360px;
}

.funnel-icon {
  height: 22px;
  position: absolute;
  width: 18px;
  background-position: -1814px -202px;
}

.funnel-icon-position-no {
  right: -400px;
  top: 5px;
}

.funnel-icon-position-thu {
  right: -360px;
  top: 5px;
}

/** tab */
.tab-sort {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}
.tab-sort-item {
  margin-right: 10px;
}

/** btn */
.btn-execution-position {
  position: absolute;
  left: 80px;
}
.btn-filter-position {
  position: absolute;
  left: 285px;
}
/** Card filter */
.card-filter {
  display: flex;
  flex-direction: column;
  @include widthHeight(100%, 100%);
  align-items: center;
  .card-filter-1 {
    @include widthHeight(94%, 20%);
    margin-top: 4%;
    @include flex;
    justify-content: space-between;
  }
  .card-filter-2 {
    @include widthHeight(94%, 20%);
    @include flex;
    justify-content: space-between;
  }
  .card-filter-3 {
    @include widthHeight(94%, 20%);
    @include flex;
    justify-content: space-between;
  }
  .card-filter-4 {
    @include widthHeight(94%, 0.5%);
    background: #e0e0e0;
    margin-top: 4%;
  }
  .card-filter-5 {
    @include widthHeight(94%, 20%);
    bottom: 4%;
    position: absolute;

    .btn-cancel {
      margin-top: 10px;
    }

    .btn-action {
      position: absolute;
      right: 0;
      top: 10px;
    }
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
  .help-icon {
    background-position: -89px -144px;
    margin-right: 10px;
  }
  .close-icon {
    background-position: -144px -144px;
  }
}

/**--------------Linh tinh------ */
/** size */
.size-49 {
  width: 49%;
}

.size-45 {
  width: 45%;
}
.size-32 {
  width: 32.6%;
}
.size-100 {
  width: 100%;
}

.space-3 {
  position: absolute;
  right: -244px;
}

.tab-number {
  font-size: 22px;
}
.tab-number-margin-1 {
  margin-left: -50px;
}
.tab-number-margin-2 {
  margin-left: -88px;
}
.tab-number-margin-3 {
  margin-left: -50px;
}
</style>
