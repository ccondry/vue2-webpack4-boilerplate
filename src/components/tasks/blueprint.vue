<template>
  <span>
    <h4>
      Step {{ task[type].order }} of {{ modalSteps }}
      <!-- : {{ type }} -->
    </h4>
    <div style="margin: auto; position: relative; width: 100%; height: 100%">
      <div class="overlay" v-show="working || loading">
        <md-loading size="80" />
      </div>
      <div style="display: flex; align-items: baseline;">
        <div v-if="task[type] && task[type].params">
          <!-- create input row for each task param -->
          <task-param
          style="display: flex; justify-content: space-between;"
          v-for="param of Object.keys(task[type].params)"
          :key="param"
          :task="task"
          :type="type"
          :param="param"
          :personas="personas"
          @validated="setTaskValidation"
          :messages="messages[param]"
          />
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import TaskParam from '../task-param'

export default {
  components: {
    TaskParam
  },
  data () {
    return {
      validatedParams: {}
    }
  },
  props: [
    'task',
    'modalSteps',
    'personas',
    'index',
    'loading',
    'working'
  ],
  methods: {
    setTaskValidation ({param, value}) {
      // task validation was updated in blueprint-task
      console.log('blueprint task - setTaskValidation', param, value)
      // update our list of validated tasks
      this.$set(this.validatedParams, param, value)
    }
  },
  computed: {
    ...mapGetters([
      'availableNames'
    ]),
    //     formMessages () {
    //   const ret = []
    //   // check create character validation errors
    //   if (this.type === 'createOmniCharacter' && !this.isValidated) {
    //     // is the email invalid?
    //     if (this.param === 'email') {
    //       if (!this.availableNames[this.currentValue]) {
    //         // email/name unavailable
    //         ret.push({
    //           message: 'Please choose another name',
    //           type: 'error'
    //         })
    //       }
    //     }
    //   }
    //   return ret
    // },
    messages () {
      const ret = {}
      // don't show errors if loading or working
      if (this.loading || this.working) {
        return ret
      }
      // email not available?
      if (!this.validatedParams['email']) {
        // add warning messages to first and last name
        ret.firstName = [{
          message: 'Please choose another first or last name',
          type: 'error'
        }]
        ret.lastName = [{
          message: 'Please choose another first or last name',
          type: 'error'
        }]
      }
      return ret
    },
    type () {
      // return task type ID
      return Object.keys(this.task)[0]
    },
    isValidated () {
      try {
        for (const key of Object.keys(this.task[this.type].params)) {
          if (!this.validatedParams[key]) {
            // someone failed validation
            return false  
          }
        }
      } catch (e) {
        // if this.task[this.type].params doesn't exist, assume we're validated
        return true
      }
      // all validated
      return true
    }
  },
  watch: {
    isValidated (val, oldVal) {
      // update parent when validation changes
      if (val !== oldVal) {
        this.$emit('validated', {
          index: this.index,
          value: val
        })
      }
    }
  }
}
</script>
