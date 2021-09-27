<template>
  <div>
    <div v-if="isShown" class="row">
      <div class="cell cell1 cell-first">
        <div
          class="indentation"
          :style="{
            width: leftPadding + 25 + 'px',
            height: leftPadding - 10 + 'px',
          }"
        />
        <div>
          {{ rowData[columnWithOpenButton] }}
        </div>
      </div>
      <!-- <div v-for="key in reguralColumns" :key="key" class="cell">
        {{ rowData[key] }}
      </div> -->
      <div class="cell cell1">{{ rowData[this.defaultOrder[1]] }}</div>
      <div class="cell cell2">{{ rowData[this.defaultOrder[2]] }}</div>
      <div class="cell cell1">{{ rowData[this.defaultOrder[3]] }}</div>
      <div class="cell cell3">{{ rowData[this.defaultOrder[4]] }}</div>
      <div class="cell cell2">{{ rowData[this.defaultOrder[5]] }}</div>
      <div class="cell cell2 cell-last">
        <div class="span">Sửa</div>
        <v-menu bottom offset-y left @focus="isActiveDropdown = !isActiveDropdown">
          <template v-slot:activator="{ on, attrs }">
            <div
              class="dropdown"
              @focusout="showDropdown"
              :class="{ 'active-dropdown': isActiveDropdown }"
              v-bind="attrs"
              v-on="on"
            >
              <div class="mi mi-16 mi-arrow-up--blue"></div>
            </div>
          </template>

          <v-list @blur="isActiveDropdown = false" dense>
            <v-list-item v-for="(item, index) in items" :key="index" link>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchNodeBase",
  props: {
    rowData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    defaultOrder: {
      type: Array,
      default: () => {
        return [];
      },
    },
    depth: {
      type: Number,
      default: 0,
    },
    onToggle: {
      type: Function,
      default: () => {},
    },
    onOpen: {
      type: Function,
      default: () => {},
    },
    onClose: {
      type: Function,
      default: () => {},
    },
    eventHub: Object,
  },
  data: function () {
    return {
      isOpen: false,
      isShown: true,
      isActiveDropdown: false,
      items: [
        { title: "Nhân bản" },
        { title: "Xóa" },
        { title: "Chuyển tài khoản hạch toán" },
        { title: "Sử dụng" },
      ],
    };
    y;
  },
  computed: {
    columnWithOpenButton: function () {
      return this.defaultOrder[0];
    },
    reguralColumns: function () {
      return this.defaultOrder.slice(1, 6);
    },
    leftPadding: function () {
      return this.depth * 15;
    },
    uuid: function () {
      return this.rowData.uuid;
    },
  },
  created: function () {
    this.eventHub.$on("search-display-event", this.handleOpenEvent);
    this.eventHub.$on("search-reset", this.handleSearchResetEvent);
    this.eventHub.$on("search-hide-all", this.hide);
  },
  beforeDestroy: function () {
    this.eventHub.$off("search-display-event", this.handleOpenEvent);
    this.eventHub.$off("search-reset", this.handleSearchResetEvent);
    this.eventHub.$off("search-hide-all", this.hide);
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
      this.onToggle();
    },
    showDropdown(){
      isActiveDropdown = false;
    },
    handleOpenEvent(path) {
      if (path[0] != this.uuid) {
        return;
      }
      this.isShown = true;
      if (this.isLastInThePath(path)) {
        return;
      }
      this.isOpen = true;
    },
    handleSearchResetEvent() {
      this.isOpen = false;
      this.isShown = true;
    },
    hide() {
      this.isShown = false;
    },
    isLastInThePath(path) {
      return path.length == 1;
    },
  },
};
</script>

<style scoped>
.row {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  border-right: none;
  margin-top: 0;
  margin-bottom: 0;
  cursor: pointer;
  border: none;
  margin-left: -29px;
  border-bottom: 1px solid #c7c7c7;
}
.row:hover {
  background: #f3f8f8;
}
.indentation {
  border-left: none;
  border-right: none;
  margin-top: 0;
  margin-bottom: 0;
}
.cell {
  text-align: left;
  flex-grow: 1;
  flex-basis: 0;
  box-sizing: border-box;
  font-weight: 400;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 12px;
  font-family: notosans-regular, sans-serif;
  font-size: 13px;
  display: flex;
  border-left: 1px dotted #c7c7c7;
}
.mi-arrow-up--blue {
  background-position: -896px -359px;
  margin-left: 4px;
}
.cell-first {
  border-left: none;
}
.cell1 {
  margin-right: -100px;
}
.cell2 {
  margin-right: -180px;
}
.cell3 {
  margin-left: -68px;
  margin-right: 100px;
}
.cell-last {
  display: flex;
  align-items: center;
}

.dropdown {
  width: 26px;
  height: 16px;
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.span {
  font-family: notosans-semibold;
  color: #0075cb;
  padding: 0 0 0 16px;
}
.active-dropdown {
  border: 1px solid #0075cb;
}
.v-list {
  padding-top: 3px;
  padding-bottom: 3px;
}
.v-list-item {
  height: 30px;
  min-height: 20px;
}
.v-list-item__title:hover {
  color: #23c70c;
}
</style>