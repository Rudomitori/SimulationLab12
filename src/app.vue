<template>
  <div>
    <statistics v-bind:commands="gameManager.commands"></statistics>
    <matches v-bind:matches="gameManager.matches"></matches>
    <controls :game-state="gameManager.gameState"
              @start-button-clicked="gameManager.start()"
              @stop-button-clicked="gameManager.stop()"
              @play-button-clicked="gameManager.playMatch()"></controls>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Statistics from "./components/Statistics.vue";
import Matches from "./components/Matches.vue";
import GameManager from "./domain/GameManager";
import Controls from "./components/Controls.vue";
import {GameState} from "./domain/GameManager";

let commands: { name: string, rate?: number }[] = [
  { name : "Россия" },
  { name : "Барселона" },
  { name: "Аргентина" }
];

export default Vue.extend({
  data() {
    return {
      gameManager: new GameManager(commands),
      GameState: GameState
    }
  },
  components: {
    Controls,
    Matches,
    Statistics
  }
});
</script>

<style scoped>

</style>