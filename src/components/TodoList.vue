<template>
  <div v-resize="onResize">
    <v-text-field
        v-model="input"
        placeholder="新しいタスクを入力..."
        solo
        @keydown.enter="onEnterTaskName"
    ></v-text-field>
    <v-card class="todo-list-card" elevation="5">
      <v-toolbar flat class="toolbar">
        <div class="num-task-unfinished">
          未完了のタスク: {{todos.length}}個
        </div>
        <v-spacer />
        <v-btn-toggle dense v-model="toggle_filter_index">
          <v-btn>すべてのタスク</v-btn>
          <v-btn>完了済み</v-btn>
          <v-btn>未完了</v-btn>
        </v-btn-toggle>
      </v-toolbar>
      <v-divider />
      <v-list :max-height="listHeight" class="overflow-y-auto">
        <template v-for="(item, index) in filteredTodos">
          <v-divider v-if="index !== 0" :key="'divider-top-' + item.id" />
          <todo-list-item
              :key="'list-' + item.id"
              :todo="item"
              @click:checkbox="toggleFinished(item)"
              @click:delete="deleteTodo(item)"
          />
          <v-divider v-if="index === todos.length" :key="'divider-bottom-' + item.id" />
        </template>
      </v-list>
    </v-card>
    <v-btn elevation="5" class="secondary my-5 btn-delete" block @click="deleteFinishedTodos">
      <v-icon>mdi-trash-can</v-icon>
      完了済みのタスクを削除
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TodoListItem, { Todo }  from '@/components/TodoListItem.vue'
import { uuid } from 'vue-uuid'

@Component({
  components: {
    TodoListItem: TodoListItem
  }
})
export default class TodoList extends Vue {
  todos: Todo[] = []
  input = ''
  private filter: 'all' | 'finished' | 'unfinished' = 'all'
  listHeightMargin = 370
  listHeight: number = window.innerHeight - this.listHeightMargin;

  get toggle_filter_index(): number {
    return ['all', 'finished', 'unfinished'].indexOf(this.filter)
  }

  set toggle_filter_index(v: number) {
    switch(v) {
      case 0:
        this.filter = 'all'
        break;
      case 1:
        this.filter = 'finished'
        break;
      case 2:
        this.filter = 'unfinished'
        break;
    }
  }

  get filteredTodos() : Todo[] {
    switch(this.filter) {
      case 'all':
        return this.todos
      case 'finished':
        return this.todos.filter(todo => todo.finished)
      case 'unfinished':
        return this.todos.filter(todo => !todo.finished)
      default:
        console.error('予期せぬフィルタオプション', this.filter)
        return []
    }
  }

  onEnterTaskName(event: {target: HTMLInputElement, keyCode: number}): void {
    // 日本語入力中のEnter(keyCode: 229)は無効にする
    if (event.keyCode !== 13) return
    if (event.target.value === '') return
    this.addTodoItem(event.target.value)
    this.clearInput()
  }

  addTodoItem(label: string): void {
    this.todos.push({
      id: uuid.v4(),
      label: label,
      finished: false
    })
  }

  toggleFinished(todo: Todo): void {
    todo.finished = !todo.finished
  }

  deleteTodo(todo: Todo): void {
    this.todos = this.todos.filter(i => i.id !== todo.id)
  }

  deleteFinishedTodos(): void {
    this.todos = this.todos.filter(todo => !todo.finished)
  }

  clearInput(): void {
    this.input = ''
  }

  onResize(): void {
    this.listHeight = window.innerHeight - this.listHeightMargin;
  }
}
</script>

<style scoped>
.todo-list-card {
  border-top: 10px solid teal;
}
.btn-delete {
  font-weight: bold;
  font-size: large;
}
.num-task-unfinished {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}
</style>
