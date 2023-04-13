import { createStore } from 'vuex'
import todo from '@/store/modules/todo'
import taskStatuses from '@/store/modules/status'

export default createStore({
  modules: {
    todo,
    taskStatuses
  }
})
