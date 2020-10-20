<template>
  <md-card
  class="component-card-resource"
  style="flex-direction: row;"
  >
    <!-- avatar and ID -->
    <md-card-section
    style="width:25%; text-align: center;"
    >
      <resource-avatar
      :resource="model.taskName"
      :title="model.taskName"
      />
      <h6
      style="text-align:center; word-break:break-word;line-height: 1.1rem;"
      >
        {{ model.taskName }}
      </h6>
    </md-card-section>

    <!-- title and description -->
    <md-card-section
    style="margin: 1em 2em; "
    >
      <h4
      v-if="model.taskName"
      style="color:black; font-weight:bold;"
      >
        {{ model.taskName }}
      </h4>
      <h5>
        {{ model.description }}
      </h5>
    </md-card-section>

    <!-- ID and action buttons -->
    <md-card-section
    style="white-space: nowrap; margin: 1em; width: 30%;"
    >
      <div style="color: #a6a6a6; margin-bottom: 1rem; text-align:right;">
        <a @click="clickCopy(model._id, 'ID')">
          <md-icon name="copy_16" color="blue-50" />
        </a>
        <small>{{model._id}}</small>
      </div>
      <div class="buttons">
        <!-- Clone button -->
        <b-button
        @click="$emit('clone')"
        aria-label="Clone"
        type="is-primary"
        rounded
        >
          Clone
        </b-button>

        <!-- Edit button -->
        <b-button
        @click="$emit('edit')"
        aria-label="Edit"
        type="is-info"
        rounded
        >
          Edit
        </b-button>

        <!-- View button -->
        <b-button
        @click="$emit('view')"
        aria-label="View"
        type="is-success"
        rounded
        >
          View
        </b-button>

        <!-- delete button -->
        <b-button
        v-show="isAdmin || isOwner(model)"
        @click="$emit('delete')"
        aria-label="Delete"
        type="is-danger"
        rounded
        >
          Delete
        </b-button>
      </div>
    </md-card-section>

  </md-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ResourceAvatar from '../output/blueprint-avatar'

export default {
  components: {
    ResourceAvatar
  },
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'isAdmin'
    ])
  },
  methods: {
    ...mapActions([
      'copyToClipboard'
    ]),
    clickCopy(string, type) {
      this.copyToClipboard({ string, type })
    }
  }
}
</script>

<style>
/* default */
.component-card-resource {
  margin-bottom: 1em;
  width: 100%;
  /* flex: 0 0 100vw; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

  /* don't wrap action buttons */
.component-card-resource .buttons {
  flex-wrap: initial;
}
</style>