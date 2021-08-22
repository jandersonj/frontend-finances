<template>
     <v-alert :type="tipo" :value="value"  dismissible >{{erro}}</v-alert>
</template>
<script>
export default {
    name: 'Pop',
    props: {
        tipo: {
             type: String
        },
        erro: {
            type: String
        },
        value: {
            type: Boolean,
        }

    },
    data(){
        return {
            isActive : true
        }
    }
}
</script>
