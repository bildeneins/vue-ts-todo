<template>
  <v-app id="app">
    <v-app-bar color="rgb(255, 255, 255, 0.5)" app dense short class="draggable" />
    <v-main class="main">
      <todo-list />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TodoList from './components/TodoList.vue';

@Component({
  components: {
    TodoList,
  },
})
export default class App extends Vue {}
</script>

<style>
html {
  overflow-y: hidden
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 50px;
  height: 100%;
  background: center / cover no-repeat url('~@/assets/background2.jpg');
}

.draggable {
  -webkit-app-region: drag;
  padding-left: 50px;
  cursor: move;
}

.main {
  max-width: 600px;
  min-width: 500px;
  margin: 0 auto;
}
</style>
