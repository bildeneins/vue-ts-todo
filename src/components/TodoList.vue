<template>
  <div>
    <div v-for="(item, index) in todos" :key="index">
      <todo-item :todo="item" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TodoItem, { Todo }  from '@/components/TodoItem.vue'

@Component({
  components: {
    TodoItem
  }
})
export default class TodoList extends Vue {
  todos: Todo[] = [
    {label: 'a', done: false},
    {label: 'b', done: false},
  ]
}
</script>

<style></style>