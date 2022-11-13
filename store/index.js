export const state = () => ({
    counter: 0,
    notify : false,
})

export const mutations = {
    increment(state) {
        state.counter++
    }
}