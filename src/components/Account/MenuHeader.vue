<template>
  <div class="row">
    <div v-for="column in columns" :key="column.id" class="cell">
      {{ column.label }}
    </div>
  </div>
</template>


<script>
export default {
  name: "SortingHeader",
  props: {
    columns: {
      type: Array,
      default: () => {
        return [];
      },
    },
    sortTable: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    columnsIds() {
      return this.columns.map((column) => column.id);
    },
    sortingKeys() {
      return this.columnsIds.slice(0, 2);
    },
  },
};
</script>

<style scoped>
.row {
  background-color: #ECEEF1;
  border: none;
  height: 34px;
  margin: 0;

}
.controls {
  display: flex;
  margin-left: 5px;
  align-items: center;
}
.cell {
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  border-right: 1px solid #c7c7c7;
  border-bottom: 1px solid #c7c7c7;
  font-weight: 700;
}
.sort-button {
  font-size: x-small;
  margin-left: 0.125rem;
  margin-right: 0.125rem;
}
.sort-button:hover {
  color: #cfcfcf;
  cursor: pointer;
}
</style>