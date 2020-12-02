<template>
  <el-container>
    <el-header v-if="!state.isPlaying">
      <span>{{state.msg}}</span>
    </el-header>
     <div v-bind:class="classCard()"  v-if="!state.isPlaying">
        <el-button @click="state.isPlaying = true" round>Play again</el-button>
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
      msg: 'Welcome to this game. Pick the tile that has a different color',
      success: true
    })

    const classCard = function () {
       const classes = 'b-grey-large b-rad-2 card m-auto'
         if (state.success) return classes.concat(' green')
         else return classes.concat(' red')
     }

     const displayResult = function (res) {
      if (res) {
          state.msg = "You won!"
          state.success = true
      } else {
          state.msg = "You lost, try again"
          state.success = false
      }
      state.isPlaying = false
    }

    return {
      state,
      displayResult,
      classCard
    }
  }
})

</script>

<style scoped>

.card{
  background-color:#dbdcde;
  width:70vh;
  height:70vh;
  line-height:70vh;
}

</style>
