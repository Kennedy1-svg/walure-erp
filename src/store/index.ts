import { createStore } from 'vuex'
import event from './module/events'
import auth from './module/auth'
import students from './module/students'
import courses from './module/courses'
import batch from './module/batch'

const store = createStore({
    modules: {
        event,
        auth,
        students,
        courses,
        batch
    }
})

export default store