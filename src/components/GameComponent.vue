<template>
  <el-container>
    <el-header>
        <span>
          <el-progress :percentage="state.score" style="width:200px;display: inline-block;"></el-progress>
        </span>
      </el-header>
      <div class="m-auto b-grey b-grey-large b-rad-2">
        <div v-for="id_row in state.rows" :key="id_row">
          <el-row :key="id_row">
              <el-col
                v-for="id_col in state.rows" 
                :key="indexOfSquare(id_row, id_col)"
                :class="classOf(indexOfSquare(id_row, id_col))"
                @click="testSquare(indexOfSquare(id_row, id_col))">
              </el-col>
          </el-row>
        </div>
      </div>
</el-container>
</template>

<script>
import { reactive, computed, defineComponent } from 'vue'
import { colors } from './../utils/colors'
import { randomValue } from './../utils/functions'

export default defineComponent({
  name: 'GameComponent',
  emits: ['game-finished'],
  setup(props, {emit}) {
    const state = reactive({
      step: 1,
      rows: computed(() => state.step + 1),
      nbSqrs: computed(() => (state.step + 1) * (state.step + 1)),
      idToFind: randomValue(4),
      score: 0
    })

    const indexOfSquare = function (id_row, id_col) {
      return state.rows * (id_row - 1) + id_col
    }

    const classOf = function (id) {
      let classes = ['pointer','b-grey-thin']
      if (id === state.idToFind) classes.push(colors[state.step - 1].exception)
      else classes.push(colors[state.step - 1].usual)
      classes.push('size_' + state.step)
      return classes.join(' ')
    }

     const increaseSize = function () {
      if (state.step < 10) {
        state.step++
        state.idToFind = randomValue(state.nbSqrs)
        state.score = state.score + 10 
      } else {
         emit('game-finished', true)
      }
    }

    const testSquare = function (id = 1) {
      if (id === state.idToFind) {
        increaseSize()
      } else {
        emit('game-finished', false)
      }
    }

    return {
      state,
      testSquare,
      indexOfSquare,
      classOf
    }
  }
})

</script>

<style scoped>
</style>
