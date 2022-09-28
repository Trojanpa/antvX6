<template>
  <div class="about-container" :title="[[title]]">about</div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      title: '7777',
    };
  },
};
</script>

<style scoped>
.about-container {
  height: 100vh;
  background-color: yellowgreen;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
