<template>
  <div class="dialog d-popup-center"
    v-if="rendered"
    v-show="visible"
    :transition="transition"
    :class="{ showclose: showClose }">
    <div class="dialog-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import Popup from 'el-popup';
  import 'el-popup/dist/style.css';

  export default {
    name: 'dialog',

    mixins: [Popup],

    props: {
      showClose: {
        type: Boolean,
        default: true
      },
      showModal: {
        type: Boolean,
        default: true
      },
      modal: {
        default: true
      },
      closeOnClickModal: {
        default: true
      },
      title: String
    },

    data() {
      return {

      };
    }
  };
</script>

<style lang="css" scoped>
  .dialog {
    position: fixed;
  }

  .dialog-content {
    background: #fff;
    height: 500px;
    position: relative;
    width: 680px;
  }

  @media (max-width: 480px) {
    .dialog-content {
      width: 100vw;
      height: 100vh;
    }
  }
</style>