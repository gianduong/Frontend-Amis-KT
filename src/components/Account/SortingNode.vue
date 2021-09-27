<template>
  <search-node-base :row-data="rowData" :default-order="defaultOrder" :depth="depth" :on-toggle="onToggle" :on-open="onOpen" :on-close="onClose" :event-hub="eventHub"/>
</template>

<script>
  import SearchNodeBase from './SearchNodeBase'
  export default {
    name: 'SearchNode',
    components: { SearchNodeBase },
    props: {
      rowData: Object,
      defaultOrder: Array,
      depth: Number,
      onOpen: Function,
      onToggle: Function,
      onClose: Function,
      eventHub: Object
    },
    data: function(){
      return {
        isOpen: false
      }
    },
    computed: {
      uuid: function(){
        return this.rowData.uuid
      }
    },
    created: function() {
      this.eventHub.$on('search-display-event', this.handleOpenEvent)
      this.eventHub.$on('search-reset', this.handleSearchResetEvent)
    },
    beforeDestroy: function(){
      this.eventHub.$off('search-display-event', this.handleOpenEvent)
      this.eventHub.$off('search-reset', this.handleSearchResetEvent)
    },
    methods: {
      handleOpenEvent(path){
        const [uuid, ...tail] = path
        if( uuid !== this.uuid || this.isLastInThePath(tail) ){ return }
        this.onOpen()
        this.$nextTick(() => {
          this.hideAllChildren()
          this.eventHub.$emit('search-display-event', tail)
        })
      },
      hideAllChildren(){
        const childrenUuids = this.rowData.children.map((child) => child.uuid)
        childrenUuids.forEach((uuid) => {
          this.eventHub.$emit('search-hide-event', uuid)
        })
      },
      handleSearchResetEvent(){
        this.onClose()
      },
      isLastInThePath(tail){
        return tail.length == 0
      }
    }
  }
</script>

<style scoped lang="scss">
.row{
    margin-top: 0;
    margin-bottom: 0;
}
.cell{
    margin-top: 0;
    margin-bottom: 0;
    border-right: 1px dotted #c7c7c7;
    .menu-label{
        font-weight: 700;
    }
  
}
  .open-button {
    margin-right: 0.25rem;
    margin-left: -0.5rem;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .open-button:hover{
    color: #cfcfcf;
  }
  .closed::before{
    content: "▸";
  }
  .open::before{
    content: "▾";
  }
  .sorting-buttons{
    display: flex;
    flex-direction: row;
    height: 100%;
    align-items: center;
  }
  .sort-button{
    font-size: x-small;
    margin-left: 0.125rem;
    margin-right: 0.125rem;
  }
  .sort-button:hover{
    color: #cfcfcf;
  }
</style>