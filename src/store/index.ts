import { createStore } from 'vuex'
import event from './module/events.js'

const store = createStore({
    modules: {
        event
    }
})

export default store