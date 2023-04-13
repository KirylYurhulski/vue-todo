export default {
  state: {
    statuses: [
      {
        value: 'active',
        text: 'Active',
      },
      {
        value: 'expired',
        text: 'Expired'
      },
      {
        value: 'completed',
        text: 'Completed'
      }
    ]
  },
  getters: {
    getStatuses(state) {
      return state.statuses
    },
    getDefaultStatus(state) {
      return 'active'
    },
    getCompleteStatus(state) {
      return 'completed'
    }
  }
}