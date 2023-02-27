import { createStore } from 'vuex'
import event from './module/events'
import auth from './module/auth'
import students from './module/students'
import courses from './module/courses'
import batch from './module/batch'
import instructors from './module/instructors'
import services from './module/services'
import contact from './module/contact'
import ipos from './module/ipos'
import dashboard from './module/dashboard'
import users from './module/users'
import account from './module/account';
import hr from './module/hr';

const store = createStore({
    modules: {
        event,
        auth,
        students,
        courses,
        batch,
        instructors,
        services,
        contact,
        ipos,
        dashboard,
        account,
        users,
        hr
    }
})

export default store