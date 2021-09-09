<template>
  <div class="modal-container">
    <!-- thông báo -->
    <!-- thông báo thêm -->
    <v-dialog :persistent="true" v-model="dialogNotifyConfirm" width="444px">
      <DialogNotify
        @closeDialog="handleCloseConfirmDialog"
        type="notify-note"
        :notifyMessage="notifyMessage"
        @closeAllDialog="handleCloseAllDialog"
        @onAddOrUpdate="handleAddOrUpdate"
      />
    </v-dialog>
    <!-- Cảnh báo nhập sai -->
    <v-dialog v-model="dialogNotifyError" width="444px">
      <DialogNotify
        @closeDialog="handleCloseErrorDialog"
        type="notify-error"
        :notifyMessage="notifyMessage"
      />
    </v-dialog>
    <!-- cảnh báo xóa hoặc không lưu -->
    <v-dialog v-model="dialogNotifyDanger" width="444px">
      <DialogNotify
        @closeDialog="handleCloseDangerDialog"
        type="notify-danger"
        :notifyMessage="notifyMessage"
      />
    </v-dialog>
    <!-- region snackbar -->
    <v-snackbar v-model="snackbar" top>
      {{ messageSnackbar }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Đóng
        </v-btn>
      </template>
    </v-snackbar>
    <!-- end region -->
    <!-- bảng thêm mới, cập nhật nhân viên -->
    <div class="main-container">
      <!-- thoát -->
      <div class="container-title">
        <h1>Thông tin nhân viên</h1>
        <div class="checkbox">
          <div @click="isCheckBox = !isCheckBox">
            <CheckboxField
              :isCheck="!isCheckBox"
              v-on:click="handleCheckBox"
              :content="'Là khách hàng'"
              style="margin-right: 20px"
            />
          </div>
          <div @click="isCheckBox = !isCheckBox">
            <CheckboxField
              :content="'Là nhà cung cấp'"
              :isCheck="isCheckBox"
              v-on:click="handleCheckBox"
            />
          </div>
        </div>
        <div class="modal-close">
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
                @click="onClose"
                v-bind="attrs"
                v-on="on"
              ></div>
            </template>
            <span>Thoát (ESC)</span>
          </v-tooltip>
        </div>
      </div>
      <!-- nhân viên -->
      <div class="container-attribute">
        <div class="attribute-top">
          <div class="att-left">
            <div class="left-1">
              <div class="attr-ma">
                <div class="resize resize-left">
                  <InputField
                    :label="'Mã'"
                    :required="true"
                    v-model="employee.employeeCode"
                    :errorNotify="errorNotifyCode"
                    ref="toFocus"
                  />
                </div>
              </div>
              <div class="attr-ten" style="width: 262px">
                <div class="resize resize-right">
                  <InputField
                    :label="'Tên'"
                    :required="true"
                    v-model="employee.fullName"
                    :errorNotify="errorNotifyFullName"
                  />
                </div>
              </div>
            </div>
            <div class="left-2">
              <div class="resize resize-left">
                <label>Đơn vị <a style="color: red">*</a></label>
                <v-autocomplete
                  style="border-bottom: 1.5px solid green"
                  solo
                  color="green"
                  v-model="employee.deparmentId"
                  :items="listDepartment"
                  item-text="deparmentName"
                  item-value="deparmentId"
                  no-data-text="Không có dữ liệu"
                  :error="errorNotifyDepartment.status"
                  :error-messages="errorNotifyDepartment.errorMessage"
                ></v-autocomplete>
              </div>
            </div>
            <div class="left-3">
              <div class="resize resize-left">
                <InputField
                  :label="'Chức danh'"
                  v-model="employee.positionName"
                />
              </div>
            </div>
          </div>
          <div class="att-right">
            <div class="right-1">
              <div class="attr-dob">
                <div class="resize">
                  <InputField
                    :label="'Ngày sinh'"
                    type="date"
                    v-model="employee.dateOfBirth"
                    :errorNotify="errorNotifyDob"
                  />
                </div>
              </div>
              <div class="attr-gender">
                <div class="resize">
                  <v-radio-group v-model="employee.gender">
                    <label class="gender-label">Giới tính</label>
                    <div class="radio-container">
                      <v-radio
                        :label="'Nam'"
                        :value="1"
                        color="#2ca01c"
                      ></v-radio>
                      <v-radio
                        :label="'Nữ'"
                        :value="0"
                        color="#2ca01c"
                      ></v-radio>
                      <v-radio
                        :label="'Khác'"
                        :value="2"
                        color="#2ca01c"
                      ></v-radio>
                    </div>
                  </v-radio-group>
                </div>
              </div>
            </div>
            <div class="right-2">
              <div class="attr-CMT">
                <div class="resize">
                  <InputField
                    :label="'Số CMND'"
                    v-model="employee.identityNumber"
                  />
                </div>
              </div>
              <div class="attr-cap">
                <div class="resize">
                  <InputField
                    :label="'Ngày cấp'"
                    type="date"
                    v-model="employee.identityDate"
                    :errorNotify="errorNotifyIdentityDate"
                  />
                </div>
              </div>
            </div>
            <div class="right-3">
              <div class="resize">
                <InputField
                  :label="'Nơi cấp'"
                  style="margin-right: -5px"
                  v-model="employee.identityPlace"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="attribute-bottom">
          <div class="bottom-1">
            <div class="resize">
              <InputField
                style="margin-right: -20px"
                :label="'Địa chỉ'"
                v-model="employee.address"
              />
            </div>
          </div>
          <div class="bottom-2">
            <div class="attr-phone">
              <div class="resize">
                <label>ĐT di động</label>
                <v-text-field
                  :rules="PhoneNumberRules"
                  v-model="employee.phoneNumber"
                  class="text-field"
                ></v-text-field>
                <!-- <InputField
                  :label="'ĐT di động'"
                  v-model="employee.phoneNumber"
                /> -->
              </div>
            </div>
            <div class="attr-homePhone">
              <div class="resize">
                <label>ĐT cố định</label>
                <v-text-field
                  :rules="HomePhoneRules"
                  v-model="employee.landlinePhone"
                  class="text-field"
                ></v-text-field>
                <!-- <InputField
                  :label="'ĐT cố định'"
                  v-model="employee.landlinePhone"
                /> -->
              </div>
            </div>
            <div class="attr-email">
              <div class="resize">
                <label>Email</label>
                <v-text-field
                  :rules="EmailRules"
                  v-model="employee.email"
                  class="text-field"
                ></v-text-field>
                <!-- <InputField
                  :label="'Email'"
                  v-model="employee.email"
                  @blur="validateEmail"
                /> -->
              </div>
            </div>
          </div>
          <div class="bottom-3">
            <div class="attr-account">
              <div class="resize">
                <InputField
                  :label="'Tài khoản ngân hàng'"
                  v-model="employee.bankAccount"
                />
              </div>
            </div>
            <div class="attr-bank">
              <div class="resize">
                <InputField
                  :label="'Tên ngân hàng'"
                  v-model="employee.bankName"
                />
              </div>
            </div>
            <div class="attr-location">
              <div class="resize">
                <InputField
                  :label="'Chi nhánh'"
                  v-model="employee.bankBranch"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- button -->
      <div class="container-bottom">
        <div class="btn-close">
          <div
            class="resize"
            @click="$emit('handleCloseDialog')"
            @keydown.enter="HandleEnter('Hủy')"
          >
            <Button :content="'Hủy'" :btnWhite="true" tabindex="0" />
          </div>
        </div>
        <div class="btn-save">
          <div class="btn-cat">
            <div
              class="resize"
              @click="handleAddOrUpdate"
              @keydown.enter="HandleEnter('Cất')"
            >
              <Button :content="'Cất'" :btnWhite="true" tabindex="0" />
            </div>
          </div>
          <div class="btn-saveAndAdd">
            <div
              class="resize"
              @click="handleSaveAndAdd"
              @keydown.enter="HandleEnter('Cất và Thêm')"
            >
              <Button :content="'Cất và Thêm'" tabindex="0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//#region Import dữ liệu
import Button from "../commons/Button.vue";
import InputField from "../commons/InputField.vue";
import CheckboxField from "../commons/CheckboxField.vue";
import DefaultEmployee from "../constant/DefaultEmployee";
import DialogNotify from "../commons/DialogNotify.vue";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
//#endregion

export default {
  //#region Props
  props: [
    "dialogAddOrUpdate",
    "listDepartment",
    "employeeDetail",
    "modeUpdate",
  ],
  //#endregion
  //#region Data
  data() {
    return {
      // Nhân viên và các trường của nhân viên
      employee: {
        employeeId: "",
        employeeCode: "",
        fullName: "",
        deparmentId: "",
        gender: 1,
        dateOfBirth: null,
        identityNumber: "",
        identityDate: null,
        identityPlace: "",
        positionName: "",
        address: "",
        phoneNumber: "",
        landlinePhone: "",
        email: "",
        bankAccount: "",
        bankName: "",
        bankBranch: "",
      },

      PhoneNumberRules: [
        // Validate số điện thoại
        (v) =>
          !v ||
          /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(v) ||
          "Số điện thoại không hợp lệ!",
      ],
      HomePhoneRules: [
        // validate số điện thoại bàn
        (v) =>
          !v ||
          /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{5})$/.test(v) ||
          "Số điện thoại bàn không hợp lệ!",
      ],
      EmailRules: [
        // validate email
        (v) =>
          !v ||
          /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) ||
          "Email không hợp lệ!",
      ],
      isCheckBox: false, // thay đổi CheckBox
      compareObject: null, // object lưu dữ liệu nhân viên để so sánh thay đổi
      notifyMessage: "", // Nội dùng dialog
      dialogNotifyError: false, // hiển thị dialog thông báo lỗi
      dialogNotifyDanger: false, // hiển thị dialog cảnh báo
      dialogNotifyConfirm: false, // hiển thị dialog thông báo
      saveAndAddMode: false, // chế độ cất và thêm
      snackbar: false, // Hiển thị snackbar cảnh báo
      messageSnackbar: "", // thông điệp snackbar
      errorNotifyCode: {
        // trạng thái & thông điệp lỗi
        status: false,
        errorMessage: "",
      },
      errorNotifyFullName: {
        // trạng thái & thông điệp lỗi
        status: false,
        errorMessage: "",
      },
      errorNotifyDepartment: {
        // trạng thái & thông điệp lỗi
        status: false,
        errorMessage: "",
      },
      errorNotifyDob: {
        // trạng thái & thông điệp lỗi
        status: false,
        errorMessage: "",
      },
      errorNotifyIdentityDate: {
        // trạng thái & thông điệp lỗi
        status: false,
        errorMessage: "",
      },
    };
  },
  //#endregion

  //#region Component
  components: {
    Button,
    InputField,
    CheckboxField,
    DialogNotify,
  },
  //#endregion

  //#region Created
  created() {
    if (this.employeeDetail) {
      this.employee = { ...this.employeeDetail };
      // format giá trị ngày tháng
      this.employee.dateOfBirth = this.formatDateEmployee(
        this.employee.dateOfBirth
      );
      this.employee.identityDate = this.formatDateEmployee(
        this.employee.identityDate
      );
    } else {
      this.getNewEmployeeCode();
    }
    setTimeout(() => {
      this.$refs.toFocus.handleFocus();
    }, 200);
  },
  //#endregion

  //#region Watch
  watch: {
    /**
     * theo dõi đóng mở dialog và thực hiện các tác vụ
     * CreatedBy : NGDuong(21/08/2021)
     */
    dialogAddOrUpdate() {
      // đóng dialog
      // tác vụ : reset dialog, reset các lỗi validate của field, kiểm tra sự thay đổi của field
      if (!this.dialogAddOrUpdate) {
        this.employee = { ...DefaultEmployee }; // reset dialog
        const resetData = {
          status: false,
          errorMessage: "",
        };
        this.errorNotifyCode = { ...resetData }; // reset hiển thị validate Code
        this.errorNotifyFullName = { ...resetData }; // reset hiển thị validate fullName
        this.errorNotifyDepartment = { ...resetData }; // reset hiển thị validate department
        this.saveAndAddMode = false;
        this.$emit("resetEmployeeDetail");
      }
      // Mở dialog
      // tác vụ : lấy mã nhân viên mới
      else {
        if (!this.employeeDetail) {
          this.getNewEmployeeCode(); // lấy mã nhân viên khi dialog được show
        }
        setTimeout(() => {
          this.$refs.toFocus.handleFocus();
        }, 200);
      }
    },

    /**
     * Theo dõi giá trị thông tin nhân viên
     * CreatedBy: NGDuong(21/08/2021)
     */
    employeeDetail() {
      // format giá trị ngày tháng
      if (this.employeeDetail) {
        this.employee = { ...this.employeeDetail };
        this.employee.dateOfBirth = this.formatDateEmployee(
          this.employee.dateOfBirth
        );
        this.employee.identityDate = this.formatDateEmployee(
          this.employee.identityDate
        );
      }
      //
    },

    /**
     * Theo dõi giá trị mã nhân viên thay đổi
     * CreatedBy : NGDuong(21/08/2021)
     */
    "employee.employeeCode"() {
      if (this.employee.employeeCode.length > 0) {
        this.errorNotifyCode.status = false;
      }
    },

    /**
     * Theo dõi giá trị tên nhân viên thay đổi
     * CreatedBy: NGDuong(21/08/2021)
     */
    "employee.fullName"() {
      if (this.employee.fullName.length > 0) {
        this.errorNotifyFullName.status = false;
      }
    },

    /**
     * Theo dõi id phòng ban thay đổi
     * CreatedBy : NGDuong(19/08/2021)
     */
    "employee.deparmentId"() {
      if (this.employee.deparmentId.length > 0) {
        this.errorNotifyDepartment.status = false;
        this.errorNotifyDepartment.errorMessage = "";
      }
    },
  },
  //#endregion

  //#region Methods
  methods: {
    //#region Các hàm xử lý logic

    /**
     * Cập nhật khi ấn enter ở button
     * CreatedBy: NGDuong (19/08/2021)
     */
    HandleEnter(value) {
      if (value === "Hủy") {
        this.$emit("handleCloseDialog");
      } else if (value === "Cất") {
        this.handleAddOrUpdate();
      } else if (value === "Cất và Thêm") {
        this.handleSaveAndAdd();
      } else {
      }
    },
    /**
     * Thay đổi chế độ cất và thêm
     * CreatedBy : NGDuong(20/08/2021)
     *
     */
    handleSaveAndAdd() {
      // kiểm tra validate dữ liệu
      this.saveAndAddMode = true; // bật mode cất và thêm
      if (this.validate()) {
        if (!this.modeUpdate) {
          this.handleAdd();
        } else this.handelUpdate();
      }
    },

    /**
     * thêm hoặc sửa nhân viên
     * CreatedBy : NGDuong(20/08/2021)
     */
    handleAddOrUpdate() {
      // kiểm tra validate dữ liệu
      if (this.validate()) {
        if (!this.modeUpdate) {
          this.handleAdd();
        } else this.handelUpdate();
        // đóng dialog nếu không có lỗi
        if (!this.dialogNotifyDanger) {
          this.$emit("handleCloseDialog"); // Ẩn dialog là resetdialog
        }
      }
    },

    /**
     * Thay đổi tùy chọn là nhân viên hay nhà cung cấp
     * CreatedBy: NGDuong (19/08/2021)
     */
    handleCheckBox() {
      this.isCheckBox = !this.isCheckBox;
    },

    /**
     * Get dữ liệu đã chọn từ auto complete
     * CreatedBy: NGDuong (19/08/2021)
     */
    getDepartmentId(data) {
      this.employee.deparmentId = data;
    },
    /**
     * đóng dialog cảnh báo
     * CreatedBy : NGDuong(19/08/2021)
     */

    // #Region đóng mở cảnh báo

    handleCloseDangerDialog() {
      this.dialogNotifyDanger = false;
    },

    /**
     * đóng dialog báo lỗi
     * CreatedBy : NGDuong(19/08/2021)
     */
    handleCloseErrorDialog() {
      this.dialogNotifyError = false;
    },

    /**
     * đóng dialog báo lỗi
     * CreatedBy : NGDuong(19/08/2021)
     */
    handleCloseConfirmDialog() {
      this.dialogNotifyConfirm = false;
    },

    /**
     * đóng tất cả dialog hiện tại
     * CreatedBy: NGDuong(19/08/2021)
     */
    handleCloseAllDialog() {
      this.handleCloseConfirmDialog();
      this.$emit("handleCloseDialog");
    },
    // end region

    /**
     * Kiểm tra dữ liệu
     * CreatedBy : NGDuong(22/08/2021)
     */
    validate() {
      var isValid = true;
      if (this.employee.fullName.length == 0) {
        // Kiểm tra fullname không được để trống
        this.notifyMessage = "Tên không được để trống";
        this.errorNotifyFullName.status = true;
        this.errorNotifyFullName.errorMessage = "Tên không được để trống";
        this.dialogNotifyError = true;
        isValid = false;
      }

      if (this.employee.deparmentId.length == 0) {
        // kiểm tra không được để trống
        this.notifyMessage = "Đơn vị không được để trống";
        this.errorNotifyDepartment.status = true;
        this.errorNotifyDepartment.errorMessage = "Đơn vị không được để trống";
        this.dialogNotifyError = true;
        isValid = false;
      }

      if (this.employee.employeeCode.length == 0) {
        // kiểm tra không được để trống
        this.notifyMessage = "Mã nhân viên không được để trống";
        this.errorNotifyCode.status = true;
        this.errorNotifyCode.errorMessage = "Mã không được để trống";
        this.dialogNotifyError = true;
        isValid = false;
      }
      if (this.employee.dateOfBirth != null) {
        // so sánh với ngày hiện tại
        if (this.validateDate(this.employee.dateOfBirth)) {
          this.dialogNotifyError = true;
          this.notifyMessage = "Ngày sinh không được vượt quá ngày hiện tại";
          isValid = false;
        }
      }
      if (this.employee.identityDate != null) {
        // so sánh với ngày hiện tại
        if (this.validateDate(this.employee.identityDate)) {
          this.dialogNotifyError = true;
          this.notifyMessage = "Ngày cấp không được vượt quá ngày hiện tại";
          isValid = false;
        }
      }
      if (
        this.employee.identityDate != null &&
        this.employee.dateOfBirth != null
      ) {
        // so sánh 2 date
        if (
          this.compareDate(
            this.employee.dateOfBirth,
            this.employee.identityDate
          )
        ) {
          this.dialogNotifyError = true;
          this.notifyMessage = "Ngày cấp CMT không được nhỏ hơn ngày sinh";
          isValid = false;
        }
      }
      return isValid;
    },
    /**
     * validate thời gian
     * CreatedBy: NGDuong (24/08/2021)
     */
    validateDate(value) {
      var date = value.split("-"); // tách thành ngày tháng năm riêng để gán thành Date
      var countOfDay = new Date();
      countOfDay.setFullYear(date[0], date[1] - 1, date[2]); // chuyển thành ngày để so sánh
      var today = new Date(); // lấy ngày hiện tại
      var now = new Date();
      now.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
      if (countOfDay > now) return true;
      return false;
    },
    /**
     * So sánh 2 ngày bất kì với nhau
     * CreatedBy: NGDuong (24/08/2021)
     */
    compareDate(dateA, dateB) {
      var date1 = dateA.split("-");
      var firstDate = new Date();
      firstDate.setFullYear(date1[0], date1[1] - 1, date1[2]); // chuyển thành ngày để so sánh
      var date2 = dateB.split("-");
      var secondDate = new Date();
      secondDate.setFullYear(date2[0], date2[1] - 1, date2[2]); // chuyển thành ngày để so sánh

      if (firstDate > secondDate) return true;
      return false;
    },
    /**
     * Hàm validate email
     * CreatedBy: NGDuong (19/08/2021)
     */
    validateEmail() {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        this.msg["email"] = "Vui lòng nhập đúng định dạng email";
      } else {
        this.msg["email"] = "";
      }
    },

    /**
     * format lại giá trị ngày tháng để hiển thị
     * @param="date" : giá trị ngày cần format
     * CreatedBy : NGDuong(20/08/2021)
     */
    formatDateEmployee(date) {
      if (date) {
        return this.formatDate(date);
      }
      return null;
    },

    /**
     * chuyển đổi giá trị ngày tháng về yyyy-mm-dd
     * @param="date" : giá trị ngày cần format
     * CreatedBy : NGDuong(20/08/2021)
     */
    formatDate(date) {
      if (date) {
        const newDate = new Date(date);
        let strDay = newDate.getDate();
        let strMonth = newDate.getMonth() + 1;
        let strYear = newDate.getFullYear();
        if (strDay < 10) strDay = `0${strDay}`;
        if (strMonth < 10) strMonth = `0${strMonth}`;
        return `${strYear}-${strMonth}-${strDay}`;
      }
      return null;
    },

    /**
     * bắt sự kiện đóng dialog và thực hiện so sánh dữ liệu để đưa ra thông báo
     * CreatedBy : NGDuong(21/08/2021)
     */
    onClose() {
      if (this.modeUpdate) {
        var compareObject = this.employeeDetail;
        compareObject.dateOfBirth = this.formatDate(compareObject.dateOfBirth);
        compareObject.identityDate = this.formatDate(
          compareObject.identityDate
        );
        // kiểm tra xem có thay đổi dữ liệu không, nếu có thì đưa ra cảnh báo, nếu không thì thôi :v
        if (!this.handleCompareObject(compareObject, this.employee)) {
          this.dialogNotifyConfirm = true;
        } else this.$emit("handleCloseDialog");
      } else this.$emit("handleCloseDialog");
    },

    /**
     * Kiểm tra xem có sự thay đổi dữ liệu hay không
     * @param="object1" : object cần so sánh
     * @param="object2" : object cần so sách
     * CreatedBy : NGDuong(22/08/2021)
     */
    handleCompareObject(object1, object2) {
      const keys1 = Object.keys(object1);
      const keys2 = Object.keys(object2);
      if (keys1.length !== keys2.length) {
        return false;
      }
      for (let key of keys1) {
        if (object1[key] !== object2[key]) {
          return false;
        }
      }
      return true;
    },
    //#endregion

    //#region Các hàm gọi API
    /**
     * Kiểm tra mã nhân viên đã tồn tại trong hệ thống chưa
     * return:
     *  true: Có tồn tại
     *  false: không tồn tại
     * CreatedBy: NGDuong (19/08/2021)
     */
    async handleCheckCodeExists() {
      try {
        const data = await axios.get(
          `https://localhost:44376/api/v1/Employees/CodeExists?code=${this.employee.employeeCode}`
        );
        if (data.status == "200") {
          return true;
        }
      } catch (error) {}
      return false;
    },

    /**
     * thêm nhân viên
     * CreatedBy : NGDuong(20/08/2021)
     */
    async handleAdd() {
      this.employee.employeeId = uuidv4();
      try {
        const data = await axios({
          method: "post",
          url: "https://localhost:44376/api/v1/Employees",
          data: this.employee,
        });
        if (data.data.status == "200")
          this.$emit("onNotify", data.data.userMsg);
        else {
          this.notifyMessage = data.data.userMsg;
          this.dialogNotifyDanger = true; // hiển thị dialog cảnh báo
        }
        if (this.saveAndAddMode) {
          var newCode = await this.getNewEmployeeCode(); // lấy mã nhân viên mới
          this.employee = { ...DefaultEmployee, employeeCode: newCode }; // resetDialog
          // reset data
          const resetData = {
            status: false,
            errorMessage: "",
          };
          this.errorNotifyCode = { ...resetData }; // reset hiển thị validate Code
          this.errorNotifyFullName = { ...resetData }; // reset hiển thị validate fullName
          this.errorNotifyDepartment = { ...resetData }; // reset hiển thị validate department
          this.$emit("resetEmployeeDetail");
        }
        this.$emit("handleReload"); // load lại dữ liệu
      } catch (error) {
        this.messageSnackbar =
          "Sorry :( Hệ thống đang gặp vấn đề, thử lại xem sao!";
        this.snackbar = true;
      }
    },
 
    /**
     * Cập nhật thông tin nhân viên
     * CreatedBy : NGDuong(20/08/2021)
     */
    async handelUpdate() {
      try {
        const data = await axios({
          method: "put",
          url: `https://localhost:44376/api/v1/Employees/${this.employee.employeeId}`,
          data: this.employee,
        });
        if (data.data.status == "200")
          this.$emit("onNotify", data.data.userMsg);
        else {
          this.notifyMessage = data.data.userMsg;
          this.dialogNotifyDanger = true; // hiển thị dialog cảnh báo
        }
        if (this.saveAndAddMode) {
          var newCode = await this.getNewEmployeeCode(); // lấy mã nhân viên mới
          this.employee = { ...DefaultEmployee, employeeCode: newCode }; // resetDialog
          // reset data
          const resetData = {
            status: false,
            errorMessage: "",
          };
          this.errorNotifyCode = { ...resetData }; // reset hiển thị validate Code
          this.errorNotifyFullName = { ...resetData }; // reset hiển thị validate fullName
          this.errorNotifyDepartment = { ...resetData }; // reset hiển thị validate department
          this.$emit("resetEmployeeDetail");
        }
        this.$emit("handleReload"); // load laị dữ liệu
      } catch (error) {
        this.messageSnackbar =
          "Sorry :( Hệ thống đang gặp vấn đề, thử lại xem sao!";
        this.snackbar = true;
      }
    },

    /**
     * Lấy mã nhân viên mới
     * CreatedBy: NGDuong(20/08/2021)
     */
    async getNewEmployeeCode() {
      try {
        const data = await axios.get(
          "https://localhost:44376/api/v1/Employees/NewCode"
        );
        this.employee.employeeCode = data.data.data;
        return data.data.data;
      } catch (error) {}
    },
    //#endregion
  },
  //#endregion
};
</script>

<style lang="scss" scoped>
/** Biến dùng chung */
$color-white: #fff;
$color-title: #111;

/**Hàm dùng chung */
@mixin flex {
  display: flex;
  align-items: center;
}

@mixin widthHeight($w, $h) {
  width: $w;
  height: $h;
}
/** ---------------CSS------------- */
.modal-container {
  position: relative;
  background: #fff;
  height: 100%;
  overflow: hidden;
  box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%),
    0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);

  .main-container {
    display: flex;
    flex-direction: column;
    @include widthHeight(100%, 100%);

    .container-title {
      @include widthHeight(100%, 10%);
      @include flex;
      h1 {
        margin-left: 30px;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
      }
      .checkbox {
        margin: 0 15px 0 15px;
        @include flex;
        width: 63%;
        min-width: 60px;
      }
      .modal-close {
        padding-left: 12px;
        margin-right: 10px;
        @include flex;

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
    }
    .container-attribute {
      @include widthHeight(100%, 75%);
      display: flex;
      flex-direction: column;

      .attribute-top {
        @include flex;
        @include widthHeight(100%, 50%);

        .att-left {
          display: flex;
          flex-direction: column;
          @include widthHeight(50%, 100%);

          .left-1 {
            @include widthHeight(100%, 33.33%);
            @include flex;
            .attr-ma {
              @include widthHeight(40%, 100%);
            }
            .attr-ten {
              @include widthHeight(60%, 100%);
            }
          }
          .left-2 {
            @include widthHeight(100%, 33.33%);
          }
          .left-3 {
            @include widthHeight(100%, 33.33%);
          }
        }
        .att-right {
          display: flex;
          flex-direction: column;
          @include widthHeight(50%, 100%);

          .right-1 {
            @include flex;
            @include widthHeight(100%, 33.33%);

            .attr-dob {
              @include widthHeight(40%, 100%);
            }
            .attr-gender {
              @include widthHeight(60%, 100%);
              margin-top: 20px;
            }
          }
          .right-2 {
            @include flex;
            @include widthHeight(100%, 33.33%);

            .attr-CMT {
              @include widthHeight(55%, 100%);
            }
            .attr-cap {
              @include widthHeight(40%, 100%);
            }
          }
          .right-3 {
            @include widthHeight(100%, 33.33%);
          }
        }
      }
      .attribute-bottom {
        display: flex;
        flex-direction: column;
        @include widthHeight(90%, 50%);
        .bottom-1 {
          @include widthHeight(112%, 33.33%);
          min-width: 80%;
          margin-left: 25px;
        }
        .bottom-2 {
          @include widthHeight(100%, 33.33%);
          @include flex;
          margin-left: 25px;
          .attr-phone {
            @include widthHeight(25%, 100%);
          }
          .attr-homePhone {
            @include widthHeight(25%, 100%);
          }
          .attr-email {
            @include widthHeight(25%, 100%);
          }
        }
        .bottom-3 {
          @include widthHeight(100%, 33.33%);
          @include flex;
          margin-left: 25px;
          .attr-account {
            @include widthHeight(25%, 100%);
            min-width: 25%;
          }
          .attr-bank {
            @include widthHeight(25%, 100%);
          }
          .attr-location {
            @include widthHeight(25%, 100%);
          }
        }
      }
    }
    .container-bottom {
      @include widthHeight(95%, 15%);
      display: flex;
      justify-content: space-between;
      margin-left: 2.5%;
      border-top: 1px solid #e0e0e0;

      .btn-close {
        @include widthHeight(10%, 100%);
        margin-left: 5px;
        margin-top: 20px;
      }

      .btn-save {
        @include widthHeight(25%, 100%);
        @include flex;
        margin-top: 20px;
        padding-left: 10px;
        .btn-cat {
          @include widthHeight(30%, 100%);
          margin-right: 10px;
        }

        .btn-saveAndAdd {
          @include widthHeight(70%, 100%);
        }
      }
    }
  }
}

.resize {
  @include widthHeight(90%, 45%);
  margin: 10px 0 0 5px;
}

.resize-left {
  margin-left: 30px;
}

.resize-right {
  margin: 10px 20px 0 20px;
}

// ---------radio----------
.radio-container {
  @include flex;
  justify-content: center;
}

.gender-label {
  margin-bottom: 8px;
  margin-left: 20px;
}

.text-field {
  margin-top: -12px;
}
</style>
