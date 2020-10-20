<template>
  <div>
    <!-- <pre>{{ schema }}</pre> -->
    <!-- <pre>{{ model }}</pre> -->
    <!-- Service Platform -->
    <b-field label="Service Platform" label-position="on-border" type="is-success">
      <b-select v-model="model.servicePlatform">
        <option
        v-for="servicePlatform of servicePlatforms"
        :key="servicePlatform.id"
        :value="servicePlatform.id"
        >
          {{ servicePlatform.name }}
        </option>
      </b-select>
    </b-field>

    <!-- Endpoint -->
    <editor-field
    label="Endpoint"
    field="endpoint"
    :model="model"
    :schema="schema"
    />

    <!-- Method -->
    <b-field label="Method" label-position="on-border" type="is-success">
      <b-select v-model="model.queryMethod">
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="PATCH">PATCH</option>
        <option value="DELETE">DELETE</option>
      </b-select>
    </b-field>

    <!-- URL parameters -->
    <editor-field
    label="URL Parameters"
    field="urlParams"
    :model="model"
    :schema="schema"
    :valid.sync="valid.urlParams"
    />

    <!-- Bearer -->
    <editor-field
    label="Bearer Token"
    field="bearer"
    :model="model"
    :schema="schema"
    />

    <!-- Request Body -->
    <editor-field
    label="Request Body"
    field="queryBody"
    :model="model"
    :schema="schema"
    :valid.sync="valid.queryBody"
    />

    <!-- Response Code -->
    <editor-field
    label="Required Response Code"
    field="responseCodeRequired"
    :model="model"
    :schema="schema"
    />

    <!-- Max Retries -->
    <editor-field
    label="Maximum Number of Retries"
    field="maxRetry"
    :model="model"
    :schema="schema"
    />

    <!-- Current Retry -->
    <editor-field
    label="Current Retry Number"
    field="currentTry"
    :model="model"
    :schema="schema"
    />

    <!-- Inter-Retry Timer -->
    <editor-field
    label="Inter-Retry Timer"
    field="interRetryTimer"
    :model="model"
    :schema="schema"
    />

    <!-- Last Check Time -->
    <editor-field
    label="Last Check Time"
    field="lastCheckTime"
    :model="model"
    :schema="schema"
    :is-date="true"
    />

    <!-- Required Response Body -->
    <editor-field
    label="Required Response Body"
    field="responseBodyRequired"
    :model="model"
    :schema="schema"
    :valid.sync="valid.responseBodyRequired"
    />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EditorField from '../../editor-field'

export default {
  components: {
    EditorField
  },

  props: {
    model: {
      required: true,
      type: Object
    },
    schema: {
      required: true,
      type: Object
    }
  },

  data () {
    return {
      valid: {}
    }
  },

  computed: {
    ...mapGetters([
      'servicePlatforms'
    ]),
    allValid () {
      return this.valid['urlParams'] &&
      this.valid['queryBody'] &&
      this.valid['responseBodyRequired']
    }
  },

  watch: {
    allValid (val) {
      this.$emit('update:valid', val)
    }
  }
}
</script>

<style scoped>
select::-ms-expand {
  display: none !important;
}

select {
  /* for Firefox */
  -moz-appearance: none !important;
  /* for Chrome */
  -webkit-appearance: none !important; 
  appearance: none !important;
  text-indent: 0.01px !important; /* Removes default arrow from firefox*/
  text-overflow: "" !important;  /*Removes default arrow from firefox*/
}

.select {
  padding-left: 0px !important;
  overflow: hidden !important;
}
</style>