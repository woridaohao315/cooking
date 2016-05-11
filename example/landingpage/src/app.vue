<script>
  import VDialog from './components/dialog.vue';

  export default {
    name: 'app',

    components: {
      VDialog
    },

    template: require('./app.html'),

    data() {
      return {
        showDemo: false
      };
    }
  };
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: .3s all;
  }

  .header {
    color: #fff;
    height: 100vh;
    background-color: #008de1;
    text-align: center;
  }

  .nav .brand {
    position: absolute;
    left: 0;
    top: 0;
  }

  .nav .brand .logo {
    width: 50px;
    height: 50px;
  }

  .nav .nav-list {
    list-style: none;
    font-weight: lighter;
    padding-top: 30px;
  }

  .nav .nav-item {
    display: inline-block;
  }

  .nav .nav-link {
    font-weight: lighter;
    font-family: sans-serif;
    padding: 5px 10px;
  }

  .nav .nav-link:hover {
    opacity: .6;
  }

  .header .main-wrap {
    left: 50%;
    position: absolute;
    top: 50%;
    transform-style: preserve-3d;
    text-align: center;
    transform: translate(-50%, -50%);
  }

  .header .headline {
    font-size: 40px;
    font-family: cursive;
    margin-bottom: 20px;
  }

  .header .logo {
    width: 150px;
    margin: auto;
    display: block;
  }

  .header .desc {
    font-size: 24px;
    min-width: 200px;
  }

  .header .desc > small {
    display: block;
    font-size: .6em;
    margin-top: 10px;
  }

  .header .buttongroup {
    margin: 20px 0;
  }

  .header .button {
    background-color: #fff;
    border-radius: 4px;
    color: #000;
    display: inline-block;
    padding: 10px 20px;
    margin-right: 10px;
  }

  .header .button:hover {
    background-color: #f0f0f0;
  }

  .header .button:last-child {
    margin-right: 0;
  }

  .info {
    padding: 40px 20px;
  }

  .info::after {
    clear: both;
    content: " ";
    display: table;
  }

  .info .feature {
    box-sizing: border-box;
    color: #333;
    float: left;
    font-size: 14px;
    padding: 50px;
    width: 50%;
    height: 180px;
  }

  @media (max-width: 480px) {
    .header .button {
      padding: 10px 12px;
    }

    .info .feature {
      width: 100%;
      float: none;
      height: auto;
      padding: 20px;
    }
  }

  .info .feature-title {
    font-size: 20px;
    font-weight: lighter;
    margin-bottom: 10px;
  }

  .info .feature-text {
    line-height: 1.6em;
    color: #6d6d6d;
  }

  .footer {
    background-color: #008de1;
    color: #fff;
    text-align: center;
    padding: 20px;
  }
</style>
