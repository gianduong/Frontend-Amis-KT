<template>
  <div>
    <div v-if="isShown" class="row">
      <div class="cell cell1 cell-first">
        <div
          class="indentation"
          :style="{
            width: leftPadding + 'px',
            height: leftPadding - 10 + 'px',
          }"
        />
        <div class="open-button" @click="toggle">
          <div v-if="!isOpen" class="closed">
            <div class="mi mi-15 mi-tree-collapse--small"></div>
          </div>
          <div v-if="isOpen" class="opened">
            <div class="mi mi-15 mi-tree-expand--small"></div>
          </div>
        </div>
        <div style="font-weight: 700">
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
      <div class="cell cell2 cell-last" @blur="isActiveDropdown = false">
        <div class="span">Sửa</div>
        <v-menu bottom offset-y left>
          <template v-slot:activator="{ on, attrs }">
            <div
              class="dropdown" @focusout="isActiveDropdown = false"
              @click="isActiveDropdown = !isActiveDropdown"                    
              :class="{ 'active-dropdown': isActiveDropdown }"
              v-bind="attrs"
              v-on="on"
            >
              <div class="mi mi-16 mi-arrow-up--blue"></div>
            </div>
          </template>

          <v-list dense>
            <v-list-item v-for="(item, index) in items" :key="index" link @focusout="isActiveDropdown = false">
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
  },
  computed: {
    columnWithOpenButton: function () {
      return this.defaultOrder[0];
    },
    reguralColumns: function () {
      return this.defaultOrder.slice(1);
    },
    leftPadding: function () {
      return this.depth * 20;
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
    showDropdown() {
      this.isActiveDropdown = false;
    },
  },
};
</script>

<style scoped>
.row {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding-left: 15px;
  border-left: none;
  border-right: none;
  margin-top: 0;
  margin-bottom: 0;
  cursor: pointer;
  border: none;
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
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 12px;
  font-family: notosans-regular, sans-serif;
  font-size: 13px;
  border-left: 1px dotted #c7c7c7;
}
.open-button {
  float: left;
  display: inline;
  margin-right: 10px;
}

.mi-tree-expand--small {
  background-position: -608px -312px;
}
.mi-tree-collapse--small {
  background-position: -560px -312px;
}
.mi-16 {
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
}
.mi-15 {
  width: 15px;
  height: 15px;
  min-width: 15px;
  min-height: 15px;
}

.mi-arrow-up--blue {
  background-position: -896px -359px;
  margin-left: 4px;
}
.cell-first {
  border-left: none;
  display: flex;
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