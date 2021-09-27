
<template>
  <div class="row">
    <div
      v-for="column in columns"
      :key="column.id"
      class="cell"
    >
      {{ column.label }}
      <div
        v-if="sortingKeys.includes(column.id)"
        class="controls"
      >
        <div class="sort-button" @click="sortTable({key: column.id, asc: true})">
          ▲
        </div>
        <div class="sort-button" @click="sortTable({key: column.id, asc: false})">
          ▼
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'SortingHeader',
    props: {
      columns: {
        type: Array,
        default: () => { return [] }
      },
      sortTable: {
        type: Function,
        default: () => {}
      },
    },
    computed: {
      columnsIds(){
        return this.columns.map(column => column.id);
      },
      sortingKeys(){
        return this.columnsIds.slice(0,2)
      }
    }
  }
</script>

<style scoped>
  .row{
    background-color: #ECEEF1;
    margin-bottom: 0;
    height: 30px;
    margin-left: -32px;
  }
  .controls{
    display: flex;
    margin-left: 5px;
    align-items: center;
  }
  .cell{
    flex-grow: 1;
    flex-basis: 0;
    display: flex;
    text-align: left;
    padding: 5px 10px;
    text-transform: uppercase;
    font-size: 12px;
    font-family: "notosans-bold";
    background: #eceef1;
    border-left: 1px solid #c7c7c7;
  }
  .sort-button{
    font-size: x-small;
    margin-left: 0.125rem;
    margin-right: 0.125rem;
    cursor: pointer;
  }
  .sort-button:hover{
    color: #cfcfcf;
  }
</style>