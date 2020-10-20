<template>
  <div>
    <b-field label="Name" label-position="on-border">
      <b-input v-model="resource.taskName" />
    </b-field>
    <b-field label="Target Status" label-position="on-border">
      <b-input v-model="resource.targetStatus" />
    </b-field>
    <b-field label="Current Status" label-position="on-border">
      <b-input v-model="resource.currentStatus" />
    </b-field>
    <b-field label="Description" label-position="on-border">
      <b-input type="textarea" v-model="resource.description" />
    </b-field>
    <b-field label="Custom Instant State" label-position="on-border">
      <b-input v-model="resource.customInstanceState" />
    </b-field>
    <b-field label="Do Not Perform Before" label-position="on-border">
      <b-input v-model="resource.doNotPerformBefore" />
    </b-field>
  </div>
</template>

<script>
export default {
  components: {
  },

  props: {
    resource: {
      required: true,
      type: Object
    }
  },

  methods: {
  },

  watch: {
    resource (val, oldVal) {
      console.log('edit resource general - resource prop changed')
    }
  }
}
</script>