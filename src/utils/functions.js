import { toRefs, reactive, computed } from 'vue'


export function randomValue (max) {
    return Math.floor(Math.random() * max + 1)
}

/* Initialization */

export function useInitialisation () {
    const state = reactive({
        step: 1,
        rows: computed(() => state.step + 1),
        nbSqrs: computed(() => (state.step + 1) * (state.step + 1)),
        idToFind: randomValue(4),
        score: 0
    })
    return {...toRefs(state)}
}

export function useInitialisationGame (msg) {
    const state = reactive({
        isPlaying: false,
        msg: msg,
        success: null,

    })
    return {...toRefs(state)}
}
