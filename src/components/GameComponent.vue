<template>
  <el-container>
    <el-header>
        <span v-if="!state.win">
            <el-progress :percentage="state.score" style="width:200px;display: inline-block;"></el-progress>
        </span>
      </el-header>
      <div class="m-auto b-grey b-grey-large b-rad-2" v-if="!state.win">
        <div v-for="id_row in state.row" :key="id_row">
          <el-row :key="id_row">
              <el-col
                :id="state.row * (id_row - 1) + id_col"
                v-for="id_col in state.row" 
                :key="id_row + id_col"
                :class="classOf(state.row * (id_row - 1) + id_col)"
                @click="isDifferent(state.row * (id_row - 1) + id_col)">
              </el-col>
          </el-row>
        </div>
      </div>
</el-container>
</template>

<script>
import { reactive, computed, defineComponent } from 'vue'
import { colors } from './../colors/colors'

export default defineComponent({
  name: 'GameComponent',
  setup(props, {emit}) {
    const state = reactive({
      step: 1,
      row: computed(() => state.step + 1),
      sq: computed(() => (state.step + 1) * (state.step + 1)),
      idToFind: 2,
      win: false,
      score: 0
    })
    const classOf = function (id) {
      let classes = ['pointer','b-grey-thin']
      if (id === state.idToFind) classes.push(colors[state.step - 1].exception)
      else classes.push(colors[state.step - 1].usual)
      classes.push('size_' + state.step)
      return classes.join(' ')
    }

     const increaseSize = function () {
      if (state.step < 11) {
        state.step++
        state.idToFind = Math.floor(Math.random() * state.sq + 1)
        state.score = state.score + 10 
        console.log('step | new Id To Find ', state.step, state.idToFind)
      } else {
         emit('game-finished', true)
      }

    }

    const isDifferent = function (id = 1) {
      console.log('isDifferent | id ', id)
      if (id === state.idToFind) {
        increaseSize()
      } else {
        // newGame()
        emit('game-finished', false)
      }
    }

    return {
      state,
      isDifferent,
      classOf
      // newGame
    }
  }
})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
