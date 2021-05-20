<template>
  <v-row justify="center">
    <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">名前を変える</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    label="名前を変える"
                    required
                    v-model="toDoRename"
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
              @click="close"
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
  toDoRename=""
  @Prop({default: false})
  dialog!: boolean;

  rename():void{
    this.$emit("sendLabel", this.toDoRename)
    this.toDoRename=""

  }
  close():void{
    this.$emit("sendClose")
  }



}
</script>

<style scoped>
</style>
