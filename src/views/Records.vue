<template>
<div>
<Toolbar v-model="drawer" />
<Menu v-model="drawer" />
<v-app>
    <Lancamentos />
</v-app>
</div>
</template>

<script>
import Menu from '@/components/Dashboard/Menu.vue'
import Toolbar from '@/components/Dashboard/Toolbar.vue'

import Lancamentos from '@/components/Lancamentos/Lancamentos.vue'

import { mapActions} from 'vuex'
export default {

    name :'Layout',
    components: {
        Toolbar,
        Menu,
        Lancamentos
    },
    data: () => ({
        drawer : false
    }),
    computed: {
    },
    methods: {
        ...mapActions([
            'setTitle',
        ]),
    },
    created(){
        this.setTitle({title:'Lancamentos'})
    }
}
</script>