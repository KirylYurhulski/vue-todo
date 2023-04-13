export default {
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]').map(task => {
      if (task.status != 'completed' && new Date(task.dats) < new Date()){
        task.status = 'expired'
      }
      return task
    })
  },
  actions: {
    createTask(ctx, task) {
      ctx.commit('create', task)
    },
    modifyTask(ctx, task){
      ctx.commit('modify', task)
    }
  },
  mutations: {
    create(state, task) {
      state.tasks.push(task)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    modify(state, newTask) {
      const index = state.tasks.findIndex(task => task.id === newTask.id)

      if (newTask.status != 'completed' && new Date(newTask.dats) < new Date()){
        newTask.status = 'expired'
      }
      state.tasks[index] = newTask
      localStorage.setItem('tasks', JSON.stringify(state.tasks))

    }
  },
  getters: {
    getTasksList(state) {
      return state.tasks
    },
    getTaskById(state) {
      return function(id) {
        return state.tasks.find(task => task.id === id)
      }
    }
  }
}