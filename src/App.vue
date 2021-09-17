<template>
  <v-app>
    <v-navigation-drawer :class="{ 'resize-navigation': drawer }" app>
      <!--Nav bar  -->
      <NavBar :isShow="isShow" @resize="resizeShow" />
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon
        @click="(drawer = !drawer), (isShow = !isShow)"
      ></v-app-bar-nav-icon>
      <!-- Header -->
      <Header />
    </v-app-bar>

    <v-main>
      <!-- Main content  -->
      <Content />
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "./components/layout/NavBar.vue";
import Header from "./components/layout/Header.vue";
import Content from "./components/layout/Content.vue";
import "./css/main.css";
export default {
  components: {
    NavBar,
    Header,
    Content,
  },
  data: () => ({
    drawer: null,
    isShow: true,
  }),
  methods: {
    resizeShow() {
      this.isShow = !this.isShow;
      this.drawer = !this.drawer;
    },
  },
};
</script>
<style lang='scss'>

.theme--light.v-text-field {
}

.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
  // border-color: #90c143;
}

.v-text-field.v-input__control .v-input__slot .v-text-field__slot {
  // border-color: #90c143;
}
.theme--light.v-label {
  color: #000;
}

.theme--light.v-list-item--active{
  background: #23c70c;
  .v-list-item__title{
    color:#ffff;
  }
}

.v-autocomplete:not(.v-input--is-disabled).v-select.v-text-field input {
    border: none;
}
.theme--light.v-input:not(.v-input--is-disabled) input,
.theme--light.v-input:not(.v-input--is-disabled) textarea {
  color: #000;
  // border-radius: 2px;
  border: 1px solid #babec5;
  outline: none;
  // border-bottom: 1.5px solid green;
  padding-left: 10px;
}
.theme--light.v-input:not(.v-input--is-disabled) textarea{
  border: none;
  // border-radius: 2px;
}
.theme--light.v-input:not(.v-input--is-disabled) input:hover {
  // border-color: #2ca01c;
  // box-shadow: 1px 1px 1px #e6dada;
}

</style>
