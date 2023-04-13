<template>
  <div class="row">
    <h5 class="center-align">All Tasks:</h5>
    <hr>
    <div class="row">
      <div class="input-field col s3">
        <select ref="status" v-model="filerStat">
          <option v-for="option in statusSelOptions"
                  :key="option.value"
                  :value="option.value">{{option.text}}</option>
        </select>
      </div>
    </div>
    <hr>
    <table class="striped" v-if="filterTaskList.length">
      <thead>
      <tr>
        <th>№</th>
        <th>Title</th>
        <th>Description</th>
        <th>Date</th>
        <th>Status</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <ListItem v-for="(task, idx) in filterTaskList" :idx="idx" :task="task"/>
      </tbody>
    </table>
    <div v-else-if="tasksList.length" class="card-panel green accent-1">
      No results found...
    </div>
    <div v-else class="card-panel green accent-1">
      You have no tasks. <router-link to="/create">Create first...</router-link>
    </div>
  </div>
</template>

<script>
import ListItem from '@/components/ListItem'
import {mapGetters} from 'vuex'

export default {
  name: "ListView",
  components: {
    ListItem
  },
  data() {
    return {
      filerStat: 'all'
    }
  },
  methods: {
    ...mapGetters(['getTasksList', 'getStatuses'])
  },
  mounted() {
    this.status = M.FormSelect.init(this.$refs.status)
  },
  computed: {
    tasksList() {
      return this.getTasksList()
    },
    filterTaskList() {
      return this.tasksList.filter(task => {
        if (this.filerStat === 'all' ) {
          return true
        } else {
          return task.status === this.filerStat
        }
      })
    },
    statusSelOptions() {
      const statuses = this.getStatuses()
      statuses.push({
        value: 'all',
        text: 'All Tasks',
      })
      return statuses
    }
  }
}
</script>

<style scoped>

</style>