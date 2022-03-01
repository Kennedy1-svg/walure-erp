import { createStore } from 'vuex'
import event from './module/events'

const store = createStore({
    modules: {
        event
    }
})

export default store