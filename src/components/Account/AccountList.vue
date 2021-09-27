<template>
  <div class="content-container">
    <div class="account-detail" :class="{ hidden: !isShowDialogAddOrUpdate }">
      <div class="account-model"></div>
      <div
        class="account-dialog"
        :class="{ 'resize-dialog-rotate': isFullSize }"
      >
        <div class="account-title">
          <div class="title-detail">Thêm tài khoản</div>
          <div
            class="resize-dialog"
            @click="isFullSize = !isFullSize"
            :class="{ 'rotate-resize': isFullSize }"
          >
            <div
              class="mi mi-16 mi-chevron-left"
              :class="{ 'rotate-icon': isFullSize }"
            ></div>
          </div>
          <div class="modal-close">
            <v-tooltip bottom style="z-index: 100000">
              <template v-slot:activator="{ on, attrs }">
                <div
                  class="modal-icon help-icon"
                  v-bind="attrs"
                  v-on="on"
                ></div>
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
        <div class="account-content">
          <div class="top-content-1">
            <InputField class="h-32 w-24" :label="'Số tài khoản'" />
          </div>
          <div class="top-content-2">
            <InputField class="h-32 w-49" :label="'Tên tài khoản'" />
            <InputField class="h-32 w-49" :label="'Tên tiếng anh'" />
          </div>
          <div class="top-content-3">
            <div class="h-32 w-24" style="margin-right: 1%">
              <label>Tài khoản tổng hợp</label>
              <v-autocomplete
                solo
                v-model="options.value"
                :items="options"
                item-text="name"
                item-value="value"
                no-data-text="Không có dữ liệu"
              ></v-autocomplete>
            </div>
            <div class="h-32 w-24">
              <label>Tính chất <span style="color: red">*</span></label>
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
          <div class="top-content-4">
            <TextAreaField class="h-32 w-100" :rows="2" :label="'Diễn giải'" />
          </div>
          <div class="top-content-5">
            <CheckboxField
              :isCheck="isCheckBox"
              v-on:click="isCheckBox = !isCheckBox"
              :content="'Có hạch toán ngoại tệ'"
            />
          </div>
          <div
            class="bottom-content-1"
            @click="followedDetail = !followedDetail"
          >
            <div
              class="mi mi-16 mi-arrow-right--black"
              :class="{ 'rotate-icon-90': !followedDetail }"
            ></div>
            <span class="content-1-title" style="font-size: 16px"
              >Theo giõi chi tiết theo</span
            >
          </div>
          <div
            class="bottom-content-detail"
            :class="{ hidden: followedDetail }"
          >
            <div class="content-detail-1">
              <div class="content-child">
                <v-checkbox
                  class="w-40"
                  label="Đối tượng"
                  color="success"
                  @click="isHideDoiTuong = !isHideDoiTuong"
                  hide-details
                ></v-checkbox>
                <div class="w-40 h-32" :class="{ hidden: !isHideDoiTuong }">
                  <v-autocomplete
                    solo
                    v-model="options.value"
                    :items="options"
                    item-text="name"
                    item-value="value"
                    no-data-text="Không có dữ liệu"
                  ></v-autocomplete>
                </div>
                <div class="w-40 h-32" :class="{ hidden: isHideDoiTuong }">
                  <v-autocomplete
                    disabled
                    solo
                    v-model="options.value"
                    :items="options"
                    item-text="name"
                    item-value="value"
                    no-data-text="Không có dữ liệu"
                  ></v-autocomplete>
                </div>
              </div>
              <div class="content-child">
                <v-checkbox
                  class="w-40"
                  label="Tài khoản ngân hàng"
                  color="success"
                  hide-details
                ></v-checkbox>
              </div>
            </div>
            <div class="content-detail-1">
              <div class="content-child">
                <v-checkbox
                  class="w-40"
                  label="Đối tượng THCP"
                  color="success"
                  @click="isHideDoiTuongTHCP = !isHideDoiTuongTHCP"
                  hide-details
                ></v-checkbox>
                <div class="w-40 h-32" :class="{ hidden: !isHideDoiTuongTHCP }">
                  <v-autocomplete
                    solo
                    v-model="options.value"
                    :items="options"
                    item-text="name"
                    item-value="value"
                    no-data-text="Không có dữ liệu"
                  ></v-autocomplete>
                </div>
                <div class="w-40 h-32" :class="{ hidden: isHideDoiTuongTHCP }">
                  <v-autocomplete
                    solo
                    disabled
                    v-model="options.value"
                    :items="options"
                    item-text="name"
                    item-value="value"
                    no-data-text="Không có dữ liệu"
                  ></v-autocomplete>
                </div>
              </div>
              <div class="content-child">
                <v-checkbox
                  class="w-40"
                  label="Công trình"
                  color="success"
                  @click="isHideCongTrinh = !isHideCongTrinh"
                  hide-details
                ></v-checkbox>
                <div class="w-40 h-32" :class="{ hidden: !isHideCongTrinh }">
                  <v-autocomplete
                    solo
                    v-model="options.value"
                    :items="options"
                    item-text="name"
                    item-value="value"
                    no-data-text="Không có dữ liệu"
                  ></v-autocomplete>
                </div>
                <div class="w-40 h-32" :class="{ hidden: isHideCongTrinh }">
                  <v-autocomplete
                    solo
                    disabled
                    v-model="options.value"
                    :items="options"
                    item-text="name"
                    item-value="value"
                    no-data-text="Không có dữ liệu"
                  ></v-autocomplete>
                </div>
              </div>
            </div>
            <div class="content-detail-1">
              <div class="content-child">
                <v-checkbox
                  class="w-40"
                  label="Đơn đặt hàng"
                  color="success"
                  @click="isHideDonDatHang = !isHideDonDatHang"
                  hide-details
                ></v-checkbox>
                <div class="w-40 h-32" :class="{ hidden: !isHideDonDatHang }">
                  <v-autocomplete
                    solo
                    v-model="options.value"
                    :items="options"
                    item-text="name"
                    item-value="value"
                    no-data-text="Không có dữ liệu"
                  ></v-autocomplete>
                </div>
                <div class="w-40 h-32" :class="{ hidden: isHideDonDatHang }">
                  <v-autocomplete
                    solo
                    disabled
                    v-model="options.value"
                    :items="options"
                    item-text="name"
                    item-value="value"
                    no-data-text="Không có dữ liệu"
                  ></v-autocomplete>
                </div>
              </div>
              <div class="content-child">
                <v-checkbox
                  class="w-40"
                  label="Hợp đồng bán"
                  color="success"
                  @click="isHideHopDongBan = !isHideHopDongBan"
                  hide-details
                ></v-checkbox>
                <div class="w-40 h-32" :class="{ hidden: !isHideHopDongBan }">
                  <v-autocomplete
                    solo
                    v-model="options.value"
                    :items="options"
                    item-text="name"
                    item-value="value"
                    no-data-text="Không có dữ liệu"
                  ></v-autocomplete>
                </div>
                <div class="w-40 h-32" :class="{ hidden: isHideHopDongBan }">
                  <v-autocomplete
                    solo
                    disabled
                    v-model="options.value"
                    :items="options"
                    item-text="name"
                    item-value="value"
                    no-data-text="Không có dữ liệu"
                  ></v-autocomplete>
                </div>
              </div>
            </div>
            <div class="content-detail-1">
              <div class="content-child">
                <v-checkbox
                  class="w-40"
                  label="Hợp đồng mua"
                  color="success"
                  @click="isHideHopDongMua = !isHideHopDongMua"
                  hide-details
                ></v-checkbox>
                <div class="w-40 h-32" :class="{ hidden: !isHideHopDongMua }">
                  <v-autocomplete
                    solo
                    v-model="options.value"
                    :items="options"
                    item-text="name"
                    item-value="value"
                    no-data-text="Không có dữ liệu"
                  ></v-autocomplete>
                </div>
                <div class="w-40 h-32" :class="{ hidden: isHideHopDongMua }">
                  <v-autocomplete
                    solo
                    disabled
                    v-model="options.value"
                    :items="options"
                    item-text="name"
                    item-value="value"
                    no-data-text="Không có dữ liệu"
                  ></v-autocomplete>
                </div>
              </div>
              <div class="content-child">
                <v-checkbox
                  class="w-40"
                  label="Khoản mục CP"
                  color="success"
                  @click="isHideKhoanMucCP = !isHideKhoanMucCP"
                  hide-details
                ></v-checkbox>
                <div class="w-40 h-32" :class="{ hidden: !isHideKhoanMucCP }">
                  <v-autocomplete
                    solo
                    v-model="options.value"
                    :items="options"
                    item-text="name"
                    item-value="value"
                    no-data-text="Không có dữ liệu"
                  ></v-autocomplete>
                </div>
                <div class="w-40 h-32" :class="{ hidden: isHideKhoanMucCP }">
                  <v-autocomplete
                    solo
                    disabled
                    v-model="options.value"
                    :items="options"
                    item-text="name"
                    item-value="value"
                    no-data-text="Không có dữ liệu"
                  ></v-autocomplete>
                </div>
              </div>
            </div>
            <div class="content-detail-1">
              <div class="content-child">
                <v-checkbox
                  class="w-40"
                  label="Đơn vị"
                  color="success"
                  @click="isHideDonVi = !isHideDonVi"
                  hide-details
                ></v-checkbox>
                <div class="w-40 h-32" :class="{ hidden: !isHideDonVi }">
                  <v-autocomplete
                    solo
                    v-model="options.value"
                    :items="options"
                    item-text="name"
                    item-value="value"
                    no-data-text="Không có dữ liệu"
                  ></v-autocomplete>
                </div>
                <div class="w-40 h-32" :class="{ hidden: isHideDonVi }">
                  <v-autocomplete
                    solo
                    disabled
                    v-model="options.value"
                    :items="options"
                    item-text="name"
                    item-value="value"
                    no-data-text="Không có dữ liệu"
                  ></v-autocomplete>
                </div>
              </div>
              <div class="content-child">
                <v-checkbox
                  class="w-40"
                  label="Mã thống kê"
                  color="success"
                  @click="isHideMaThongKe = !isHideMaThongKe"
                  hide-details
                ></v-checkbox>
                <div class="w-40 h-32" :class="{ hidden: !isHideMaThongKe }">
                  <v-autocomplete
                    solo
                    v-model="options.value"
                    :items="options"
                    item-text="name"
                    item-value="value"
                    no-data-text="Không có dữ liệu"
                  ></v-autocomplete>
                </div>
                <div class="w-40 h-32" :class="{ hidden: isHideMaThongKe }">
                  <v-autocomplete
                    solo
                    disabled
                    v-model="options.value"
                    :items="options"
                    item-text="name"
                    item-value="value"
                    no-data-text="Không có dữ liệu"
                  ></v-autocomplete>
                </div>
              </div>
            </div>
          </div>
          <div class="container-bottom">
            <div class="btn-close">
              <Button
                @click="$emit('handleCloseDialog')"
                @keydown.enter="HandleEnter('Hủy')"
                :content="'Hủy'"
                :btnWhite="true"
                tabindex="0"
              />
            </div>
            <div class="btn-save">
              <div class="btn-cat">
                <Button :content="'Cất'" :btnWhite="true" tabindex="0" />
              </div>
              <div class="btn-saveAndAdd">
                <Button :content="'Cất và Thêm'" tabindex="0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-title">
      <h3 class="title-name">
        <h3 class="title-name">Hệ thống tài khoản</h3>
        <router-link to="/CA/CAProcess">&#10094; Tất cả danh mục</router-link>
      </h3>

      <!-- Dialog add  -->
      <!--  -->
      <div class="title-option">
        <v-menu v-model="menuUtilities" bottom offset-y left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              rounded
              color="#F4F5F8"
              style="border: 1px solid black; text-transform: none; color: #111"
            >
              Chuyển tài khoản hạch toán
            </v-btn>
          </template>
          <v-card height="30px" width="200px">
            <v-btn
              width="100%"
              height="100%"
              @click="dialogAccounts = true"
              style="text-transform: none"
            >
              Gộp nhà cung cấp tự động
            </v-btn>
          </v-card>
        </v-menu>
      </div>
      <v-dialog v-model="dialogAccounts" width="500px">
        <v-card width="500px" height="340px">
          <div class="modal-close">
            <div class="modal-icon help-icon"></div>
            <div
              class="modal-icon close-icon"
              @click="dialogAccounts = false"
            ></div>
          </div>
          <div class="dl">Gộp nhà cung cấp tự động</div>
          <div class="note">
            Chọn thông tin bạn muốn sử dụng để xác định nhà cung cấp trùng nhau
          </div>
          <div class="Account-opton">
            <div class="Account-option-item">
              <CheckboxField :isCheck="true" />&emsp; Tên nhà cung cấp
            </div>
            <div class="Account-option-item">
              <CheckboxField :isCheck="true" />&emsp; Mã số thuế
            </div>
            <div class="Account-option-item">
              <CheckboxField :isCheck="true" />&emsp; Số điện thoại
            </div>
            <div class="Account-option-item">
              <CheckboxField :isCheck="true" />&emsp; Địa chỉ
            </div>
          </div>
          <div class="line-border">
            <Button :content="'Hủy'" :btnWhite="true" tabindex="0" />

            <Button :content="'Lấy nhà cung cấp'" tabindex="0" />
          </div>
        </v-card>
      </v-dialog>

      <div class="dialog-add-update">
        <div class="btn-add" @click="isShowDialogAddOrUpdate = true">
          <!-- <Button content="Thêm" v-bind="attrs" v-on="on" /> -->
          <v-btn
            style="border-radius: 30px 0 0 30px; margin-left: 10px"
            color="#2CA01C"
            v-bind="attrs"
            v-on="on"
            ><span style="color: #fff; text-transform: none">Thêm</span></v-btn
          >
        </div>
        <div class="btn-middle-line"></div>

        <v-menu v-model="menuExcel" bottom offset-y left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              style="border-radius: 0 30px 30px 0"
              min-width="30px"
              color="#2CA01C"
              ><div class="mi-arrow-up--white mi mi-16"></div
            ></v-btn>
          </template>
          <v-card height="30px" width="119px">
            <v-btn
              width="100%"
              height="100%"
              @click="dialogExcel = true"
              style="text-transform: none"
            >
              Nhập từ Excel
            </v-btn>
          </v-card>
        </v-menu>
        <v-dialog
          style="background: #f4f5f8"
          class="DialogImportExcel"
          v-model="dialogExcel"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card color="#F4F5F8">
            <v-toolbar color="#F4F5F8">
              <v-toolbar-title class="excel-title"
                >Nhập nhà cung cấp từ Excel</v-toolbar-title
              >
              <v-spacer></v-spacer>
              <div class="modal-close" style="margin: 10px 10px 0 0">
                <div class="modal-icon help-icon"></div>
                <div
                  class="modal-icon close-icon"
                  @click="dialogExcel = false"
                ></div>
              </div>
            </v-toolbar>
            <v-divider></v-divider>
            <v-stepper v-model="e1" alt-labels color="#F4F5F8">
              <v-stepper-header style="background: #f4f5f8">
                <v-stepper-step :complete="e1 > 1" step="1" color="#2CA01C">
                  CHỌN TỆP NGUỒN
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 2" step="2" color="#2CA01C">
                  GHÉP DỮ LIỆU
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3" color="#2CA01C">
                  KIỂM TRA DỮ LIỆU
                </v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step step="4" color="#2CA01C">
                  KẾT QUẢ
                </v-stepper-step>
              </v-stepper-header>

              <v-stepper-items>
                <v-stepper-content step="1" style="background: #f4f5f8">
                  <v-card width="100%" color="#F4F5F8" height="626px">
                    <div class="selected-file">
                      <div class="mi mi-attach mi-16"></div>
                      <span class="span-select">chọn tệp Excel</span>
                      <span class="span-size">Dung lượng tối đa: 20MB</span>
                    </div>
                    <div class="input-file">
                      <input type="file" id="files" class="hidden" />
                      <label class="file-place" for="files"
                        >Kéo thả tệp vào đây hoặc bấm vào đây</label
                      >
                    </div>
                    <div class="down-filebase">
                      <span class="span-down">Tải tệp mẫu cơ bản</span>
                      <div
                        class="mi-download mi mi-16"
                        style="margin-right: 10px"
                      ></div>
                      <span class="span-down">Tải tệp mẫu đầy đủ</span>
                      <div class="mi-download mi mi-16"></div>
                    </div>
                    <div class="file-info">
                      <div>
                        <label>Sheet chứa dữ liệu</label>
                        <v-autocomplete
                          solo
                          v-model="options.value"
                          :items="options"
                          item-text="name"
                          item-value="value"
                          no-data-text="Không có dữ liệu"
                        ></v-autocomplete>
                      </div>
                      <div>
                        <label>Bảng tiêu đề là dòng số</label>
                        <InputField style="background: #fff" />
                      </div>
                    </div>
                    <div class="file-option">
                      <span>Phương thức nhập</span>
                      <v-radio-group v-model="isAddExcel">
                        <div class="option-radio" style="margin: 0px 0 0 15px">
                          <v-radio
                            :value="1"
                            label="Thêm mới"
                            color="#2ca01c"
                          ></v-radio>
                          <div class="spacer-midle"></div>
                          <v-radio
                            :value="2"
                            label="Cập nhật"
                            color="#2ca01c"
                          ></v-radio>
                        </div>
                      </v-radio-group>
                    </div>
                  </v-card>
                  <div class="btn-position">
                    <v-btn
                      color="#38393D"
                      @click="dialogExcel = false"
                      class="btn-close-position"
                      style="border: 1px solid #f4f5f8"
                    >
                      Hủy
                    </v-btn>
                    <v-btn
                      color="#2CA01C"
                      @click="e1 = 2"
                      style="margin-right: 20px"
                    >
                      Tiếp tục
                    </v-btn>
                  </div>
                  <div data-v-5d5c961c="" class="suggestion flex">
                    <div data-v-5d5c961c="" class="inner-suggestion">
                      <div data-v-5d5c961c="" class="flex items-center">
                        <div data-v-5d5c961c="" class="suggestion-icon"></div>
                        <div data-v-5d5c961c="" class="label suggestion-label">
                          Gợi ý
                        </div>
                      </div>
                      <div
                        data-v-5d5c961c=""
                        class="suggestion-content download-template"
                      >
                        <ul data-v-5d5c961c="" class="suggest-list">
                          <li data-v-5d5c961c="">
                            <!---->
                            <div data-v-5d5c961c="">
                              <a
                                data-v-5d5c961c=""
                                href="https://actapp.misa.vn/g2/api/file/v1/file?type=16&amp;file=Mau_danh_muc_nha_cung_cap.xls&amp;dbid=129712a1-347d-4a8c-ad6d-0be77b6fc77e&amp;height=-1&amp;width=-1"
                                ><span data-v-5d5c961c="" class="download"
                                  >Tải tệp mẫu cơ bản</span
                                ></a
                              >
                              để nhập những thông tin cơ bản.
                            </div>
                          </li>
                          <li data-v-5d5c961c="">
                            <a
                              data-v-5d5c961c=""
                              href="https://actapp.misa.vn/g2/api/file/v1/file?type=16&amp;file=Mau_danh_muc_nha_cung_cap_full.xls&amp;dbid=129712a1-347d-4a8c-ad6d-0be77b6fc77e&amp;height=-1&amp;width=-1"
                              ><span data-v-5d5c961c="" class="download"
                                >Tải tệp mẫu đầy đủ</span
                              ></a
                            >
                            để nhập tất cả các thông tin.
                          </li>
                          <li data-v-5d5c961c="">
                            Các thiết lập trong quá trình nhập sẽ được lưu để sử
                            dụng trong các lần tiếp sau.
                          </li>
                          <li data-v-5d5c961c="">
                            <b data-v-5d5c961c="">Thêm mới:</b> Dữ liệu trên tệp
                            mà chưa có trong hệ thống sẽ được thêm mới vào. Dữ
                            liệu mà đã có trên hệ thống sẽ không được cập nhật
                            vào.
                          </li>
                          <li data-v-5d5c961c="">
                            <b data-v-5d5c961c="">Cập nhật:</b> Dữ liệu trên tệp
                            mà chưa có trong hệ thống sẽ được thêm mới vào. Dữ
                            liệu mà đã có trên hệ thống sẽ được cập nhật vào.
                          </li>
                          <!---->
                        </ul>
                      </div>
                    </div>
                  </div>
                </v-stepper-content>

                <v-stepper-content step="2">
                  <v-card
                    class="mb-12"
                    color="grey lighten-1"
                    height="200px"
                  ></v-card>

                  <v-btn color="primary" @click="e1 = 3"> Continue </v-btn>

                  <v-btn text> Cancel </v-btn>
                </v-stepper-content>

                <v-stepper-content step="3">
                  <v-card
                    class="mb-12"
                    color="grey lighten-1"
                    height="200px"
                  ></v-card>

                  <v-btn color="primary" @click="e1 = 1"> Continue </v-btn>

                  <v-btn text> Cancel </v-btn>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
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
    <!-- main content -->
    <!--  -->
    <div :class="{ loading: showLoading }"></div>
    <div class="main-content">
      <div class="search-content">
        <div class="search-wrapper">
          <InputField
            :placeholder="'Tìm kiếm theo số, tên tài khoản'"
            :searchField="true"
            v-model="filterValue"
            v-debounce:300ms="handelFilter"
            ref="inputSearch"
          />
        </div>

        <v-tooltip bottom style="z-index: 100000">
          <template v-slot:activator="{ on, attrs }">
            <div
              @click="RefreshEmployee"
              v-bind="attrs"
              v-on="on"
              class="collapse-table"
            >
              Thu gọn
            </div>
          </template>
          <span>Thu gọn dữ liệu</span>
        </v-tooltip>

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
      </div>
      <!--  -->
      <!-- Table -->

      <div class="table-content">
        <!-- <tree-table class="table" :columns="columns" :table-data="tableData">
          <template #headerTemplate="headerProps">
            <MenuHeader v-bind="headerProps" :sort-table="sortTable" />
          </template>

          <template #leafTemplate="leafProps">
            <MenuLeaf v-bind="leafProps" />
          </template>

          <template #nodeTemplate="nodeProps">
            <MenuNode v-bind="nodeProps" />
          </template>
        </tree-table> -->
        <tree-table class="table" :columns="columns" :table-data="tableData">
          <template #headerTemplate="headerProps">
            <MenuHeader v-bind="headerProps" :sort-table="sortTable" />
          </template>
          <template #leafTemplate="leafProps">
            <MenuLeaf v-bind="leafProps" />
          </template>
          <template #nodeTemplate="nodeProps">
            <MenuNode v-bind="nodeProps" />
          </template>
        </tree-table>
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
    </div>
    <!-- End of pagination -->
    <!--  -->
    <!-- end main content -->
    <!--  -->
  </div>
</template>

<script>
//#region Import dữ liệu
import MenuNode from './SortingNode'
import MenuHeader from "./SortingHeader";
import sortData from "../constant/SortData";
import CheckboxField from "../commons/CheckboxField.vue";
import Button from "../commons/Button.vue";
import Combobox from "../commons/Combobox.vue";
import Autocomplete from "../commons/ComboboxAutoComplete.vue";
import InputField from "../commons/InputField.vue";
import TextAreaField from "../commons/TextAreaField.vue";
import axios from "axios";
import "../../css/table.css";
import AccountDetail from "./AccountDetail.vue";
import Account from "./Account.vue";
import queryString from "query-string";
import DialogNotify from "../commons/DialogNotify.vue";
import TreeTable from "vue-tree-table-component";
import MenuLeaf from "./MenuLeaf";
// import MenuNode from "./MenuNode";
// import MenuHeader from "./MenuHeader";
//#endregion

export default {
  //#region Component
  components: {
    CheckboxField,
    Button,
    InputField,
    TextAreaField,
    DialogNotify,
    Combobox,
    Autocomplete,
    AccountDetail,
    Account,
    TreeTable,
    MenuLeaf,
    MenuNode,
    MenuHeader,
  },
  //#endregion

  //#region Data
  data() {
    return {
      // #region checkbox dialog add account
      isHideDoiTuong: false,
      isHideDoiTuongTHCP: false,
      isHideCongTrinh: false,
      isHideDonDatHang: false,
      isHideHopDongBan: false,
      isHideHopDongMua: false,
      isHideKhoanMucCP: false,
      isHideDonVi: false,
      isHideMaThongKe: false,
      // end region
      tableData: [
        {
          id: "Ziuta",
          tk: "Kozak",
          tc: "110",
          ta: "123",
          dg: "123",
          tt: "2345",
          children: [
            {
              id: "Czerwony Kapturek",
              tk: "Kozak",
              tc: "110",
              ta: "123",
              dg: "123",
              tt: "2345",
            },
          ],
        },
        {
          id: "Koziolek",
          tk: "Matolek",
          tc: "110",
          ta: "123",
          dg: "123",
          tt: "2345",
          children: [
            {
              id: "Timon",
              tk: "Matolek",
              tc: "110",
              ta: "123",
              dg: "123",
              tt: "2345",
              children: [
                {
                  id: "Timon Junior",
                  tk: "Matolek",
                  tc: "110",
                  ta: "123",
                  dg: "123",
                  tt: "2345",
                },
              ],
            },
          ],
        },
        {
          id: "Pumba",
          tk: "unknown",
          tc: "110",
          ta: "123",
          dg: "123",
          tt: "2345",
        },
      ],
      columns: [
        { label: "SỐ TÀI KHOẢN", id: "id" },
        { label: "TÊN TÀI KHOẢN", id: "tk" },
        { label: "TÍNH CHẤT", id: "tc" },
        { label: "TÊN TIẾNG ANH", id: "ta" },
        { label: "DIỄN GIẢI", id: "dg" },
        { label: "TRANG THÁI", id: "tt" },
        // { label: "CHỨC NĂNG", id: "cn" },
      ],
      e1: 1,
      isFullSize: false, // trạng thái full size
      followedDetail: false, // theo giõi chi tiết theo
      isAddExcel: true, // trạng thái khi import excel
      dialogAccounts: false,
      dialogExcel: false, // giao diện thực hiện import excel
      menuExcel: false, // Menu excel
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
    sortTable(params) {
                sortData(this.tableData, params)
            },
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

    sortTable(params) {
      sortData(this.tableData, params);
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
  z-index: 12;
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

    .dialog-add-update {
      @include flex;

      .btn-middle-line {
        z-index: 10;
        position: absolute;
        right: 66px;
        height: 20px;
        width: 1px;
        border: 1px solid transparent;
        border-left-color: #fff;
      }
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
    padding: 20px 16px 16px 16px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    .search-wrapper {
      position: absolute;
      left: 40px;
      width: 240px;
    }
    .collapse-table {
      margin-bottom: 10px;
      color: #147fc4;
      cursor: pointer;
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
  background-position: 984px -145px;
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

.mi-arrow-right--black {
  background-position: -320px -360px;
  transition: all 0.2s ease-out;
}

.mi-chevron-left {
  background-position: -35px -360px;
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
.mi-category {
  background-position: -568px -76px;
}

.mi-attach {
  background-position: -539px -203px;
}

.mi-download {
  background-position: -705px -358px;
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
.mi-arrow-up--white {
  background-position: -848px -359px;
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
  @include flex;
  position: absolute;
  right: 10px;
  top: 10px;
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
/** Account option */
.dl {
  font-size: 24px;
  font-weight: 600;
  color: #212121;
  width: 400px;
  position: absolute;
  top: 20px;
  left: 30px;
}

.note {
  font-weight: 700;
  margin: 10px 0;
  position: absolute;
  top: 80px;
  left: 30px;
}

.Account-opton {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 125px;
  left: 30px;
  height: 120px;
  justify-content: space-around;

  .Account-option-item {
    @include flex;
  }
}
.line-border {
  border-top: 2px solid #e0e0e0;
  position: absolute;
  height: 80px;
  width: 440px;
  bottom: 0;
  left: 30px;
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
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

/** dialog excel */
.excel-title {
  margin: 10px 0 0 30px;
  font-weight: 700;
}

.btn-position {
  @include flex;
  justify-content: space-between;
  height: 50px;
  background: #38393d;
  position: fixed;
  bottom: 0;
  left: 0;
  width: -webkit-fill-available;

  .btn-close-position {
    margin-left: 20px;
    color: #fff;
    text-transform: none;
  }
}

.selected-file {
  @include flex;
  width: 300px;
  justify-content: space-around;

  .span-select {
    font-weight: 700;
  }
  .span-size {
    color: #757575;
    white-space: nowrap;
  }
}

.input-file {
  .file-place {
    width: 450px;
    height: 50px;
    display: flex;
    justify-content: center;
    padding-top: 10px;
    font-style: italic;
    border: 1px solid red;
    border-radius: 2px;
    font-weight: 100;
    background: #fff;
    margin: 8px 0;
  }
}
.down-filebase {
  @include flex;

  .span-down {
    font-size: 14px;
    color: #147fc4;
    padding-right: 6px;
  }
}
.file-info {
  width: 450px;
  height: 40px;
  @include flex;
  justify-content: space-between;
  margin: 20px 0;
}

.file-option {
  span {
    font-size: 18px;
    margin-bottom: 20px;
  }
  .option-radio {
    position: absolute;
    left: 0;
    .spacer-midle {
      height: 15px;
    }
  }
}
.table {
  width: 100%;
  margin: 0;
  padding: 0;
}

/** acc */
.account-detail {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 111;
  .account-model {
    opacity: 0.46;
    background-color: rgb(33, 33, 33);
    border-color: rgb(33, 33, 33);
    width: 100%;
    height: 100%;
  }
  .account-dialog {
    position: fixed;
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    transition: all 0.2s;
    .resize-dialog {
      @include widthHeight(12px, 50px);
      background: #fff;
      border: 1px solid #d4d7dc;
      border-radius: 8px;
      position: absolute;
      display: flex;
      align-items: center;
      left: -6px;
      top: 43%;
    }

    .rotate-resize {
      left: 0;
      justify-content: right;
    }
    .account-title {
      height: 70px;
      .title-detail {
        font-size: 24px;
        font-weight: 600;
        color: #212121;
        margin: 10px 0 0 20px;
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
    }
    .account-content {
      height: 80%;
      display: flex;
      flex-direction: column;
      margin-left: 16px;
      margin-right: 16px;
      .top-content-1 {
        height: 8%;
      }
      .top-content-2 {
        height: 8%;
        @include flex;
        justify-content: space-between;
      }
      .top-content-3 {
        height: 10%;
        @include flex;
      }
      .top-content-4 {
        height: 10%;
        margin-top: 15px;
      }
      .top-content-5 {
        height: 3%;
        margin-top: 15px;
      }
      .bottom-content-1 {
        @include flex;
        margin: 20px 0 5px 0;
        .content-1-title:hover {
          color: #35bf22;
          cursor: pointer;
        }
      }
      .bottom-content-detail {
        height: 30%;
        transition: all 0.2s ease-out;
        .content-detail-1 {
          height: 20%;
          margin-left: 20px;
          @include flex;
          .content-child {
            width: 50%;
            @include flex;
          }
        }
      }
      .container-bottom {
        height: 8%;
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        border-top: 1px solid #b7b5b5;
        margin: 0 16px 0 16px;
        .btn-close {
          width: 67px;
          margin-top: 16px;
        }

        .btn-save {
          width: 200px;
          margin-right: 30px;
          @include flex;
          justify-content: flex-end;
          .btn-cat {
            width: 67px;
            margin-right: 10px;
          }

          .btn-saveAndAdd {
            width: 116px;
          }
        }
      }
    }
  }
}
.h-32 {
  height: 32px;
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
.w-49 {
  width: 49%;
}
.w-100 {
  width: 100%;
}
.hidden {
  display: none;
}
.resize-dialog-rotate {
  width: 100% !important;
}
.rotate-icon {
  transform: rotate(180deg);
}
.rotate-icon-90 {
  transform: rotate(90deg);
}
</style>
