<template>
  <el-container>
    <el-header>
        <span>
          <el-progress :percentage="score" style="width:200px;display: inline-block;"></el-progress>
        </span>
      </el-header>
      <div class="m-auto b-grey b-grey-large b-rad-2">
        <div v-for="id_row in rows" :key="id_row">
          <el-row :key="id_row">
              <el-col
                v-for="id_col in rows" 
                :key="indexOfSquare(id_row, id_col)"
                :class="colorOf(indexOfSquare(id_row, id_col))"
                @click="testSquare(indexOfSquare(id_row, id_col))">
              </el-col>
          </el-row>
        </div>
      </div>
</el-container>
</template>

<script>
import { defineComponent } from 'vue'
import { colors } from './../utils/colors'
import { randomValue, useInitialisation } from './../utils/functions'

export default defineComponent({
  name: 'GameComponent',
  emits: ['game-finished'],
  setup(props, {emit}) {
    let { step, rows, nbSqrs, idToFind, score } = useInitialisation()

    const indexOfSquare = function (id_row, id_col) {
      return rows.value * (id_row - 1) + id_col
    }

    const colorOf = function (id) {
      let classes = ['pointer','b-grey-thin']
      if (id === idToFind.value) classes.push(colors[step.value - 1].exception)
      else classes.push(colors[step.value - 1].usual)
      classes.push('size_' + step.value)
      return classes.join(' ')
    }

    const doIncreaseSize = function () {
      if (step.value < 10) {
        step.value++
        idToFind.value = randomValue(nbSqrs.value)
        score.value = score.value + 10 
      } else {
         emit('game-finished', true)
      }
    }

    // Test if the square selected is the one to find
    const testSquare = function (id = 1) {
      if (id === idToFind.value) {
        doIncreaseSize()
      } else {
        emit('game-finished', false)
      }
    }

    return {
      step,
      rows,
      nbSqrs,
      idToFind,
      score,
      testSquare,
      indexOfSquare,
      colorOf
    }
  }
})

</script>

<style scoped>
</style>
