<template>
  <div v-resize="onResize">
    <RenameDialog
        :dialog="dialog"
        @decide="onRenameDialogSaved"
        @cancel="closeRenameDialog"
    />
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
              @click:rename="renameTodo(item)"
          />
          <v-divider v-if="index === todos.length" :key="'divider-bottom-' + item.id" />
        </template>
      </v-list>
    </v-card>
    <v-btn elevation="5" class="secondary my-5 btn-delete" block @click="deleteFinishedTodos">
      <v-icon>mdi-trash-can</v-icon>
      完了済みのタスクを削除
    </v-btn>
    <v-btn elevation="5" class="secondary my-5 btn-delete" block @click="saveTodos">
      <v-icon>mdi-file-download</v-icon>
      現在のタスクをファイルに保存
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TodoListItem, { Todo }  from '@/components/TodoListItem.vue'
import RenameDialog from '@/components/RenameDialog.vue'
import { uuid } from 'vue-uuid'

@Component({
  components: {
    TodoListItem: TodoListItem,
    RenameDialog: RenameDialog
  }
})
export default class TodoList extends Vue {
  todos: Todo[] = []
  input = ''
  dialog = false
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

  renameId = ""
  renameTodo(todo: Todo): void {
    this.dialog = true
    this.renameId = todo.id
  }

  onRenameDialogSaved(todoLabel: string): void{
    if(todoLabel){
      for(let i=0; i < this.todos.length; i++){
        if(this.todos[i].id == this.renameId){
          this.todos[i].label = todoLabel
        }
      }
      this.renameId = ""
      this.closeRenameDialog()
    }
  }

  closeRenameDialog(): void{
    this.dialog = false
  }

  deleteFinishedTodos(): void {
    this.todos = this.todos.filter(todo => !todo.finished)
  }

  saveTodos(): void {
    //保存するファイルの名前
    const savedTodos = "savedTodos.json"
    const data = JSON.stringify(this.todos,null,2)
    const a = document.createElement('a')
    a.href = "data:text/plain," + encodeURIComponent(data)
    a.download = savedTodos
    a.click()
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
