<template>
  <table>
    <thead>
    <tr>
      <th>Название команды</th>
      <th>Голов</th>
      <th></th>
      <th>Голов</th>
      <th>Название команды</th>
      <th>Прогресс</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="match of matches">
      <th>{{ match.commands[0].name }}</th>
      <th>{{ match.goals[0] }}</th>
      <th> vs. </th>
      <th>{{ match.goals[1] }}</th>
      <th>{{ match.commands[1].name }}</th>
      <th>{{ match.progress }}</th>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue, {PropType} from "vue";
import Match from "../domain/Match";

export default Vue.extend({
  name: "Matches",
  props: {
    matches : Object as PropType<Match[]>
  }
})
</script>

<style scoped>

</style>