<template>
  <table>
    <thead>
      <tr>
        <th>Название команды</th>
        <th>Очков</th>
        <th>Голов</th>
        <th>Побед</th>
        <th>Поражений</th>
        <th>Среднее кол-во голов</th>
      </tr>
    </thead>
    <tbody>
    <tr v-for="command of commands">
      <th>{{ command.name }}</th>
      <th>{{ command.points }}</th>
      <th>{{ command.goals }}</th>
      <th>{{ command.wins }}</th>
      <th>{{ command.routs }}</th>
      <th>{{ command.goalRate }}</th>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue, {PropType} from "vue";
import Command from "../domain/Command";

export default Vue.extend({
  name: "Statistics",
  props: {
    commands: {
      type: Object as PropType<Command[]>
    }
  },
});
</script>

<style scoped>

</style>