<template>
<div>
    <Toolbar v-model="drawer" />
    <Menu v-model="drawer" />
</div>
</template>

<script>
import Menu from '@/components/Dashboard/Menu.vue'
import Toolbar from '@/components/Dashboard/Toolbar.vue'
export default {

    name :'Layout',
    components: {
        Toolbar,
        Menu
    },
    data: () => ({
        drawer : false
    })
}
</script>