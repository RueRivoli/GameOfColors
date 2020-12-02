<template>
  <el-container>
    <el-header v-if="!isPlaying">
      <span>{{msg}}</span>
    </el-header>
     <div v-bind:class="getClassCard(success)"  v-if="!isPlaying">
        <el-button @click="isPlaying = true" round>Play</el-button>
     </div>
     <game-component v-else @game-finished="getResult"/>
</el-container>
</template>

<script>
import { defineComponent } from 'vue'
import GameComponent from './GameComponent'
import { useInitialisationGame } from './../utils/functions'

export default defineComponent({
  name: 'StartComponent',
  components: { GameComponent },
  setup() {
    const { isPlaying, msg, success } = useInitialisationGame('Welcome to this game. Pick the tile that has a different color')

    const getClassCard = function () {
       const classes = 'b-grey-large b-rad-2 card m-auto'
         if (success.value) return classes.concat(' green')
         else if (success.value === false) return classes.concat(' red')
         else return classes
     }
     
     const getResult = function (res) {
      if (res) {
          msg.value = "You won!"
          success.value = true
      } else {
          msg.value = "You lost, try again"
          success.value = false
      }
      isPlaying.value = false
    }

    return {
      isPlaying,
      msg,
      success,
      getResult,
      getClassCard
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
