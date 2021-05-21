<template>
  <v-row justify="center">
    <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">タスク名を変える</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    label="入力してください"
                    required
                    v-model="todoRename"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="cancel"
          >
            Cancel
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="rename"
          >
            rename
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TodoListItem extends Vue {

  @Prop({default: false})
  dialog!: boolean;

  todoRename = ""

  rename():void{
    this.$emit("decide", this.todoRename)
    this.todoRename = ""
  }

  cancel():void{
    this.$emit("cancel")
    this.todoRename = ""
  }
}
</script>

<style scoped>
</style>
