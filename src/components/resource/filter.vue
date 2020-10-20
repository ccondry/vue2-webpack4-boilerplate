<template>
  <md-card
  style="background-color:#E6E8E8; border: 1px solid #000; margin-bottom: 1rem;"
  >

    <!-- tag filter -->
    <md-card-section>
      <tags-chooser 
      :tags="tagsArray"
      :selected.sync="tagFilter"
      />
    </md-card-section>

    <!-- text filter -->
    <md-card-section>
      <md-input-search
      clear
      name="searchBlueprintsInput"
      htmlId="searchBlueprintsInput"
      containerSize="medium-6"
      shape="pill"
      placeholder="Filter..."
      v-model="searchQuery"
      tabindex="0"
      autofocus
      />
    </md-card-section>

    <!-- mine filter -->
    <md-card-section style="padding: 1rem;flex-direction: column;width:20%;min-width:170px;">
      <md-checkbox
      v-model="showMine"
      label="Show Only Mine"
      html-id="show-my-blueprints"
      style="flex: 1 1; margin-right: 1em;"
      />
    </md-card-section>

  </md-card>
</template>

<script>
import { mapGetters } from 'vuex'
import TagsChooser from '../edit-blueprint/tags-chooser'

export default {
  components: {
    TagsChooser
  },
  props: {
    tags: {
      // tag filter
      type: Array,
      default: []
    },
    show: {
      // which blueprints to show. valid values "all", "user-visible"
      type: String,
      default: 'user-visible'
    },
    text: {
      // text filter
      type: String,
      default: ''
    },
    model: {
      // full list of data to filter
      type: Array,
      required: true
    }
  },

  data () {
    return {
      showModal: false,
      modalData: {},
      page: 1,
      pageLength: 10,
      tagFilter: [],
      showMine: false,
      searchQuery: ''
    }
  },

  mounted () {
    // init searchQuery with parent prop value 'text'
    this.searchQuery = this.text
    // init tagFilter with copy of parent prop value 'tags'
    this.tagFilter = this.tags.slice()
    // update displayed blueprints now
    this.$emit('update:output', this.displayedBlueprints)  
  },

  methods: {
  },

  computed: {
    ...mapGetters([
      'isAdmin',
      'isDeveloper',
      'consumer',
      'tagsArray'
    ]),
    allDemoTitles () {
      try {
        // set of all demo IDs
        const demos = this.filteredBlueprints.map(v => {
          return v.instanceTitle
        })
        // remove all non-unique values, sort, and return
        const ret = Array.from(new Set(demos)).sort()
        // add first option to not filter by demo title
        ret.unshift('Any Demo')
        return ret
      } catch (e) {
        return ['Any Demo']
      }
    },
    displayedBlueprints () {
      return this.filteredBlueprints
    },
    filteredBlueprints () {
      return this.model
    }
  },
  watch: {
    displayedBlueprints (val, oldVal) {
      this.$emit('update:output', val)
    },
    searchQuery (val, oldVal) {
      this.$emit('update:text', val)
    },
    tagFilter (val, oldVal) {
      this.$emit('update:tags', val)
    },
    text (val, oldVal) {
      // parent updated text, so update searchQuery
      if (val !== oldVal) {
        this.searchQuery = val
      }
    },
    // tags (val, oldVal) {
    //   // parent updated tags array, so update tagFilter
    //   if (val !== oldVal) {
    //     this.tagFilter = val.slice()
    //   }
    // }
  }
}
</script>
