<template>
  <section>
    <b-progress :value="Math.round(progress * 100)" type="is-success"></b-progress>
    <b-table bordered striped :data="commands" narrowed>
      <b-table-column :td-attrs="columnTdAttrs" label="Название команды" v-slot="props">
        {{ props.row.name }}
      </b-table-column>
      <b-table-column :td-attrs="columnTdAttrs" field="points" label="Очков" v-slot="props" numeric>
        {{ props.row.points }}
      </b-table-column>
      <b-table-column :td-attrs="columnTdAttrs" label="Голов" v-slot="props" numeric>
        {{ props.row.goals }}
      </b-table-column>
      <b-table-column :td-attrs="columnTdAttrs" label="Побед" v-slot="props" numeric>
        {{ props.row.wins }}
      </b-table-column>
      <b-table-column :td-attrs="columnTdAttrs" label="Поражений" v-slot="props" numeric>
        {{ props.row.routs }}
      </b-table-column>
      <b-table-column :td-attrs="columnTdAttrs" label="Среднее кол-во голов" v-slot="props" numeric>
        {{ formatter(props.row.goalRate) }}
      </b-table-column>
    </b-table>
  </section>
</template>

<script lang="ts">
import Vue, {PropType} from "vue";
import Command from "../domain/Command";
let formatter = new Intl.NumberFormat("ru-RU", {
  maximumFractionDigits: 2
}).format

export default Vue.extend({
  name: "Statistics",
  data() {
    return {
      formatter
    }
  },
  props: {
    commands: {
      type: Object as PropType<Command[]>
    },
    winner: Object as PropType<Command | undefined>,
    progress: Number
  },
  methods: {
    columnTdAttrs(row: Command, column: any) {
      if(row === this.winner) {
        return {
          class: "is-success"
        }
      }

      return null
    }
  }
});
</script>

<style scoped>

</style>