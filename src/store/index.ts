import { createStore } from 'vuex'
import event from './module/events'
import auth from './module/auth'
import instructors from './module/instructors'
import dashboard from './module/dashboard'
import users from './module/users'
import account from './module/account';
import hr from './module/hr';

const store = createStore({
    modules: {
        event,
        auth,
        instructors,
        dashboard,
        account,
        users,
        hr
    }
})

export default store