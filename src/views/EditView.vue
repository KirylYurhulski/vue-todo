<template>
  <div class="row">
    <h5 class="center-align">Edit task: {{ task.title }}</h5>
    <div v-if="disabled" class="card-panel yellow lighten-4">
      <strong>The task is completed. The change is not available...</strong>
    </div>

    <form class="col s12" @submit.prevent="modifyTaskHandler">
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">title</i>
          <input id="title"
                 type="text"
                 class="validate"
                 v-model="task.title"
                 :disabled="disabled"
                 required>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">comment</i>
          <textarea id="description"
                    class="materialize-textarea"
                    v-model="task.description"
                    :disabled="disabled"
                    required></textarea>
          <span class="character-counter description-len">{{ task.description.length }}/2048</span>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">code</i>
          <div id="tags" class="chips" ref="chips"></div>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">date_range</i>
          <input type="text" class="datepicker" ref="datepicker">
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">transfer_within_a_station</i>
          <select ref="status" :disabled="disabled">
            <option v-for="option in statusSelOptions"
                    :key="option.value"
                    :value="option.value">{{option.text}}</option>
          </select>
        </div>
      </div>
      <button class="btn waves-effect blue darken-1 btn-large"
              type="submit"
              name="action"
              :disabled="disabled">
        Save
      </button>
    </form>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "EditView",
  data() {
    return {
      chips: null,
      datePicker: null,
      status: null
    }
  },
  methods: {
    ...mapGetters(['getStatuses', 'getCompleteStatus']),
    ...mapActions(['modifyTask']),
    modifyTaskHandler() {
      this.modifyTask({
        id: this.task.id,
        title: this.task.title,
        description: this.task.description,
        chips: this.chips.chipsData,
        dats: this.datePicker.date,
        status: this.$refs.status.value
      })
      this.$router.push({name: 'list'})
    },
    chipsInit() {
      this.chips = M.Chips.init(this.$refs.chips, {
        placeholder: 'Tags',
        data: this.task.chips,
        disableDayFn: this.mDisableFunction
      })
    },
    datepickerInit() {
      this.datePicker = M.Datepicker.init(this.$refs.datepicker, {
        autoClose: true,
        format: 'dd.mm.yyyy',
        defaultDate: new Date(this.task.dats),
        setDefaultDate: true,
        disableDayFn: this.disableDayFn
      })
    },
    statusSelOptionsInit() {
      this.status = M.FormSelect.init(this.$refs.status)
      this.$refs.status.value = this.task.status
      this.$refs.status.dispatchEvent(new Event('change'))
    },
    disableDayFn() {
      return this.disabled === 1 ? true : false
    }
  },
  computed: {
    task() {
      return this.$store.getters.getTaskById(+this.$route.params.id)
    },
    disabled() {
      return this.task.status === this.getCompleteStatus() ? 1 : 0
    },
    statusSelOptions() {
      return this.getStatuses()
    }
  },
  mounted() {
    this.chipsInit()
    this.datepickerInit()
    this.statusSelOptionsInit()
  },
  destroyed() {
    if (this.chips && this.chips.destroyed()) {
      this.chips.destroy()
    }
    if (this.datePicker && this.chips.destroyed()) {
      this.chips.destroy()
    }
    if (this.status && this.status.destroyed()) {
      this.status.destroy()
    }
  }
}
</script>