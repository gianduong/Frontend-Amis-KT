<template>
  <!-- employee detail -->
  <tr @dblclick="getEmployeeInfoId(employee.employeeId)">
    <td class="table-checkbox" @click="handleCheckBox">
      <CheckboxField :isCheck="isCheckBoxSingle" />
    </td>
    <td>{{ employee.employeeCode }}</td>
    <td>{{ employee.fullName }}</td>
    <td>{{ employee.genderName }}</td>
    <td>{{ employee.dateOfBirth | formatDate }}</td>
    <td>{{ employee.identityNumber }}</td>
    <td>{{ employee.positionName }}</td>
    <td>{{ employee.positionName }}</td>
    <td
      class="sticky no--right-border"
      :style="
        showDropTop
          ? { 'z-index': 100 - index + 5 }
          : { 'z-index': 100 - index }
      "
    >
      <div class="border-left border-left--dotted"></div>
      <div class="fix-container">
        <span @click="getEmployeeInfoId(employee.employeeId)">Lập CT mua hàng</span>

        <div class="choose-btn" @focusout="closeDrop">
          <!-- dropdown -->
          <div class="drop-container" tabindex="0">
            <div
              class="drop-icon-wrap"
              @click="handelShowDrop"
              :class="showDrop ? 'active' : null"
            >
              <div class="drop-icon"></div>
            </div>
            <div
              class="drop-option"
              :class="[
                showDropTop ? 'drop-top' : null,
                showDrop ? 'active' : null,
              ]"
            >
              <div
                class="option"
                @click="$emit('duplicateEmployee', employee.employeeId)"
              >
                Xem
              </div>
              <div
                class="option"
                @click="$emit('duplicateEmployee', employee.employeeId)"
              >
                Sửa
              </div>
              <div
                class="option"
                @click="$emit('duplicateEmployee', employee.employeeId)"
              >
                Nhân bản
              </div>
              <div class="option" @click="dialogConfirm = true">Xóa</div>
              <div class="option">Ngừng sử dụng</div>
            </div>
          </div>
          <!-- Dialog confirm -->
          <v-dialog :persistent="true" v-model="dialogConfirm" width="444px">
            <DialogNotify
              :employeeCode="employee.employeeCode"
              @closeDialog="handleCloseDialog"
              @onDelete="deleteEmployee(employee.employeeId)"
              type="confirm"
            />
          </v-dialog>
          <!-- End of dialog test -->
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
          <!-- End of dropdown -->
        </div>
      </div>
      <!-- <div class="line"></div> -->
    </td>
  </tr>
  <!-- End of employee detail -->
</template>

<script>
//#region Import dữ liệu
import CheckboxField from "../commons/CheckboxField.vue";
import DialogNotify from "../commons/DialogNotify.vue";
import axios from "axios";
import moment from "moment";
//#endregion

export default {
  //#region Props
  props: ["employee", "listDeparment", "index", "isCheck", "isCheckBox"],
  //#endregion

  //#region Components
  components: {
    CheckboxField,
    DialogNotify,
  },
  //#endregion

  //#region Data
  data() {
    return {
      isCheckBoxSingle: false, // Thay đổi giá trị prop
      dialogConfirm: false, // cảnh báo khi đóng dialog
      showDrop: false, // đóng mở dropdown
      showDropTop: false, // điều chỉnh hướng mở option lên trên
      snackbar: false, // Hiển thị snackbar cảnh báo
      messageSnackbar: "", // thông điệp snackbar
      snackbarSuccess: false,
      messageSuccess: "",
    };
  },
  //#endregion

  // #region Watch
  watch: {
    /**
     * cập nhật sự thay đổi giá trị của isCheckBox gửi lên từ content
     * CreatedBy: NGDuong (19/08/2021)
     */
    isCheckBox: function (value) {
      this.isCheckBoxSingle = value;
    },
  },
  // end region

  //#region Filter
  filters: {
    /**
     * Hàm fomat thời gian
     * Createdby: NGDuong (19/08/2021)
     */
    formatDate(value) {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY");
      }
    },
    /**
     * hàm fomat giới tính
     * Createdby: NGDuong (19/08/2021)
     */
    fomatGender(value) {
      if (value == 0) {
        return "Nữ";
      } else if (value == 1) {
        return "Nam";
      } else {
        return "Khác";
      }
    },
  },
  //#endRegion

  //#region Computed
  computed: {
    /**
     * format dữ liệu tên phòng ban theo id nhận được
     * CreateBy : NGDuong(19/08/2021)
     */
    formatDeparmentName() {
      // debugger
      for (let i = 0; i < this.listDeparment.length; i++) {
        if (this.listDeparment[i].deparmentId === this.employee.deparmentId)
          return this.listDeparment[i].deparmentName;
      }
      return null;
    },
  },
  // #endregion

  //#region Methods
  methods: {
    /**
     * Lấy id nhân viên để thực hiện tác vụ sửa / nhân bản
     * @param="id" : id nhân viên cần lấy thông tin
     * CreateBy : NGDuong(19/08/2021)
     */
    getEmployeeInfoId(id) {
      this.$emit("handleGetEmployeeID", id);
    },

    /**
     * Xóa nhân viên theo id
     * @param="employeeId" : mã nhân viên cần xóa
     * CreatedBy : NGDuong(19/08/2021)
     */
    async deleteEmployee(employeeId) {
      try {
        this.showLoading = true; // hiện loading
        await axios
          .delete(
            `https://localhost:44376/api/v1/Employees/${this.employee.employeeId}`
          )
          .then((data) => {
            this.showLoading = false; // ẩn loading
            this.dialogConfirm = false; // đóng dialog confirm
            this.$emit("handleReload"); // reload sau khi xóa
            this.messageSuccess = data.data.userMsg;
            this.snackbarSuccess = true;
          })
          .catch((data) => {
            this.messageSnackbar = data.data.userMsg;
            this.snackbar = true;
            showLoading = false;
            this.dialogConfirm = false; // đóng dialog confirm
          });
      } catch (error) {
        showLoading = false;
        this.dialogConfirm = false; // đóng dialog confirm
      }
    },

    /**
     * thay đổi giá trị checkbox
     * CreatedBy: NGDuong (19/08/2021)
     */
    handleCheckBox() {
      this.isCheckBoxSingle = !this.isCheckBoxSingle;
    },
    /**
     * đóng dialog confirm
     * CreatedBy : NGDuong(19/08/2021)
     */
    handleCloseDialog() {
      this.dialogConfirm = false;
    },

    /**
     * dóng mở dropdown
     * CreatedBy : NGDuong(19/08/2021)
     */
    handelShowDrop(e) {
      if (e.screenY > 550) {
        this.showDropTop = true;
      }
      this.showDrop = !this.showDrop;
      if (!this.showDrop) {
        this.showDropTop = false;
      }
    },

    /**
     * đóng option và reset các thuộc tính
     * CreatedBy : NGDuong(19/08/2021)
     */
    closeDrop() {
      this.showDrop = false;
      this.showDropTop = false;
    },
  },
  //#endregion
};
</script>

<style lang="scss" scoped>
.fix-container {
  position: relative;
  z-index: 5;
}
.fix-container span {
  cursor: pointer;
}
.drop-container {
  position: relative;
}
.drop-icon-wrap {
  padding: 0 5px;
  border: 1px solid transparent;
  width: 26px;
  &.active {
    border-color: #0075c0;
  }
}
.drop-option {
  position: absolute;
  top: calc(100% + 10px);
  right: -10px;
  visibility: hidden;
  opacity: 0;
  border: 1px solid #babec5;
  width: 120.6px;
  border-radius: 3px;
  background: #fff;
  padding: 2px 1px;

  &.active {
    visibility: visible;
    opacity: 1;
    top: calc(100% + 7px);
    transition: 0.2s linear;
  }
  .drop-top {
    position: absolute;
    bottom: calc(100% + 10px);
    right: -10px;
    top: auto;

    &.active {
      bottom: calc(100% + 7px);
    }
  }
}

.drop-icon {
  width: 16px;
  height: 14px;
  max-height: 16px;
  max-width: 16px;
  background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat -897px -360px;
}

.option {
  padding: 5px 10px;
  text-align: left;
  &:hover {
    background: #e8e9ec;
    color: #08bf1e;
  }
}
</style>
