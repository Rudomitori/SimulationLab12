<template>
  <div>
    <b-progress :value="Math.round(progress * 100)" type="is-success"></b-progress>
    <b-table bordered striped :data="matches" narrowed>
      <b-table-column field="command0_name" label="Команда" :td-attrs="columnTdAttrs" v-slot="props">
        {{ props.row.commands[0].name }}
      </b-table-column>
      <b-table-column field="command0_goals" label="Голов" :td-attrs="columnTdAttrs" v-slot="props" numeric>
        {{ props.row.goals[0] }}
      </b-table-column>
      <b-table-column label="" width="20" v-slot="props">
        vs
      </b-table-column>
      <b-table-column field="command1_goals" label="Голов" :td-attrs="columnTdAttrs" v-slot="props" numeric>
        {{ props.row.goals[1] }}
      </b-table-column>
      <b-table-column field="command1_name" label="Команда" :td-attrs="columnTdAttrs" v-slot="props">
        {{ props.row.commands[1].name }}
      </b-table-column>
    </b-table>
  </div>

</template>

<script lang="ts">
import Vue, {PropType} from "vue";
import Match from "../domain/Match";

export default Vue.extend({
  name: "Matches",
  props: {
    matches : Object as PropType<Match[]>,
    progress: Number
  },
  methods: {
    columnTdAttrs(row: any, column: any) {
      if (column.field === "command0_name" || column.field === "command0_goals") {
        if (row.winner == row.commands[0]) {
          return {
            class: "is-success"
          }
        }
      }
      else if (column.field === "command1_name" || column.field === "command1_goals") {
        if (row.winner == row.commands[1]) {
          return {
            class: "is-success"
          }
        }
      }
      return null
    }
  }
})
</script>

<style scoped>

</style>