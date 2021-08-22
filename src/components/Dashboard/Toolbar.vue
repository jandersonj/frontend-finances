<template>
     <v-app-bar color="primary" fixed >
      <v-app-bar-nav-icon @click.stop="$emit('hide', !show)"></v-app-bar-nav-icon>

      <v-toolbar-title>{{title || 'Dashboard'}}</v-toolbar-title>
    </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'
export default {

    name :'Toolbar',
    props: {
        show: Boolean,
        // title: String
    },
    model: {
        prop: 'show',
        event: 'hide'
    },
    computed: {
        ...mapState(['title'])
    }
}
</script>