<template>
  <div>
    <button v-on:click="$emit('start-button-clicked')" :disabled="gameState === GameState.started">
      {{
        gameState === GameState.notStarted ? "Начать" :
            gameState === GameState.finished ? "Заново" : "Продолжить"
      }}
    </button>
    <button v-on:click="$emit('stop-button-clicked')" :disabled="gameState !== GameState.started">
      Остановить
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {GameState} from "../domain/GameManager";

export default Vue.extend({
  name: "Controls",
  props: {
    gameState: Number,
  },
  data() {
    return {
      GameState: GameState
    }
  },
})
</script>

<style scoped>

</style>