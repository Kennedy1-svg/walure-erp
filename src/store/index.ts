import { createStore } from 'vuex'
import event from './module/events.ts'

const store = createStore({
    modules: {
        event
    }
})

export default store