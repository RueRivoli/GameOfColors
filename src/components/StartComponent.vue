<template>
  <el-container>
    <el-header>
      <span>Welcome to this game. Pick the tile that has a different color</span>
    
    </el-header>
     <div v-if="!state.isPlaying" style="margin: auto;border: 5px solid #dbdcde;border-radius:2px;background-color:#dbdcde;width:70vh;height:70vh;line-height: 70vh;" >
          {{state.msg}}
        <el-button v-if="!state.isPlaying" @click="state.isPlaying = true" round>Play again</el-button>
     </div>
     <game-component v-else @game-finished="displayResult"/>
</el-container>
</template>

<script>
import { reactive, defineComponent } from 'vue'
import GameComponent from './GameComponent'

export default defineComponent({
  name: 'StartComponent',
  components: { GameComponent },
  setup() {
    const state = reactive({
      isPlaying: false,
      msg: 'Click to start'
    })

     const displayResult = function (res) {
      if (res) {
          state.msg = "You won!"
      } else {
          state.msg = "You lost, try again"
      }
      state.isPlaying = false
    }

    return {
      state,
      displayResult
    }
  }
})

</script>

<style scoped>
</style>
