<template>
  <el-container>
    <el-header>Welcome to this game. Pick the square that has a different color</el-header>
      <!-- <div v-for="(ln, ind) in state.tab" :key="ind"> -->
      <div style="margin: auto;border: 5px solid #dbdcde;border-radius:2px;" >
        <div v-for="id_row in state.row" :key="id_row">
          <el-row :key="id_row">
              <el-col 
                v-for="id_col in state.row" 
                :key="id_row + id_col + 1" 
                class="brown pointer size_2 border-grey" 
                @click="isDifferent(id_row + id_col + 1)">
              </el-col>
          </el-row>
        </div>
      </div>
    <el-footer>Footer</el-footer>
</el-container>
</template>

<script>
import { reactive, computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'LayoutComponent',
  props: {
    msg: String
  },
  setup() {
    const state = reactive({
      step: 1,
      row: computed(() => state.step + 1),
      sq: computed(() => (state.step + 1) * (state.step + 1)),
      tab: [0, 1, 2]
    })
    console.log(state)
    const isDifferent = function (id = 1) {
      console.log('isDifferent | id ', id)
    }
    return {
      state,
      isDifferent
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
