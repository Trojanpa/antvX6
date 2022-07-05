<template>
  <div id="app">
    <div class="menu-list">
      <router-link to="/home">home</router-link> | 
      <router-link to="/about">about</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
}
.menu-list {
  padding: 10px;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1000;
}
</style>
