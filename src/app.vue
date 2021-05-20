<template>
  <main class="tile is-ancestor m-0">
    <div class="tile is-parent is-8 is-vertical">
      <statistics class="tile is-child box" :progress="totalProgress"
          v-bind:commands="gameManager.commands" :winner="gameManager.winner"></statistics>
      <controls :game-state="gameManager.gameState" class="tile is-child is-12 box"
                @start-button-clicked="gameManager.start()"
                @stop-button-clicked="gameManager.stop()"></controls>
    </div>
    <div class="tile is-parent is-4">
      <matches class="tile is-child box" :progress="progress" :matches="gameManager.matches" ></matches>
    </div>

  </main>
</template>

<script lang="ts">
import Vue from "vue";
import Statistics from "./components/Statistics.vue";
import Matches from "./components/Matches.vue";
import GameManager, {GameState} from "./domain/GameManager";
import Controls from "./components/Controls.vue";

let commands: { name: string, rate?: number }[] = [
  { name : "Россия" },
  { name : "Барселона" },
  { name : "Аргентина" },
  { name : "Великобритания" },
  { name : "Нидерланды" },
  { name : "Франция"}
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
  },
  computed: {
    progress() : number {
      if (this.gameManager.gameState === GameState.finished) {
        return 1;
      }
      else
        return this.gameManager.matches[this.gameManager.matchPlayed].progress
    },
    totalProgress(): number {
      return this.gameManager.matchPlayed / this.gameManager.matches.length
    }
  }
});
</script>

<style scoped>

</style>