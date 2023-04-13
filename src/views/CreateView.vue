<template>
  <div class="row">
    <h5 class="center-align">Create new:</h5>
    <form class="col s12" @submit.prevent="createTaskHandler">
      <div class="row">
        <div class="input-field col s12">
          <input id="title" type="text" class="validate" v-model="task.title" required>
          <label for="title">Title</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <textarea id="description" class="materialize-textarea" v-model="task.description" required></textarea>
          <label for="description">Description</label>
          <span class="character-counter description-len">{{task.description.length}}/2048</span>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <div id="tags" class="chips" ref="chips"></div>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" class="datepicker" ref="datepicker">
        </div>
      </div>
      <button class="btn waves-effect blue darken-1 btn-large"
              type="submit"
              name="action">
        Save
      </button>
    </form>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'HomeView',
  data(){
    return {
      task: {
        title: '',
        description: ''
      },
      chips: null,
      datePicker: null
    }
  },
  methods: {
    ...mapActions(['createTask']),
    ...mapGetters(['getDefaultStatus']),
    createTaskHandler() {
      this.createTask({
        id: Date.now(),
        title: this.task.title,
        description: this.task.description,
        chips: this.chips.chipsData,
        dats: this.datePicker.date,
        status: this.getDefaultStatus()
      })
      this.$router.push({name: 'list'})
    }
  },
  mounted() {
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: 'Tags'
    })
    this.datePicker = M.Datepicker.init(this.$refs.datepicker, {
      autoClose: true,
      format: 'dd.mm.yyyy',
      defaultDate: new Date(),
      setDefaultDate: true,
      minDate: new Date()
    })
  },
  destroyed() {
    if (this.chips && this.chips.destroyed()){
      this.chips.destroy()
    }
    if (this.datePicker && this.chips.destroyed()){
      this.chips.destroy()
    }
  }
}
</script>

<style scoped>
</style>
