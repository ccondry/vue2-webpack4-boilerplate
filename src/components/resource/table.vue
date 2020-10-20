<template>
  <section>
    <b-table
    :data="resources"
    ref="table"
    paginated
    per-page="15"
    :opened-detailed="defaultOpenedDetails"
    detailed
    detail-key="_id"
    :show-detail-icon="true"
    aria-next-label="Next page"
    aria-previous-label="Previous page"
    aria-page-label="Page"
    aria-current-label="Current page"
    >
    <!-- <b-table
    :data="resources"
    :loading="!resources.length"
    ref="table"
    paginated
    per-page="10"
    > -->

    <b-table-column field="taskName" label="Name" sortable v-slot="props">
      <a @click="toggle(props.row)">
        <strong>{{ props.row.taskName }}</strong>
      </a>
    </b-table-column>

    <b-table-column
    field="description"
    label="Description"
    v-slot="props"
    >
      {{ truncate(props.row.description, 80) }}
    </b-table-column>

    <b-table-column field="_id" label="ID" width="40" v-slot="props">
      <!-- {{ props.row._id }} -->
      <span style="display: flex;">
        <a @click="clickCopy(props.row._id, 'ID')">
          <b-icon icon="copy_16" pack="md-icon" />
        </a>
        <small>{{props.row._id}}</small>
      </span>
    </b-table-column>

    <template slot="detail" slot-scope="props">
      <article class="media">
        <!-- <figure class="media-left">
          <p class="image is-64x64">
            <img src="/static/img/placeholder-128x128.png">
          </p>
        </figure> -->
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{{ props.row.taskName }}</strong>
              <br>
              {{ props.row.description }}
            </p>
            <div v-if="props.row.precheck">
              <p>
                Precheck:
                {{ props.row.precheck.queryMethod }}
                {{ props.row.precheck.endpoint }}
                ({{ props.row.precheck.responseCodeRequired }})
              </p>
              <p>
                Do: {{ props.row.do.queryMethod }} {{ props.row.do.endpoint }}
              </p>
              <p>
                Postcheck:
                {{ props.row.postcheck.queryMethod }}
                {{ props.row.postcheck.endpoint }}
                ({{ props.row.postcheck.responseCodeRequired }})
              </p>
            </div>
            <md-loading size="40" v-else />
            <!-- ID and action buttons -->
            <div class="buttons pull-right">
              <!-- delete button -->
              <b-button
              v-show="isAdmin || isOwner(props.row)"
              @click="$emit('delete', props.row._id)"
              aria-label="Delete"
              type="is-danger"
              rounded
              >
                Delete
              </b-button>

              <!-- Edit button -->
              <b-button
              @click="$emit('edit', props.row._id)"
              aria-label="Edit"
              type="is-primary"
              rounded
              >
                Edit
              </b-button>
              
              <!-- Clone button -->
              <b-button
              @click="$emit('clone', props.row._id)"
              aria-label="Clone"
              type="is-info"
              rounded
              >
                Clone
              </b-button>

              <!-- View button -->
              <!-- <b-button
              @click="$emit('view')"
              aria-label="View"
              type="is-success"
              rounded
              >
                View
              </b-button> -->
            </div>
          </div>
        </div>
      </article>
    </template>

    </b-table>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      defaultOpenedDetails: [1],
      showDetailIcon: true
    }
  },
  computed: {
    ...mapGetters([
      'resources',
      'loading',
      'isAdmin',
      'isDeveloper',
      'user'
    ]),
    isLoading () {
      return this.loading.app.resource || this.loading.app.refresh
    }
  },
  methods: {
    ...mapActions([
      'copyToClipboard'
    ]),
    clickCopy (string, type) {
      this.copyToClipboard({string, type})
    },
    isOwner (resource) {
      // does user own this blueprint?
      return this.isDeveloper && this.user.email === resource.creator
    },
    toggle (row) {
      this.$refs.table.toggleDetails(row)
    },
    truncate (s, length) {
      if (length < 3) {
        return s.slice(0, length)
      }
      if (s.length > length) {
        return s.slice(0, length - 3) + '...'
      } else {
        return s
      }
    }
  }
}
</script>

<style>
.resource-cell {
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
