<template>
  <v-list-item class="mb-2" dense>
    <v-list-item-icon>
      <v-icon
          v-text="checkboxIcon"
          @click="onCheckBoxClicked"
      />
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title class="text-left" v-text="todo.label" />
    </v-list-item-content>
    <v-list-item-icon>
      <v-icon @click="onRenameButtonClicked">
        mdi-pencil
      </v-icon>
    </v-list-item-icon>
    <v-list-item-icon>
      <v-icon @click="onDeleteButtonClicked">
        mdi-trash-can
      </v-icon>
    </v-list-item-icon>
  </v-list-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

export interface Todo {
  id: string
  label: string
  finished: boolean
}

@Component
export default class TodoListItem extends Vue {
  @Prop({required: true}) todo!: Todo

  get checkboxIcon(): string {
    if (this.todo.finished) return 'mdi-checkbox-marked-outline'
    else return 'mdi-checkbox-blank-outline'
  }

  onCheckBoxClicked(): void {
    this.$emit('click:checkbox')
  }

  onDeleteButtonClicked(): void {
    this.$emit('click:delete')
  }
  onRenameButtonClicked(): void {
    this.$emit("click:rename")
  }
}
</script>

<style scoped>
</style>
