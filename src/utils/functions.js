import { reactive, computed } from 'vue'

export function indexOfSquare (id_row, id_col, row) {
    return row * (id_row - 1) + id_col
}

export function randomValue (max) {
    return Math.floor(Math.random() * max + 1)
}

export function createGameSquare () {
    const state = reactive({
        step: 1,
        rows: computed(() => state.step + 1),
        nbSqrs: computed(() => (state.step + 1) * (state.step + 1)),
        idToFind: randomValue(4),
        score: 0
      })
    return state
}

