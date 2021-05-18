<template>
  <div class="todo-item">
    {{todo.label}}&nbsp;{{todo.done}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

export interface Todo {
  label: string
  done: boolean
}

@Component
export default class TodoItem extends Vue {
  @Prop({required: true}) todo!: Todo
  
}
</script>

<style scoped>
.todo-item {
  border: 1px solid black;
}
</style>