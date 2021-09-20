<template>
  <div class="row" v-on:click="changeUrl(url)">
    <div class="indentation" :style="{ width: leftPadding + 'px' }" />
    <div class="cell">{{ rowData.label }}</div>
  </div>
</template>

<script>
export default {
  name: "MenuLeaf",
  props: {
    rowData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    depth: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    leftPadding: function () {
      return this.depth * 15;
    },
    url() {
      return this.rowData.href;
    },
  },
  methods: {
    changeUrl(url) {
      window.location.href = url;
    },
  },
};
</script>

<style scoped>
.row {
  margin: 0;
  height: 40px;
  
}
.row:hover {
  background-color: #f3f8f8;
}
.cell{
  border-bottom: 1px solid #c7c7c7;
  border-right: 1px dotted #c7c7c7;
   font-weight: 700;
   padding: 5px 10px;
}
.indentation {
}
</style>