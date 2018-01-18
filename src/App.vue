
<template lang="html">
  <div class="app-wrp">
    <div class="logo-wrp">
      <img src="icons/cmo_96.png" @click="__click">
      <div class="t0" @click="__click">Classical Music Only</div>
    </div>
    <Main></Main>
  </div>
</template>

<script>
import Main from './components/main.vue'
export default {
  components: {
    Main
  },

  methods: {
    __click() {
      chrome.tabs.create({url: 'https://classicalmusiconly.com'})
    }
  }
}
</script>

<style lang="less">
.app-wrp {
  width: auto !important;
  padding: 0.5em;
  max-width: 100%!important;
  > .logo-wrp {
    img {
      width: 64px;
      height: 64px;
      cursor: pointer;
      margin-bottom: 1em;
    }
    .t0 {
      font-weight: bold;
      color: #11b19e;
      font-size: 22px;
      transition: all 0.5s;
      cursor: pointer;
      &:hover {
        color: #da2858;
      }
    }
    margin-bottom: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
}
</style>
